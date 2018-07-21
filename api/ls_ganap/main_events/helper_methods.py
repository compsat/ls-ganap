# helper method for getting date range
def get_dates_between(start_date, end_date, queryset, start_time):
    if(start_date is not None) and (end_date is not None):
        queryset = queryset.filter(start_time__range=[start_date, end_date]).order_by('start_time')
    else:
        raise Http404

    return queryset