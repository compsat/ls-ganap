from django.db.models import Min
from django.db.models import Q

# helper method for getting date range
def get_dates_between(start_date, end_date, queryset, event_logistics):
    if(start_date is not None) and (end_date is not None):
        queryset = queryset.filter(event_logistics__date__range=[start_date, end_date]).order_by('first_date')
    else:
        raise Http404

    return queryset

def tags_hostgroup_filter(queryset, request, host_map):
	host_query = request.query_params.get('host_query', None)
	tags = request.query_params.get('tags', None)

	if host_query:
		queryset = queryset.filter(host_map[host_query]).distinct()

	if tags:
		tags_list = tags.split(',')
		queries = Q()
		for tag in tags_list:
			queries = queries | Q(tags__pk=tag)

		queryset = queryset.filter(queries).distinct()

	return queryset