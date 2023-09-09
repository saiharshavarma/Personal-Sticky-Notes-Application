# notes/serializers.py
from rest_framework import serializers
from notes.models import Note

class NoteSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'user']
