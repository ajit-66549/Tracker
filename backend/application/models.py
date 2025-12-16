from django.db import models

# Create your models here.
class Applications(models.Model):
    STATUS_CHOICES = [
        ("APPLIED", "Applied"),
        ("OA", "Online Assessment"),
        ("INTERVIEW", "Interview"),
        ("OFFER", "Offer"),
        ("REJECTED", "Rejected"),
    ]
    
    company = models.CharField(max_length=120)
    role = models.CharField(max_length=120)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="APPLIED")
    link = models.URLField(blank=True)
    note = models.TextField(blank=True)
    applied_date = models.DateField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now = True)
    
    def __str__(self):
        return f"{self.company} - {self.role}"