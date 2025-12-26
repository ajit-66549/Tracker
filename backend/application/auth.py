from rest_framework_simplejwt.authentication import JWTAuthentication

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        raw_token = request.COOKIES.get("access_token")     # reads access token form cookie
        
        if raw_token is None:
            return None
        
        validated_token = self.get_validated_token(raw_token)    # validated that token by checking signature, expiry date
        user = self.get_user(validated_token)                    # get the user associated with that token
        return (user, validated_token)                           # returns user and their validated token