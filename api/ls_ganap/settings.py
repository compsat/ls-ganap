try:
    from ls_ganap.shared_settings import *
except ImportError:
    pass

import os

DEBUG = config('DEBUG', cast=bool)

DEFAULT_DOMAIN = 'http://ganap.ateneo.edu'

ALLOWED_HOSTS = [
    '121.58.232.235',
    'ganap.ateneo.edu',
]

SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
# PUT BACK ONCE SSL IS CONFIGURED
#SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
X_FRAME_OPTIONS = 'DENY'

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': os.path.join(BASE_DIR, 'ls_ganap/errors.log'),
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}
