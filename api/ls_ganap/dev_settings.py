try:
    from ls_ganap.shared_settings import *
except ImportError:
    pass

ALLOWED_HOSTS = [
    '*'
]

DEFAULT_DOMAIN = 'http://localhost:3000'