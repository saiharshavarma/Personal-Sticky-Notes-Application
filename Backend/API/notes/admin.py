from django.contrib import admin
from .models import Note
# Register your models here.


class NotesAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'created_at', 'updated_at')


admin.site.register(Note, NotesAdmin)
