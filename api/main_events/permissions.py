from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        return obj.user == request.user

class IsEventHostOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        if hasattr(request.user, "org_host"):
            return obj.org_hosts.filter(user=request.user).exists()

        if hasattr(request.user, "office_host"):
            return obj.office_hosts.filter(user=request.user).exists()
        
        if hasattr(request.user, "sanggu_host"):
            return obj.sanggu_hosts.filter(user=request.user).exists()

        return False

class IsCreatorOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        if hasattr(request.user, "org_host"):
            return obj.created_by == request.user.org_host.pk

        if hasattr(request.user, "office_host"):
            return obj.created_by == request.user.office_host.pk
        
        if hasattr(request.user, "sanggu_host"):
            return obj.created_by == request.user.sanggu_host.pk

        return False