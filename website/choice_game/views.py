import json
from .models import ExperimentData
from django.http import HttpResponse
from django.utils import timezone


def index(request):
    posts = Post.objects.all()
    return render(request, 'index.html', {'posts': posts})


def postExperimentData(request):
    # request should be ajax and method should be POST.
    if request.is_ajax() and request.method == "POST":
        received_json_data = request.body
        db_entry = ExperimentData(name=request.user, date=timezone.now(),
                                  data=received_json_data)
        db_entry.save()
        return HttpResponse('OK', status=200)
