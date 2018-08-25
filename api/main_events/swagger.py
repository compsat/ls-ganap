from rest_framework.filters import BaseFilterBackend
import coreapi
class SimpleFilterBackend(BaseFilterBackend):
    def get_schema_fields(self, view):
        return [coreapi.Field(
            name='host_type',
            location='query',
            description='Specify a host_type (sanggu, org, office) to return all events associated to the chosen type.',
            required=False,
            type='string'
        )]
        
    def filter_queryset(self, request, queryset, view):
    	return queryset