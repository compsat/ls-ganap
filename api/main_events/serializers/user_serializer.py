from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.db.models import Q
from django.core.exceptions import ValidationError

User = get_user_model()

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User

        fields = ['email', 
        		  'password']
        
        # doesn't show the password on the request	  
        extra_kwargs = {'password': 
        					{'write_only': True}
    					}


    # overwrite the validated_data
    def create(self, validated_data):

        email = validated_data['email']
        password = validated_data['password']

        user_obj = User(
                email=email,
            )

        # this is where we actually set the password
        user_obj.set_password(password)
        user_obj.save()

        return validated_data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User

        fields = ['email', 
        		  'password']


class UserLoginSerializer(serializers.ModelSerializer):
    token = serializers.CharField(allow_blank=True, read_only=True)
    email = serializers.EmailField(label='Email Address')
    class Meta:
        model = User

        fields = ['email', 
                  'password',
                  'token']
        
        # doesn't show the password on the request    
        extra_kwargs = {'password': 
                            {'write_only': True}
                        }


    def validate(self, data):
        
        user_obj = None
        email = data['email']
        password = data['password']

        if not email:
            raise Validation('An email must exist.')

        # making sure that this email exists
        user = User.objects.filter(
                Q(email=email)
            ).distinct()


        if user.exists() and user.count() == 1:
            user_obj = user.first()
        else:
            raise ValidationError('This username is not valid.')

        if user_obj:
            if not user_obj.check_password(password):
                raise ValidationError('Incorrect credentials please try again.')
            
        data['token'] = 'SOME RANDOM TOKEN'


        return data


