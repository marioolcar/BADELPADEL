from ..serializers import PostSerializer, TurnirSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from ..models import Post



# Pogledi za Turnir
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
    
class PostDelete(generics.DestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(author=user)