# Generated by Django 5.0.4 on 2024-04-30 16:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='name',
            field=models.CharField(default='Default Name', max_length=100),
        ),
    ]