"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
const fetchNotes = async () => {
  try {
    const res = await fetch("/api/notes");
    // if (!res.ok) throw new Error("Failed to fetch notes");
    const data = await res.json();
    setNotes(data);
  } catch (err) {
    console.error("Fetch notes error:", err);
  }
};


  const createNote = async () => {
    if (!title || !content) return alert("Title and Content required");

    await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    setTitle("");
    setContent("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <main className="min-h-screen p-8 bg-gray-400">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">📝 Notes App</h1>

        <input
          className="w-full p-2 mb-2 border"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-2 mb-2 border"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={createNote}
          className="bg-black text-white px-4 py-2 mb-6"
        >
          Add Note
        </button>

        {notes.map((note) => (
          <div key={note._id} className="bg-white p-4 mb-3 shadow">
            <h2 className="font-bold">{note.title}</h2>
            <p>{note.content}</p>
            <p className="text-sm text-gray-400">
              {new Date(note.createdAt).toLocaleString()}
            </p>
            <button
              onClick={() => deleteNote(note._id)}
              className="text-red-500 mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
