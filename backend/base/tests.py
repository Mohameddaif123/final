from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.models import User
from base.models import Product

class ViewTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_superuser(
            username='admin', email='admin@example.com', password='admin123'
        )
        self.normal_user = User.objects.create_user(
            username='user', email='user@example.com', password='user123'
        )
        self.product = Product.objects.create(
            user=self.admin_user, price=10.0, description='Test Product', completed=False, name='Test'
        )

    def test_index_view(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'test': 'done'})

    def test_register_view(self):
        data = {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'newuser123'
        }
        response = self.client.post('/register/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.filter(username='newuser').exists(), True)

    def test_login_view(self):
        data = {
            'username': 'admin',
            'password': 'admin123'
        }
        response = self.client.post('/login/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_product_list_view(self):
        response = self.client.get('/products')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_product_create_view(self):
        self.client.force_authenticate(user=self.admin_user)
        data = {
            'user': self.admin_user.id,
            'price': 20.0,
            'description': 'New Product',
            'completed': False,
            'name': 'New Product'
        }
        response = self.client.post('/products', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.count(), 2)

    def test_product_update_view(self):
        self.client.force_authenticate(user=self.admin_user)
        data = {
            'price': 15.0,
            'description': 'Updated Product',
            'completed': True,
            'name': 'Updated Name'
        }
        response = self.client.put(f'/products/{self.product.id}/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        product = Product.objects.get(id=self.product.id)
        self.assertEqual(product.price, 15.0)
        self.assertEqual(product.description, 'Updated Product')
        self.assertTrue(product.completed)
        self.assertEqual(product.name, 'Updated Name')

    def test_product_delete_view(self):
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.delete(f'/products/{self.product.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Product.objects.count(), 0)

    def test_update_profile_view(self):
        self.client.force_authenticate(user=self.normal_user)
        data = {
            'username': 'updateduser',
            'password': 'updateduser123'
        }
        response = self.client.put('/update_profile/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = User.objects.get(id=self.normal_user.id)
        self.assertEqual(user.username, 'updateduser')
        self.assertTrue(user.check_password('updateduser123'))

    def test_send_email_view(self):
        data = {
            'recipient': 'recipient@example.com',
            'subject': 'Test Subject',
            'message': 'Test Message'
        }
        response = self.client.post('/send_email/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
