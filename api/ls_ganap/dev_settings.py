try:
    from ls_ganap.shared_settings import *
except ImportError:
    pass

ALLOWED_HOSTS = [
    '*'
]

DEFAULT_DOMAIN = 'http://localhost:3000'

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