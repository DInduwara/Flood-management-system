from django.urls import path
from .views import (
    SosRequestCreateView,
    HelpOfferCreateView,
    ReliefCampListView,
    SosRequestListView,
    api_health,
)

urlpatterns = [
    path("health/", api_health, name="api-health"),
    path("sos-requests/", SosRequestCreateView.as_view(), name="sos-create"),
    path(
        "sos-requests/list/",
        SosRequestListView.as_view(),
        name="sos-list",
    ),
    path("help-offers/", HelpOfferCreateView.as_view(), name="help-offer"),
    path("relief-camps/", ReliefCampListView.as_view(), name="relief-camps"),
]
