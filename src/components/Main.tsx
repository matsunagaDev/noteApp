import './Main.css';
import type { Note } from '../types/Note.ts';

const Main = ({
  activeNote,
  onUpdateNote,
}: {
  activeNote: Note | undefined;
  onUpdateNote: (note: Note) => void;
}) => {
  if (!activeNote) {
    return <div className="no-active-note">ノートが選択されていません</div>;
  }

  const onEditNote = (key: string, value: string) => {
    onUpdateNote({ ...activeNote, [key]: value, modDate: Date.now() });
  };

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          id="title"
          type="text"
          value={activeNote.title}
          onChange={(e) => onEditNote('title', e.target.value)}
        />
        <textarea
          id="content"
          onChange={(e) => onEditNote('content', e.target.value)}
          placeholder="ノート内容を記入"
          value={activeNote.content}
        ></textarea>
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <div className="markdown-preview">{activeNote.content}</div>
      </div>
    </div>
  );
};

export default Main;
