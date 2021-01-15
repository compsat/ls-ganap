# Generated by Django 2.2.5 on 2021-01-15 06:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_events', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='audience',
            field=models.CharField(choices=[('MEM', 'Members Only'), ('UND', 'LS Undergraduate Students only'), ('GRAD', 'LS Graduate Students only'), ('UND_GRAD', 'LS Students (Undergraduate and Graduate)'), ('EMP', 'LS Employees only'), ('LS', 'LS Community (Students + Employees)'), ('ADMU', 'ADMU Community (LS, GS, HS)'), ('PUB', 'Open to the Public')], default='UND', max_length=200),
        ),
    ]
