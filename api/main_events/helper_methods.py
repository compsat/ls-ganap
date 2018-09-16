from django.db.models import Min

# helper method for getting date range
def get_dates_between(start_date, end_date, queryset, event_logistics):
    if(start_date is not None) and (end_date is not None):
        queryset = queryset.filter(is_approved=True).filter(event_logistics__date__range=[start_date, end_date]).annotate(date=Min('event_logistics__date')).order_by('date')
    else:
        raise Http404

    return queryset