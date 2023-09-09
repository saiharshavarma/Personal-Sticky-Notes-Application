import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    // Fetch notes from the API when the component mounts
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      // Retrieve the authentication token from local storage
      const token = localStorage.getItem('token');

      // Include the token in the headers of the Axios request
      const response = await axios.get('http://localhost:8000/api/notes/', {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      // Include the token in the headers of the Axios request
      const response = await axios.post('http://localhost:8000/api/notes/', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });

      console.log('Note created:', response.data);
      fetchNotes(); // Refresh the notes list
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const handleUpdateNote = async (id) => {
    try {
      const token = localStorage.getItem('token');

      // Include the token in the headers of the Axios request
      const response = await axios.put(`http://localhost:8000/api/notes/${id}/`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });

      console.log('Note updated:', response.data);
      fetchNotes(); // Refresh the notes list
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const token = localStorage.getItem('token');

      // Include the token in the headers of the Axios request
      const response = await axios.delete(`http://localhost:8000/api/notes/${id}/`, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      console.log('Note deleted:', response.data);
      fetchNotes(); // Refresh the notes list
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div>
      <h2>Notes</h2>
      <form onSubmit={handleCreateNote}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          placeholder="Content"
          name="content"
          value={formData.content}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Create Note</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <strong>{note.title}</strong>
            <p>{note.content}</p>
            <button onClick={() => handleUpdateNote(note.id)}>Edit</button>
            <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
