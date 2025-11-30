from django.db import models
from django.utils import timezone

class SosRequest(models.Model):
    #Contact details
    full_name = models.CharField(max_length=200)
    phone_number= models.CharField(max_length=15)
    alternate_phone_number= models.CharField(max_length=15, blank=True, null=True)
    
    # Location
    address= models.TextField(blank=True)
    landmark= models.CharField(max_length=200, blank=True)
    district= models.CharField(max_length=100, blank=True)
    gps_location= models.CharField(max_length=100, blank=True)  # e.g. "lat,lng"
    
    #Current situation
    WATER_LEVEL_CHOICES = [
        ("none", "No water"),
        ("ankle", "Up to ankle"),
        ("knee", "Knee level"),
        ("waist", "Waist level"),
        ("chest", "Above chest"),
        ("roof", "At roof level"),
    ]
    water_level= models.CharField(max_length=16, choices=WATER_LEVEL_CHOICES, blank=True)
    safe_hours= models.CharField(max_length=100, blank=True)  
    floor_level= models.CharField(max_length=10, blank=True)
    additional_info=models.TextField(blank=True)
    
    needs_food = models.BooleanField(default=False)
    needs_medicine = models.BooleanField(default=False)
    need_power = models.BooleanField(default=False)
    need_water = models.BooleanField(default=False)
    
    phone_battery_percentage= models.PositiveIntegerField(blank=True, null=True)
    
    #Emergency details
    EMERGENCY_TYPE_CHOICES = [
        ("trapped_by_flood", "Trapped by Flood"),
        ("evacuation_needed", "Evacuation Needed"),
        ("medical_emergency", "Medical Emergency"),
        ("landslide_risk", "Landslide Risk"),
        ("landslide_occurred", "Landslide Occurred"),
        ("other", "Other"),
    ]
    emergency_type= models.CharField(max_length=32, choices=EMERGENCY_TYPE_CHOICES, blank=True)
    number_of_people= models.PositiveIntegerField(default=1)
    
    has_children = models.BooleanField(default=False)
    has_elderly = models.BooleanField(default=False)
    has_disabled = models.BooleanField(default=False)
    has_medical = models.BooleanField(default=False)
    
    # Meta
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Status for rescue operations (later)
    STATUS_CHOICES = [
        ("new", "New"),
        ("verified", "Verified"),
        ("in_progress", "In progress"),
        ("resolved", "Resolved"),
        ("dismissed", "Dismissed"),
    ]
    status = models.CharField(
        max_length=16, choices=STATUS_CHOICES, default="new"
    )
    # For admins to store notes
    internal_notes = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.full_name} ({self.district}) – {self.emergency_type}"

class HelpOffer(models.Model):
    helper_name = models.CharField(max_length=200)
    helper_phone = models.CharField(max_length=32)
    helper_district = models.CharField(max_length=100)
    support_details = models.TextField()
    preferred_areas = models.TextField(blank=True)

    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Help from {self.helper_name} ({self.helper_district})"
    
class ReliefCamp(models.Model):
    name = models.CharField(max_length=255)
    district = models.CharField(max_length=100)
    location_description = models.CharField(max_length=255)
    capacity = models.PositiveIntegerField()
    current_occupancy = models.PositiveIntegerField()
    
    # simple comma-separated needs (we can normalise later)
    needs = models.TextField(
        help_text="Comma separated list of needs", blank=True
    )
    
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} ({self.district})"