# Generated by Django 4.0 on 2022-01-26 18:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_alter_contact_contact_icon_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contact',
            name='contact_icon',
            field=models.ImageField(upload_to='assets/contacts'),
        ),
        migrations.AlterField(
            model_name='technology',
            name='technology_logo',
            field=models.ImageField(blank=True, upload_to='assets/technologies'),
        ),
    ]