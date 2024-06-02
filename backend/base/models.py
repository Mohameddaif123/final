from django.db import models

# Create your models here.
from django.contrib.auth.models import User




class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(upload_to='products/', null=True, blank=True) 
    price = models.FloatField()
    description = models.CharField(max_length=100)
    completed = models.BooleanField(default=False)
    name = models.CharField(max_length=100, default="Default Name")
    
    

    def __str__(self):
        return self.name
    
class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    rating = models.IntegerField()  # Rating out of 5
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username if self.user else "Anonymous"} - {self.rating}'
    
    
    
    