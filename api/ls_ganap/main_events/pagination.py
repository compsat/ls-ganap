from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination

class ObjectLimitOffsetPagination(LimitOffsetPagination):
	default_limit = 2
	max_limit = 10

class ObjectPageNumberPagination(PageNumberPagination):
	page_size = 5
