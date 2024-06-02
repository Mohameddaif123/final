from django.contrib import admin
from django.conf import settings
from django.urls import path
from base import views
from .views import ProductView, submit_review
from django.conf.urls.static import static
from .views import get_reviews

urlpatterns = [
    path('', views.index),
    path('login/', views.MyTokenObtainPairView.as_view()),
    path('register/', views.register),
    path('products',views.ProductView.as_view()),
    path('products/<int:pk>/', ProductView.as_view()), 
    path('update_profile/', views.update_profile),
    path('send_email/', views.send_email),
    path('api/submit_review/', submit_review, name='submit_review'),
    path('api/reviews/', get_reviews, name='get-reviews'),
    path('api/users/', views.get_users, name='get_users'),
    path('api/send_email_to_all_users/', views.send_email_to_all_users, name='send_email_to_all_users'),

    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
