from rest_framework.filters import BaseFilterBackend
import coreapi
class SimpleFilterBackend(BaseFilterBackend):
    def get_schema_fields(self, view):
        return [coreapi.Field(
            name='host_type_id',
            location='query',
            description='Specify a host_type_id to return all events associated to the chosen event_host',
            required=False,
            type='int'
        )]
        
    def filter_queryset(self, request, queryset, view):
    	return queryset