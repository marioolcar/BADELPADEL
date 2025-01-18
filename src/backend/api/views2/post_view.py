from ..serializers import PostSerializer, TurnirSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from ..models import Post
from ..permissions import IsOwnerOrAdmin  # Importirajte prilagođeni permission

# Pogled za listanje i kreiranje postova
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

# Pogled za dohvaćanje, ažuriranje i brisanje pojedinačnog posta
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
        
# Pogled za listanje postova po user_id        
class PostUser(generics.RetrieveUpdateDestroyAPIView):
    """
    Omogućava listanje svih postova određenog korisnika.
    Dostupno samo autentificiranim korisnicima.
    """
    lookup_field = 'user_id'
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Post.objects.filter(user_id=user_id)
    
    

# Pogled za listanje postova po teren_id
class PostTeren(generics.ListAPIView):
    """
    Omogućava listanje svih postova za određeni teren.
    Dostupno samo autentificiranim korisnicima.
    """
    lookup_field = 'teren_id'
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        teren_id = self.kwargs['teren_id']
        return Post.objects.filter(teren_id=teren_id)


# Pogled za listanje postova po turnir_id
class PostTurnir(generics.ListAPIView):
    """
    Omogućava listanje svih postova za određeni turnir.
    Dostupno samo autentificiranim korisnicima.
    """
    lookup_field = 'turnir_id'
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        turnir_id = self.kwargs['turnir_id']
        return Post.objects.filter(turnir_id=turnir_id)


# Pogled za brisanje postova
class PostDelete(generics.DestroyAPIView):
    """
    Omogućava brisanje posta.
    Samo vlasnik posta ili administrator ima pristup.
    """
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Post.objects.filter(id=pk)