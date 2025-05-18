import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SketchPicker } from "react-color";
import "./App.css";
import ThemeSelector from "./ThemeSelector";
import Snackbar from "./Snackbar";

const THEMES = [
  {
    name: "Sunny",
    background: "linear-gradient(135deg, #f8ffae 0%, #43c6ac 100%)",
    containerBg: "rgba(255,255,255,0.92)",
    buttonBg: "linear-gradient(90deg, #43c6ac, #f8ffae)",
    buttonColor: "#222",
    inputBg: "#f8ffae55",
    inputColor: "#111",
    noteColors: ["#fff9b0", "#ffd6e0", "#b0f4ff", "#caffb0", "#ffb0b0", "#e0b0ff"],
    animated: true
  },
  {
    name: "Ocean",
    background: "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)",
    containerBg: "rgba(255,255,255,0.90)",
    buttonBg: "linear-gradient(90deg, #43cea2, #185a9d)",
    buttonColor: "#fff",
    inputBg: "#b2fefa88",
    inputColor: "#185a9d",
    noteColors: ["#b2fefa", "#0ed2f7", "#1fa2ff", "#a1c4fd", "#c2e9fb", "#2193b0"],
    animated: true
  },
  {
    name: "Candy",
    background: "linear-gradient(135deg, #fcb69f 0%, #ffecd2 100%)",
    containerBg: "rgba(255,255,255,0.95)",
    buttonBg: "linear-gradient(90deg, #fcb69f, #ffecd2)",
    buttonColor: "#c06c84",
    inputBg: "#fae3d988",
    inputColor: "#c06c84",
    noteColors: ["#ffb6b9", "#fae3d9", "#bbded6", "#8ac6d1", "#f67280", "#c06c84"],
    animated: true
  },
  {
    name: "Night",
    background: "linear-gradient(135deg, #232526 0%, #414345 100%)",
    containerBg: "rgba(34,36,38,0.97)",
    buttonBg: "linear-gradient(90deg, #232526, #414345)",
    buttonColor: "#fff",
    inputBg: "#414345cc",
    inputColor: "#fff",
    noteColors: ["#232526", "#414345", "#6e7f80", "#bfc0c0", "#495867", "#577399"],
    animated: true
  },
  {
    name: "Lavender",
    background: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
    containerBg: "rgba(255,255,255,0.93)",
    buttonBg: "linear-gradient(90deg, #e0c3fc, #8ec5fc)",
    buttonColor: "#6f42c1",
    inputBg: "#e0c3fc88",
    inputColor: "#6f42c1",
    noteColors: ["#e0c3fc", "#8ec5fc", "#b2f7ef", "#f3c6e8", "#f6d6ad", "#d0bdf4"],
    animated: true
  },
  {
    name: "Sunset",
    background: "linear-gradient(120deg, #ff9a9e 0%, #fad0c4 100%)",
    containerBg: "rgba(255,255,255,0.90)",
    buttonBg: "linear-gradient(90deg, #ff9a9e, #fad0c4)",
    buttonColor: "#b24592",
    inputBg: "#fad0c488",
    inputColor: "#b24592",
    noteColors: ["#ff9a9e", "#fad0c4", "#fbc2eb", "#a1c4fd", "#fcb69f", "#ffdde1"],
    animated: true
  },
  {
    name: "Aurora",
    background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    containerBg: "rgba(255,255,255,0.94)",
    buttonBg: "linear-gradient(90deg, #43e97b, #38f9d7)",
    buttonColor: "#0b8457",
    inputBg: "#38f9d788",
    inputColor: "#0b8457",
    noteColors: ["#43e97b", "#38f9d7", "#a1ffce", "#faffd1", "#f9f7d9", "#e0c3fc"],
    animated: true
  },
  {
    name: "Cyberpunk",
    background: "linear-gradient(120deg, #fc00ff 0%, #00dbde 100%)",
    containerBg: "rgba(30,0,40,0.93)",
    buttonBg: "linear-gradient(90deg, #fc00ff, #00dbde)",
    buttonColor: "#fff",
    inputBg: "#fc00ff33",
    inputColor: "#fff",
    noteColors: ["#fc00ff", "#00dbde", "#ff6f61", "#f3c6e8", "#f6d6ad", "#00ffb3"],
    animated: true
  },
  {
    name: "Rainbow",
    background: "linear-gradient(270deg, #ff6ec4, #7873f5, #42e695, #ffe29f, #ff6ec4)",
    containerBg: "rgba(255,255,255,0.96)",
    buttonBg: "linear-gradient(90deg, #ff6ec4, #7873f5, #42e695, #ffe29f, #ff6ec4)",
    buttonColor: "#7c3aed",
    inputBg: "#ffe29f88",
    inputColor: "#7c3aed",
    noteColors: ["#ff6ec4", "#7873f5", "#42e695", "#ffe29f", "#ffb6b9", "#fae3d9"],
    animated: true
  },
  {
    name: "Party",
    background: "repeating-linear-gradient(135deg, #f7971e 0 20px, #ffd200 20px 40px, #f7971e 40px 60px, #fd1d1d 60px 80px, #f7971e 80px 100px)",
    containerBg: "rgba(255,255,255,0.93)",
    buttonBg: "linear-gradient(90deg, #fd1d1d, #f7971e, #ffd200)",
    buttonColor: "#fd1d1d",
    inputBg: "#ffd20055",
    inputColor: "#fd1d1d",
    noteColors: ["#ffd200", "#fd1d1d", "#f7971e", "#fff9b0", "#ffb6b9", "#fae3d9"],
    animated: true
  },
  {
    name: "Waves (Animated)",
    background: "linear-gradient(270deg, #43cea2, #185a9d, #43cea2)",
    containerBg: "rgba(255,255,255,0.92)",
    buttonBg: "linear-gradient(90deg, #43cea2, #185a9d)",
    buttonColor: "#fff",
    inputBg: "#b2fefa88",
    inputColor: "#185a9d",
    noteColors: ["#b2fefa", "#0ed2f7", "#1fa2ff", "#a1c4fd", "#c2e9fb", "#2193b0"],
    animated: true
  },
];

