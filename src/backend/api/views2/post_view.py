from ..serializers import PostSerializer, TurnirSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from ..models import Post
from ..permissions import IsOwnerOrAdmin  # Importirajte prilagođeni permission

# Pogledi za Postove
class PostListCreate(generics.ListCreateAPIView):
    """
    Omogućava listanje svih postova i kreiranje novih.
    Samo autentificirani korisnici mogu kreirati postove.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        """
        Automatski postavlja trenutnog korisnika kao autora posta.
        """
        serializer.save(user_id=self.request.user)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Omogućava dohvaćanje, ažuriranje i brisanje pojedinačnog posta.
    Samo vlasnik posta ili administrator ima pristup.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]

    def get_queryset(self):
        try:
            pk = self.kwargs['pk']  # Dohvaćanje `pk` iz URL-a
            return Post.objects.filter(id=pk)   
        except:
            return Post.objects.filter()
        
        
class PostUser(generics.RetrieveUpdateDestroyAPIView):
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
        
class PostTeren(generics.RetrieveUpdateDestroyAPIView):
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
        
class PostTurnir(generics.RetrieveUpdateDestroyAPIView):
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