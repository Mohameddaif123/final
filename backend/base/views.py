from django.conf import settings
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework import serializers
from .models import Product, Review
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail
from rest_framework.permissions import IsAdminUser, AllowAny

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['isStaff'] = user.is_staff
        token['isSuper'] = user.is_superuser
        return token

# Custom view to handle login
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            return Response({"error": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)
        
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


# Serializer with ImageField included
class ProductSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Product
        fields = '__all__'

# Updated ProductView to handle image upload
class ProductView(APIView):
    parser_classes = (MultiPartParser, FormParser,)

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [AllowAny]
        elif self.request.method in ['POST', 'PUT', 'DELETE']:
            self.permission_classes = [IsAdminUser]
        return super(ProductView, self).get_permissions()

    def get(self, request):
        my_model = Product.objects.all()
        serializer = ProductSerializer(my_model, many=True)
        data = serializer.data
        for item in data:
            item['image'] = request.build_absolute_uri(item['image']) if item['image'] else None
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        self.check_permissions(request)
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        self.check_permissions(request)
        try:
            my_model = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response({"error": "Product does not exist"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProductSerializer(my_model, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        self.check_permissions(request)
        try:
            my_model = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        my_model.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Register
@api_view(['POST'])
def register(request):
    # Print the incoming request data for debugging
    print("Request Data:", request.data)

    # Extract data from the request
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    is_superuser = request.data.get('is_superuser', False)  # Check if the user is a superuser

    # Check for missing fields
    if not username or not email or not password:
        return Response({"error": "All fields (username, email, password) are required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Check if the user already exists
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        # Create the user
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )
        
        # Set user privileges
        user.is_superuser = is_superuser  # Set user as superuser if specified
        user.is_active = True
        user.is_staff = is_superuser  # Set user as admin if specified

        user.save()

        # Send welcome email
        subject = "Welcome to Our Website"
        message = f"Hi {user.username},\n\nThank you for registering at our website. We're excited to have you on board!"
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [user.email]

        send_mail(subject, message, email_from, recipient_list)

        return Response("New user created and welcome email sent", status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    new_username = request.data.get('username')
    new_password = request.data.get('password')

    # Flags to track changes
    username_changed = False
    password_changed = False

    # Check if username is being updated
    if new_username and new_username != user.username:
        old_username = user.username
        user.username = new_username
        username_changed = True

    # Check if password is being updated
    if new_password:
        user.set_password(new_password)
        password_changed = True

    user.save()

    # Send email notification if username or password has changed
    if username_changed or password_changed:
        subject = "Your Account Details Have Been Updated"
        message = f"Hello {user.username},\n\n"
        message += "Your account details have been updated:\n"
        if username_changed:
            message += f" - Username changed from {old_username} to {new_username}\n"
        if password_changed:
            message += " - Your password has been changed.\n"
        message += "\nIf you did not make these changes, please contact our support team immediately.\n"
        message += "\nBest regards,\nYour Website Team"

        email_from = settings.EMAIL_HOST_USER
        recipient_list = [user.email]

        try:
            send_mail(subject, message, email_from, recipient_list)
        except Exception as e:
            return Response({"error": f"Failed to send email notification: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response("Profile updated successfully")


@api_view(['POST'])
def send_email(request):
    # Extract data from the request
    subject = request.data.get('subject')
    message = request.data.get('message')
    
    if not subject or not message:
        return Response("Missing required fields", status=status.HTTP_400_BAD_REQUEST)

    # Fetch all user emails
    user_emails = User.objects.values_list('email', flat=True)

    if not user_emails:
        return Response("No users found", status=status.HTTP_404_NOT_FOUND)

    # Construct and send the email
    email_from = settings.EMAIL_HOST_USER
    recipient_list = list(user_emails)

    try:
        send_mail(subject, message, email_from, recipient_list)
        return Response("Email sent successfully")
    except Exception as e:
        return Response(f"Failed to send email: {str(e)}", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
@permission_classes([AllowAny])
def submit_review(request):
    rating = request.data.get('rating')
    comment = request.data.get('comment')

    if not rating or not comment:
        return Response({"error": "Rating and comment are required"}, status=status.HTTP_400_BAD_REQUEST)

    # Validate rating
    try:
        rating = int(rating)
        if rating < 1 or rating > 5:
            return Response({"error": "Rating must be between 1 and 5"}, status=status.HTTP_400_BAD_REQUEST)
    except ValueError:
        return Response({"error": "Rating must be an integer"}, status=status.HTTP_400_BAD_REQUEST)

    # Save the review
    review = Review.objects.create(
        user=request.user if request.user.is_authenticated else None,
        rating=rating,
        comment=comment
    )
    
    return Response({"message": "Review submitted successfully"}, status=status.HTTP_201_CREATED)    

@api_view(['GET'])
@permission_classes([AllowAny])
def get_reviews(request):
    reviews = Review.objects.all()
    review_list = []
    for review in reviews:
        review_data = {
            'id': review.id,
            'user': {
                'username': review.user.username if review.user else 'Anonymous',
                'id': review.user.id if review.user else None
            } if review.user else None,
            'rating': review.rating,
            'comment': review.comment,
            'created_at': review.created_at
        }
        review_list.append(review_data)
    return Response(review_list, status=status.HTTP_200_OK)


def get_users(request):
    users = User.objects.all().values('id', 'email')  # Assuming your User model has an 'email' field
    return JsonResponse({'users': list(users)})

def send_email_to_all_users(request):
    users = User.objects.all()
    subject = request.data.get('subject')
    message = request.data.get('message')

    for user in users:
        send_mail(subject, message, 'your_email@example.com', [user.email])

    return JsonResponse({'message': 'Email sent to all users successfully'})
        
# Index
@api_view(['GET'])
def index(req):
    return Response({'test': 'done'})
