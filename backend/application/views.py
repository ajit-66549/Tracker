from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Applications
from .serializers import ApplicationSerializer
from rest_framework import status

# Create your views here.
@api_view(["GET"])
def health(request):
    return Response({"status": "OK"})

@api_view(["GET", "POST"])
def application_list_create(request):
    if request.method == "GET":
        apps = Applications.objects.all().order_by("-updated_at")   # gets all the objects(applications) from database
        serializer = ApplicationSerializer(apps, many=True)         # converts the python object to JSON as browser only understands JSON/text
        return Response(serializer.data)                            # returns the JSON data to user
    
    if request.method == "POST":
        serializer = ApplicationSerializer(data=request.data)       # converts the JSON data into python model instance
        
        if serializer.is_valid():       
            serializer.save()                                       # ORM converts the python instance into SQL which gets stored in database
            return Response(serializer.data, status=status.HTTP_201_CREATED)    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)