# notes/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from notes.models import Note
from notes.serializers import NoteSerializer

class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter notes by the authenticated user
        return Note.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Set the 'user' field to the currently authenticated user
        serializer.save(user=self.request.user)
