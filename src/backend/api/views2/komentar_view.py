from ..serializers import KomentarSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from ..models import Komentar



# Pogledi za Turnir
class KomentarListCreate(generics.ListCreateAPIView):
    queryset = Komentar.objects.all()
    serializer_class = KomentarSerializer
    permission_classes = [AllowAny]
    #promjeni IsAuthenticated

class KomentarDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Komentar.objects.all()
    serializer_class = KomentarSerializer
    permission_classes = [AllowAny]
    #promjeni IsAuthenticated
    
    def get_queryset(self):
        try:
            pk = self.kwargs['pk']  # Dohvaćanje `pk` iz URL-a
            return Komentar.objects.filter(id=pk)   
        except:
            return Komentar.objects.filter()
        
class KomentarPost(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'post_id'
    queryset = Komentar.objects.all()
    serializer_class = KomentarSerializer
    permission_classes = [AllowAny]
    #promjeni IsAuthenticated
    
    def get_queryset(self):
        try:
            post = self.kwargs['post_id']  # Dohvaćanje `pk` iz URL-a
            return Komentar.objects.filter(post_id=post)   
        except:
            return Komentar.objects.filter()
        
class KomentarUser(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'user_id'
    queryset = Komentar.objects.all()
    serializer_class = KomentarSerializer
    permission_classes = [AllowAny]
    #promjeni IsAuthenticated
    
    def get_queryset(self):
        try:
            post = self.kwargs['user_id']  # Dohvaćanje `pk` iz URL-a
            return Komentar.objects.filter(user_id=post)   
        except:
            return Komentar.objects.filter()
    
    
class KomentarDelete(generics.DestroyAPIView):
    serializer_class = KomentarSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        pk = self.kwargs['pk']  # Dohvaćanje `pk` iz URL-a
        return Komentar.objects.filter(id=pk)
    
    