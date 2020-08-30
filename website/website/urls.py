"""website URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.contrib.auth.views import LoginView, LogoutView
from django.views.generic.base import TemplateView
from django.conf.urls.static import static
from django.conf import settings
from . import views

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name="index"),
    path('choice_game/', include('choice_game.urls')),
    path('admin/', admin.site.urls),
    path('signup/', views.signup, name="signup"),
    path('login/', LoginView.as_view(template_name='login.html'), name="login"),
    path('logout/', LogoutView.as_view(template_name='logout.html'), name="logout"),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
