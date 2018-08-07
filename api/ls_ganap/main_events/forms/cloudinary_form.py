from django.forms import ModelForm      
from main_events.models import Photo

class PhotoForm(ModelForm):
  class Meta:
      model = Photo
      fields = ['image']