type Note = {
  id: number;
  text: string;
  color: string;
  pinned?: boolean;
};

export default function App() {
  const [themeIdx, setThemeIdx] = useState(0);
  const theme = THEMES[themeIdx];

  const [notes, setNotes] = useState<Note[]>([]);
  const [input, setInput] = useState("");
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  // New features:
  const [search, setSearch] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deletedNote, setDeletedNote] = useState<Note | null>(null);

  // Color picker
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [noteColor, setNoteColor] = useState(theme.noteColors[0]);

  // LocalStorage: Load notes on mount
  React.useEffect(() => {
    const saved = localStorage.getItem("sticky-notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  // LocalStorage: Save notes on change
  React.useEffect(() => {
    localStorage.setItem("sticky-notes", JSON.stringify(notes));
  }, [notes]);

  // Theme background animation
  React.useEffect(() => {
    document.body.style.background = theme.background;
    if (theme.animated) {
      document.body.classList.add("animated-bg");
    } else {
      document.body.classList.remove("animated-bg");
    }
    setNoteColor(theme.noteColors[0]);
  }, [theme]);

  const addNote = () => {
    if (input.trim()) {
      setNotes([
        {
          id: Date.now(),
          text: input,
          color: noteColor,
          pinned: false
        },
        ...notes
      ]);
      setInput("");
      setNoteColor(theme.noteColors[0]);
      setShowColorPicker(false);
    }
  };

  const updateNote = (id: number, text: string) => {
    setNotes(notes.map(n => n.id === id ? { ...n, text } : n));
  };

  const removeNote = (id: number) => {
    const noteToDelete = notes.find(n => n.id === id);
    if (noteToDelete) {
      setDeletedNote(noteToDelete);
      setNotes(notes.filter(n => n.id !== id));
      setSnackbarOpen(true);
    }
  };

  const handleUndo = () => {
    if (deletedNote) {
      setNotes(prev => [deletedNote!, ...prev]);
      setDeletedNote(null);
      setSnackbarOpen(false);
    }
  };

  const clearAllNotes = () => {
    setNotes([]);
  };

  // Pin/Unpin
  const togglePin = (id: number) => {
    setNotes(notes =>
      notes.map(n =>
        n.id === id ? { ...n, pinned: !n.pinned } : n
      )
    );
  };

  // Export Notes
  const exportNotes = () => {
    const data = JSON.stringify(notes, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sticky-notes.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filtered & sorted notes (pinned first)
  const filteredNotes = notes
    .filter(note =>
      note.text.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  return (
    <div
      className={`container${theme.animated ? " animated-bg" : ""}`}
      style={{
        background: theme.containerBg,
        boxShadow: "0 8px 32px rgba(60,60,60,0.15)"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", flexWrap: "wrap", gap: 8 }}>
        <button
          className="theme-selector-btn"
          onClick={() => setShowThemeSelector((v) => !v)}
          style={{
            background: theme.buttonBg,
            color: theme.buttonColor,
            border: "none",
            borderRadius: 16,
            padding: "0.5em 1.2em",
            fontWeight: 600,
            fontSize: "1rem",
            marginRight: 12,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(60,60,60,0.07)",
            transition: "background 0.2s, transform 0.15s"
          }}
        >
          🎨 Theme
        </button>
        {showThemeSelector && (
          <div className="theme-selector-dropdown">
            <ThemeSelector
              themes={THEMES}
              selectedIdx={themeIdx}
              onSelect={(idx) => {
                setThemeIdx(idx);
                setShowThemeSelector(false);
              }}
            />
          </div>
        )}
        <button
          className="clear-btn"
          onClick={clearAllNotes}
          style={{
            background: "#ff6f61",
            color: "#fff",
            marginLeft: 8,
            border: "none",
            borderRadius: 16,
            padding: "0.5em 1.2em",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: notes.length === 0 ? "not-allowed" : "pointer",
            boxShadow: "0 2px 8px rgba(255,111,97,0.13)",
            transition: "background 0.2s, transform 0.15s",
            opacity: notes.length === 0 ? 0.5 : 1
          }}
          title="Clear all notes"
          disabled={notes.length === 0}
        >
          🗑️ Clear All
        </button>
        <button
          className="export-btn"
          onClick={exportNotes}
          style={{
            background: "#43c6ac",
            color: "#fff",
            marginLeft: 8,
            border: "none",
            borderRadius: 16,
            padding: "0.5em 1.2em",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: notes.length === 0 ? "not-allowed" : "pointer",
            boxShadow: "0 2px 8px rgba(67,198,172,0.13)",
            transition: "background 0.2s, transform 0.15s",
            opacity: notes.length === 0 ? 0.5 : 1
          }}
          title="Export notes as JSON"
          disabled={notes.length === 0}
        >
          ⬇️ Export
        </button>
      </div>
      <h1>
        <span role="img" aria-label="sticky">📝</span> Sticky Notes
      </h1>
      <div className="input-row">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Write a note..."
          onKeyDown={e => e.key === "Enter" && addNote()}
          style={{
            background: theme.inputBg,
            color: theme.inputColor,
            border: `1.5px solid ${theme.buttonBg.split(',')[1] || '#ccc'}`
          }}
        />
        <button
          className="color-picker-btn"
          style={{
            background: noteColor,
            border: "2px solid #eee",
            borderRadius: "50%",
            width: 38,
            height: 38,
            margin: "0 6px",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(60,60,60,0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          title="Pick note color"
          onClick={() => setShowColorPicker(v => !v)}
        >
          <span style={{ fontSize: 18 }}>🎨</span>
        </button>
        {showColorPicker && (
          <div style={{ position: "absolute", zIndex: 20, top: 70, left: "50%", transform: "translateX(-50%)" }}>
            <SketchPicker
              color={noteColor}
              onChange={color => setNoteColor(color.hex)}
              presetColors={theme.noteColors}
              disableAlpha
            />
          </div>
        )}
        <button
          className="add-btn"
          onClick={addNote}
          style={{
            background: theme.buttonBg,
            color: theme.buttonColor
          }}
        >
          <span>+</span>
        </button>
      </div>
      <div className="input-row" style={{ marginBottom: 12 }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search notes..."
          style={{ maxWidth: 320, background: "#fff9b0" }}
        />
      </div>
      <div
        className="notes-grid"
        style={{ background: "transparent" }}
      >
        {filteredNotes.length === 0 ? (
          <div className="empty-state">
            <span style={{ fontSize: "2.5rem" }}>🗒️</span>
            No notes found.
          </div>
        ) : (
          <AnimatePresence>
            {filteredNotes.map(note => (
              <motion.div
                key={note.id}
                layout
                initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: Math.random() * 6 - 3 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="note-tile"
                style={{ background: note.color, border: note.pinned ? "2.5px solid #43c6ac" : undefined }}
              >
                <button
                  className="pin-btn"
                  title={note.pinned ? "Unpin" : "Pin to top"}
                  onClick={() => togglePin(note.id)}
                >
                  {note.pinned ? "📌" : "📍"}
                </button>
                <textarea
                  value={note.text}
                  onChange={e => updateNote(note.id, e.target.value)}
                  className="note-text"
                  style={{
                    color: theme.inputColor
                  }}
                />
                <button className="delete-btn" onClick={() => removeNote(note.id)}>
                  ×
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
      <Snackbar
        message="Note deleted"
        actionLabel="Undo"
        open={snackbarOpen}
        onAction={handleUndo}
        onClose={() => setSnackbarOpen(false)}
      />
    </div>
  );
}