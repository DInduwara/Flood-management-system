from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import SosRequest, HelpOffer, ReliefCamp
from .serializers import (
    SosRequestSerializer,
    HelpOfferSerializer,
    ReliefCampSerializer,
)


class SosRequestCreateView(generics.CreateAPIView):
    queryset = SosRequest.objects.all()
    serializer_class = SosRequestSerializer


class HelpOfferCreateView(generics.CreateAPIView):
    queryset = HelpOffer.objects.all()
    serializer_class = HelpOfferSerializer


class ReliefCampListView(generics.ListAPIView):
    queryset = ReliefCamp.objects.filter(is_active=True).order_by("district")
    serializer_class = ReliefCampSerializer


class SosRequestListView(generics.ListAPIView):
    """
    For admin / map side: list all SOS requests, later we can add filters
    like ?district=Colombo&status=new
    """

    serializer_class = SosRequestSerializer

    def get_queryset(self):
        qs = SosRequest.objects.all().order_by("-created_at")
        district = self.request.query_params.get("district")
        status = self.request.query_params.get("status")
        if district:
            qs = qs.filter(district__iexact=district)
        if status:
            qs = qs.filter(status=status)
        return qs


@api_view(["GET"])
def api_health(request):
    return Response({"status": "ok", "message": "Flood SOS API running"})
