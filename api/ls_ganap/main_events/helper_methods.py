# helper method for getting date range
def get_dates_between(start_date, end_date, queryset, event_logistics):
    if(start_date is not None) and (end_date is not None):
        queryset = queryset.filter(event_logistics__start_time__range=[start_date, end_date]).order_by('event_logistics__start_time').distinct()
    else:
        raise Http404

    return queryset