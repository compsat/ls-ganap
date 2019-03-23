from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination
from django.core.paginator import InvalidPage

class ObjectLimitOffsetPagination(LimitOffsetPagination):
	default_limit = 2
	max_limit = 10

class ObjectPageNumberPagination(PageNumberPagination):
	page_size = 5

	def paginate_queryset(self, queryset, request, view=None):
		page_size = self.get_page_size(request)
		if not page_size:
			return None

		paginator = self.django_paginator_class(queryset, page_size)
		page_number = request.query_params.get(self.page_query_param, 1)
		if page_number in self.last_page_strings:
			page_number = paginator.num_pages

		try:
			self.page = paginator.page(page_number)
		except InvalidPage as exc:
			return None

		return super(ObjectPageNumberPagination, self).paginate_queryset(queryset, request)