from ..serializers import PostSerializer, TurnirSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from ..models import Post



# Pogledi za Postove
class PostListCreate(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]
    #promjeni IsAuthenticated

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]
    #promjeni IsAuthenticated
    def get_queryset(self):
        try:
            pk = self.kwargs['pk']  # Dohvaćanje `pk` iz URL-a
            return Post.objects.filter(id=pk)   
        except:
            return Post.objects.filter()
        
        
class PostUser(generics.ListCreateAPIView):
    lookup_field = 'user_id'
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]
    #promjeni IsAuthenticated
    def get_queryset(self):
        try:
            pk = self.kwargs['user_id']  # Dohvaćanje `pk` iz URL-a
            return Post.objects.filter(user_id=pk)   
        except:
            return Post.objects.filter()
        
class PostTeren(generics.ListCreateAPIView):
    lookup_field = 'teren_id'
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]
    #promjeni IsAuthenticated
    def get_queryset(self):
        try:
            pk = self.kwargs['teren_id']  # Dohvaćanje `pk` iz URL-a
            return Post.objects.filter(teren_id=pk)
        except:
            return Post.objects.filter()
        
class PostTurnir(generics.ListCreateAPIView):
    lookup_field = 'turnir_id'
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]
    #promjeni IsAuthenticated
    def get_queryset(self):
        try:
            pk = self.kwargs['turnir_id']  # Dohvaćanje `pk` iz URL-a
            return Post.objects.filter(turnir_id=pk)   
        except:
            return Post.objects.filter()
    
class PostDelete(generics.DestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        pk = self.kwargs['pk']  # Dohvaćanje `pk` iz URL-a
        return Post.objects.filter(id=pk)