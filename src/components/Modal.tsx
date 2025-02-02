import React, { useState, useEffect } from "react";
import { useNotes } from './NotesContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTitle?: string;
  initialContent?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, initialTitle = '', initialContent = '' }) => {
  const { saveNote } = useNotes();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent, isOpen]);

  const handleClose = () => {
    setTitle('');
    setContent('');
    onClose();
  };

  const handleSave = () => {
    if (!title || !content) {
      alert("Both title and content are required!");
      return;
    }
    saveNote({ title, content }); 
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md">
        <h2 className="text-xl text-black font-bold mb-4">
          {initialTitle ? 'Edit Note' : 'New Note'}
        </h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full border text-black rounded p-2 mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="w-full border text-black rounded p-2 mb-4 h-24"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="flex justify-end space-x-2">
          <button onClick={handleClose} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;