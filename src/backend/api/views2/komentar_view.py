from ..serializers import KomentarSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from ..models import Post



# Pogledi za Turnir
class KomentarListCreate(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = KomentarSerializer
    permission_classes = [AllowAny]
    #promjeni IsAuthenticated

class KomentarDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = KomentarSerializer
    permission_classes = [AllowAny]
    #promjeni IsAuthenticated
    
    
class KomentarDelete(generics.DestroyAPIView):
    serializer_class = KomentarSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        pk = self.kwargs['pk']  # Dohvaćanje `pk` iz URL-a
        return Post.objects.filter(id=pk)