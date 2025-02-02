import React from 'react';
import Header from './Header';
import NoteList from './NoteList';
import { NotesProvider } from './NotesContext';

export interface Note {
  id?: number;
  title: string;
  content: string;
}


const App: React.FC = () => {
  return (
    <NotesProvider>
      <div className="min-h-screen pt-20 px-4 sm:px-8">
        <Header />
        <NoteList />
      </div>
    </NotesProvider>
  );
};

export default App;