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
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user_id=self.request.user)
        else:
            print(serializer.errors)

class PostDetail(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]
    #promjeni IsAuthenticated
    def get_queryset(self):
        try:
            pk = self.kwargs['pk']  # Dohvaćanje `pk` iz URL-a
            return Post.objects.get(id=pk)   
        except:
            return Post.objects.filter()
        
        
class PostUser(generics.ListAPIView):
    lookup_field = 'user_id'
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]
    #promjeni IsAuthenticated
    def get_queryset(self):
        try:
            pk = self.kwargs['user_id']  # Dohvaćanje `pk` iz URL-a
            return Post.objects.get(user_id=pk)
        except:
            return Post.objects.filter()
        
        
class PostTurnir(generics.ListCreateAPIView):
    lookup_field = 'turnir_id'
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]
    #promjeni IsAuthenticated
    def get_queryset(self):
        pk = self.kwargs['turnir_id']  # Dohvaćanje `pk` iz URL-a
        return Post.objects.filter(turnir_id=pk)
        #except:
        return Post.objects.filter()
    
class PostDelete(generics.DestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        pk = self.kwargs['pk']  # Dohvaćanje `pk` iz URL-a
        return Post.objects.filter(id=pk)