from django.db.models import Q

# helper method for getting date range
def get_dates_between(start_date, end_date, queryset, start_time):
	if(start_date is not None) and (end_date is not None):
		# q_object = Q()

		keywords = [start_date, end_date]

		Qr = None
		for x in range(0, 40):
		    q = Q(**{"recurrence__datetimes__%s__range" % x: keywords })
		    if Qr:
		        Qr = Qr | q # or & for filtering
		    else:
		        Qr = q

		queryset = queryset.filter(Q(start_time__range=[start_date, end_date]) | (Q(recurrence_bool=True) & Qr))
        # | Q(recurrence__datetimes__1__range=[start_date, end_date])
        # 		))).order_by('start_time')
	else:
		raise Http404

	return queryset