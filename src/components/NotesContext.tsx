import React, { createContext, useState, useEffect, useContext } from 'react';
import { Note } from './App';

interface NotesContextType {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  editIndex: number | null;
  setEditIndex: React.Dispatch<React.SetStateAction<number | null>>;
  saveNote: (note: Note) => void;
  deleteNote: (index: number) => void;
  searchQuery: string; 
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>; // refresh de search
}

const NotesContext = createContext<NotesContextType>({
  notes: [],
  setNotes: () => {},
  editIndex: null,
  setEditIndex: () => {},
  saveNote: () => {},
  deleteNote: () => {},
  searchQuery: '', // start the new search
  setSearchQuery: () => {},
});

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // throw errors if exists
      }
      const data: Note[] = await response.json(); 
      setNotes(data);
    } catch (error) {
      console.error('Erro ao carregar notas:', error);
    }
  };

  const saveNote = async (note: Note) => {
    try {
      if (editIndex === null) {  // new note
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: note.title, content: note.content }), 
        });
        const newNote: Note = await response.json(); // get the generated id
        setNotes([...notes, newNote]);
      } else { // Edit the note
        const updatedNotes = [...notes];
        updatedNotes[editIndex] = note; 
        await fetch(`${apiUrl}/${notes[editIndex].id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(note), // send the note with id
        });
        setNotes(updatedNotes);
        setEditIndex(null);
      }
    } catch (error) {
      console.error('Erro ao salvar nota:', error);
    }
  };

  const deleteNote = async (index: number) => {
    try {
      await fetch(`${apiUrl}/${notes[index].id}`, { method: 'DELETE' });
      const updatedNotes = notes.filter((_, i) => i !== index);
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Erro ao deletar nota:', error);
    }
  };

  return (
    <NotesContext.Provider value={{ notes, setNotes, editIndex, setEditIndex, saveNote, deleteNote, searchQuery, setSearchQuery }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
