from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response

def set_auth_cookies(res, access_token: str, refresh_token: str):
    cookie_kwargs = {           # cookie settings
        "httponly": True,
        "secure": False,
        "samesite": "Lax",
        "path": "/",
    }
    
    res.set_cookie("access_token", access_token, max_age=60*5, **cookie_kwargs)          # store access token in cookie
    res.set_cookie("refresh_token", refresh_token, max_age=60*60*60*5, **cookie_kwargs)  # store refresh token in cookie

@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get("username")     # takes username from request
    password = request.data.get("password")     # takes password from request
    
    if not username and not password:           # if username and password not given 
        return Response(
            {"detail": "Username and Password required"}, status=status.HTTP_400_BAD_REQUEST
        )
        
    user = authenticate(username=username, password=password)     # check the username and password is correct
    if not user:
        return Response(
            {"detail": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED
        )
    
    refresh = RefreshToken.for_user(user)           # get the tokens for the authenticated user
    access_token = str(refresh.access_token)        # get the access token
    refresh_token = str(refresh)                    # get the refresh token
    
    res = Response({"Login": True}, status=status.HTTP_200_OK)     # send respond the login successful
    set_auth_cookies(res, access_token, refresh_token)          # function to set the tokens in http only cookie
    
    return res

@api_view(["POST"])
@permission_classes([AllowAny])
def refresh(request):
    refresh_token = request.COOKIES.get("refresh_token")    # get the refresh token from cookie
    if not refresh_token:
        return Response(
            {"detail": "No Refresh Token"}, status=status.HTTP_401_UNAUTHORIZED
        )
    
    try:
        token = RefreshToken(refresh_token)              # generate new refresh and access tokens
        new_access_token = str(token.access_token)       # get new access token
        res = Response({"Refresh": True}, status=status.HTTP_200_OK) 
        res.set_cookie(             # set new access token in cookie
            "access_token",
            new_access_token,
            max_age=60*5,
            httponly= True,
            secure= False,
            samesite= "Lax",
            path= "/",
            )
        return res
    except Exception:
        return Response({"detail": "Invalid refresh token"}, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(["POST"])
def logout(request):
    res = Response({"Logout": True}, status=status.HTTP_200_OK)
    res.delete_cookie("access_token", path="/")
    res.delete_cookie("refresh_token", path="/")
    return res