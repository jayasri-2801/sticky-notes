import { useEffect, useState } from "react";
import "./App.css";

const API = "https://sticky-backend-cpbu.onrender.com/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch Notes
  const fetchNotes = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Add Note
  const addNote = async () => {
    if (!title || !body) {
      alert("Please enter title and body!");
      return;
    }

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });

    setTitle("");
    setBody("");
    setModalOpen(false);
    fetchNotes();
  };

  // Delete Note
  const deleteNote = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
    fetchNotes();
  };

  // Edit Note
  const editNote = async (id, oldTitle, oldBody) => {
    const newTitle = prompt("Edit Title:", oldTitle);
    const newBody = prompt("Edit Body:", oldBody);

    if (newTitle && newBody) {
      await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, body: newBody }),
      });
      fetchNotes();
    }
  };

  return (
    <div className="App">
      {/* Background Animations */}
      <div className="background">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <h1 className="title">✨ Dream Notes</h1>

      {/* Notes Grid */}
      <div className="notes-grid">
        {notes.map((note) => (
          <div className="note-card" key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.body}</p>
            <button
              className="edit-btn"
              onClick={() => editNote(note._id, note.title, note.body)}
            >
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => deleteNote(note._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Floating Add Button */}
      <div className="fab" onClick={() => setModalOpen(true)}>
        +
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Note</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Write something..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <button onClick={addNote}>Save</button>
            <button className="close-btn" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;