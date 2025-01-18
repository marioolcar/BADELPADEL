from rest_framework.permissions import BasePermission

class IsIgracOrAdmin(BasePermission):
    """
    Dozvoljava pristup samo korisnicima koji su igrači ili administratori.
    """
    def has_permission(self, request, view):
        # Administratori imaju pristup svemu
        if request.user.is_staff:
            return True
        # Provjera da li korisnik ima povezani Igrac model
        return hasattr(request.user, 'igrac')

    def has_object_permission(self, request, view, obj):
        # Administratori imaju pristup svemu
        if request.user.is_staff:
            return True
        # Ako je korisnik vlasnik podataka
        return obj.user == request.user
    
    
class IsOwnerOrAdmin(BasePermission):
    """
    Dozvoljava pristup samo vlasnicima objekta ili administratorima.
    """
    def has_object_permission(self, request, view, obj):
        # Administratori imaju pristup svemu
        if request.user.is_staff:
            return True
        # Vlasnici objekta imaju pristup
        return obj.user_id == request.user