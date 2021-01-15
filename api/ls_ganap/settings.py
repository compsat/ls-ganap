try:
    from ls_ganap.shared_settings import *
except ImportError:
    pass

import os
from decouple import config

DEBUG = config('DEBUG', cast=bool)

DEFAULT_DOMAIN = 'http://lsganap.ateneo.edu'

ALLOWED_HOSTS = [
    '121.58.232.235',
    'lsganap.ateneo.edu',
]

SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
# PUT BACK THESE THREE LINES ONCE SSL IS CONFIGURED
#SECURE_SSL_REDIRECT = True
#SESSION_COOKIE_SECURE = True
#CSRF_COOKIE_SECURE = True
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

import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

sentry_sdk.init(
    dsn="https://e44bd6b8118a4cd5ab4b0fc9864d3b05@o505407.ingest.sentry.io/5593644",
    integrations=[DjangoIntegration()],
    traces_sample_rate=1.0,

    # If you wish to associate users to errors (assuming you are using
    # django.contrib.auth) you may enable sending PII data.
    send_default_pii=True
)