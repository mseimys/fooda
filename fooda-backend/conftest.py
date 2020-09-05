import sys
import os
from os.path import dirname, abspath

import django

ROOT_DIR = dirname(abspath(__file__))
sys.path.append(ROOT_DIR)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "fooda.settings")
django.setup()
