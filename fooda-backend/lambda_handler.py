import os

from apig_wsgi import make_lambda_handler
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "fooda.settings")

wsgi_application = get_wsgi_application()
lambda_handler = make_lambda_handler(wsgi_application)
