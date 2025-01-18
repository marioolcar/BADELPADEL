from ..permissions import IsOwnerOrAdmin  # Importirajte prilagođeni permission
from ..serializers import KomentarSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from ..models import Komentar



# Pogled za listanje i kreiranje komentara
class KomentarListCreate(generics.ListCreateAPIView):
    """
    Omogućava listanje svih komentara i kreiranje novih.
    Samo autentificirani korisnici mogu kreirati komentare.
    """
    queryset = Komentar.objects.all()
    serializer_class = KomentarSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """
        Automatski postavlja trenutnog korisnika kao autora komentara.
        """
        serializer.save(user_id=self.request.user)


# Pogled za dohvaćanje, ažuriranje i brisanje pojedinačnog komentara
class KomentarDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Omogućava dohvaćanje, ažuriranje i brisanje pojedinačnog komentara.
    Samo vlasnik komentara ili administrator ima pristup.
    """
    queryset = Komentar.objects.all()
    serializer_class = KomentarSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]

    
    def get_queryset(self):
        try:
            pk = self.kwargs['pk']  # Dohvaćanje `pk` iz URL-a
            return Komentar.objects.filter(id=pk)   
        except:
            return Komentar.objects.filter()
        
class KomentarPost(generics.RetrieveUpdateDestroyAPIView):
    """
    Omogućava listanje svih komentara za određeni post.
    Dostupno samo autentificiranim korisnicima.
    """
    lookup_field = 'post_id'
    serializer_class = KomentarSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        post_id = self.kwargs['post_id']
        return Komentar.objects.filter(post_id=post_id)
    """
    prošli queryset
    def get_queryset(self):
        try:
            post = self.kwargs['post_id']  # Dohvaćanje `pk` iz URL-a
            return Komentar.objects.filter(post_id=post)   
        except:
            return Komentar.objects.filter()
    """
        
class KomentarUser(generics.RetrieveUpdateDestroyAPIView):
    """
    Omogućava listanje svih komentara određenog korisnika.
    Dostupno samo autentificiranim korisnicima.
    """
    lookup_field = 'user_id'
    serializer_class = KomentarSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Komentar.objects.filter(user_id=user_id)
    
    
# Pogled za brisanje komentara
class KomentarDelete(generics.DestroyAPIView):
    """
    Omogućava brisanje komentara.
    Samo vlasnik komentara ili administrator ima pristup.
    """
    serializer_class = KomentarSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Komentar.objects.filter(id=pk)
    
    