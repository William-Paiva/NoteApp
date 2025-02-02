import React from 'react';
import { useNotes } from './NotesContext';

const NoteList: React.FC = () => {
  const { notes, deleteNote, setEditIndex, searchQuery } = useNotes();

  // Searcher...
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (index: number) => {
    const confirmDelete = window.confirm("Are you sure to delete?");
    if (confirmDelete) {
      deleteNote(index);
    }
  };

  return (
    <div className="mt-20 w-full">
      {filteredNotes.length > 0 ? (
        filteredNotes.map((note, index) => (
          <div key={note.id} className="bg-sky-800 p-4 rounded-lg shadow-lg mb-4 w-full">
            <h3 className="font-bold text-lg text-white">{note.title}</h3>
            <p className="text-white">{note.content}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditIndex(index)}
                className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No notes found!</p>
      )}
    </div>
  );
};

export default NoteList;
