from django.urls import path
from django.views.generic.base import TemplateView
from . import views

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name="index_base"),
    path('choice_game', TemplateView.as_view(template_name='choice_game.html'), name="choice_game"),
    path('save-game', views.postExperimentData, name="save-game"),
]
