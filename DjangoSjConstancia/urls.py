"""
URL configuration for DjangoSjConstancia project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
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
from django.urls import path
from DjangoSjConstancia.views import saludo, example, index, new, new_submit, membrete


urlpatterns = [
    path('admin/', admin.site.urls),
    path('saludo/', saludo),
    path('example/', example),
    path('index/', index, name='index'),
    path('new/', new, name='new'),
    path('new_submit/', new_submit, name='new_submit'),
    path('membrete/', membrete, name='membrete')
]