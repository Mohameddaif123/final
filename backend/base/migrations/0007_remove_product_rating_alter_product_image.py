# Generated by Django 5.0.4 on 2024-05-08 15:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_delete_productrating'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='rating',
        ),
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='product_images/'),
        ),
    ]
