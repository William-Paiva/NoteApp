import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { useNotes } from './NotesContext';

const Header: React.FC = () => {
  const { editIndex, notes, searchQuery, setSearchQuery } = useNotes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialTitle, setInitialTitle] = useState("");
  const [initialContent, setInitialContent] = useState("");

  useEffect(() => {
    if (editIndex !== null) {
      const noteToEdit = notes[editIndex];
      setInitialTitle(noteToEdit.title);
      setInitialContent(noteToEdit.content);
      setIsModalOpen(true);
    } else {
      setInitialTitle("");
      setInitialContent("");
      setIsModalOpen(false);
    }
  }, [editIndex, notes]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <header className="w-full fixed top-0 left-0 right-0 flex justify-between items-center shadow-lg p-4 md:px-8 bg-sky-950">
        <h1 className="underline text-white text-base sm:text-lg md:text-2xl">NoteApp</h1> {/* responsive for mobile */}
        <nav className="flex items-center space-x-4 w-full md:w-auto justify-between md:space-x-8">
          <button
            className="text-white hover:text-gray-300 p-2 transition text-sm sm:text-base md:text-lg"
            onClick={() => setIsModalOpen(true)}
          >
            Add Notes
          </button>
          <input
            type="text"
            placeholder="Search..."
            className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            value={searchQuery}
            onChange={handleSearch}
          />
        </nav>
      </header>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTitle={initialTitle}
        initialContent={initialContent}
      />
    </>
  );
};

export default Header;
