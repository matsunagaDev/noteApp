import { useEffect, useState } from 'react';
import './App.css';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import type { Note } from './types/Note';
import uuid from 'react-uuid';

function App() {
  // ローカルストレージからノートを読み込む
  const loadNotesFromLocalStorage = (): Note[] => {
    try {
      const storedNotes = localStorage.getItem('notes');
      if (storedNotes) {
        return JSON.parse(storedNotes);
      }
    } catch (error) {
      console.error('ノートの読み込みに失敗しました:', error);
    }
    return [];
  };

  const [notes, setNotes] = useState<Note[]>(loadNotesFromLocalStorage());
  const [activeNote, setActiveNote] = useState<string | false>(false);

  // notesが変更されたらローカルストレージに保存
  useEffect(() => {
    try {
      localStorage.setItem('notes', JSON.stringify(notes));
    } catch (error) {
      console.error('ノートの保存に失敗しました:', error);
    }
  }, [notes]);

  // リロード後は最新のノートが表示される
  useEffect(() => {
    setActiveNote(notes[notes.length - 1].id);
  }, []);

  const onAddNote = () => {
    console.log('新しくノートが追加されました');
    const newNote: Note = {
      id: uuid(),
      title: '新しいノート',
      content: '',
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

  const onUpdateNote = (updateNote: Note) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === updateNote.id) {
        return updateNote;
      } else {
        return note;
      }
    });

    setNotes(updatedNotes);
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
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;
