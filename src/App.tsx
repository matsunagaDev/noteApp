import { useState } from 'react';
import './App.css';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import type { Note } from './types/Note';
import uuid from 'react-uuid';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<string | false>(false);

  const onAddNote = () => {
    console.log('新しくノートが追加されました');
    const newNote: Note = {
      id: uuid(),
      title: '新しいノート',
      content: '新しいノートの内容',
      modDate: Date.now(),
    };
    setNotes([...notes, newNote]);
    console.log(notes);
  };

  const onDeleteNote = (id: string) => {
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
    console.log(`{id}のノートが削除されました`);
  };

  const getActiveNote = (): Note | undefined => {
    return notes.find((note) => note.id === activeNote);
  };

  return (
    <div className="App">
      <Sidebar
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        notes={notes}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} />
    </div>
  );
}

export default App;
