# Generated by Django 3.0.5 on 2020-08-27 20:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ExperimentData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120, verbose_name='Experiment Name')),
                ('date', models.DateTimeField(verbose_name='Experiment Date')),
                ('data', models.CharField(max_length=1000000)),
            ],
        ),
    ]
