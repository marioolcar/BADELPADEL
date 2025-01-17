from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic.base import RedirectView
from .views import LogInWithGoogle


urlpatterns = [
    path('', RedirectView.as_view(url='/admin/', permanent=True)),
    
    path("admin/", admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/google-login/", LogInWithGoogle.as_view(), name="login-with-google"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls")),
]

if settings.DEBUG:  # Ovo vrijedi samo za razvojni način rada
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
