from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import Applications
from .serializers import ApplicationSerializer
from rest_framework import status

from django.shortcuts import get_object_or_404

# Create your views here.
@api_view(["GET"])
@permission_classes([AllowAny])
def health(request):
    return Response({"status": "OK"})

@api_view(["GET", "POST"])                      # only allows get and post request
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
    
@api_view(["PATCH", "DELETE"])                  # only allows patch and delete request
def application_detail(request, pk):
    app = get_object_or_404(Applications, pk=pk)    # get the appplication whose id is pk 
    
    if request.method == "PATCH":                
        serializer = ApplicationSerializer(app, data=request.data, partial=True)  # # validate incoming JSON and update the existing Python model instance
        if serializer.is_valid():     
            serializer.save()                  # save that updated application
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    app.delete()                      # delete that particular application from data 
    return Response(status=status.HTTP_204_NO_CONTENT)