from django.db import models


class ExperimentData(models.Model):
    name = models.CharField('Experiment Name', max_length=120)
    date = models.DateTimeField('Experiment Date')
    data = models.CharField(max_length=1000000)


def __str__(self):
    return self.name
