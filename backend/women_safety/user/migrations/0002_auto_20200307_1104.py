# Generated by Django 3.0.2 on 2020-03-07 11:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='women',
            name='emergency_contact1',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='women',
            name='emergency_contact2',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='women',
            name='emergency_contact3',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='women',
            name='emergency_contact4',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='women',
            name='emergency_contact5',
            field=models.IntegerField(),
        ),
    ]
