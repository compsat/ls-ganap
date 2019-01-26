from rest_framework.filters import BaseFilterBackend
import coreapi
class SimpleFilterBackend(BaseFilterBackend):
    def get_schema_fields(self, view):
        return [coreapi.Field(
            name='host_query',
            location='query',
            description='Specify a host group (sanggu, org, office, or any cluster) to return all events associated to the chosen group.',
            required=False,
            type='integer'
        )]
        
    def filter_queryset(self, request, queryset, view):
    	return queryset