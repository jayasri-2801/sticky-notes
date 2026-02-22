const API = "http://localhost:5000/notes";

async function fetchNotes() {
  const res = await fetch(API);
  const notes = await res.json();

  const grid = document.getElementById("notesGrid");
  grid.innerHTML = "";

  notes.forEach(note => {
    const card = document.createElement("div");
    card.className = "note-card";

    card.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.body}</p>
      <button class="edit-btn" onclick="editNote('${note._id}')">✏️ Edit</button>
      <button class="delete-btn" onclick="deleteNote('${note._id}')">🗑️ Delete</button>
    `;

    grid.appendChild(card);
  });
}

async function addNote() {
  const title = document.getElementById("noteTitle").value;
  const body = document.getElementById("noteBody").value;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body })
  });

  fetchNotes();
}

async function editNote(id) {
  const newTitle = prompt("New title:");
  const newBody = prompt("New text:");
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: newTitle, body: newBody })
  });
  fetchNotes();
}

async function deleteNote(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  fetchNotes();
}

fetchNotes();