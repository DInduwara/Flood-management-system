from rest_framework import serializers
from .models import SosRequest, HelpOffer, ReliefCamp


class SosRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = SosRequest
        fields = "__all__"


class HelpOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = HelpOffer
        fields = "__all__"


class ReliefCampSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReliefCamp
        fields = "__all__"
