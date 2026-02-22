const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Note = require("./model/note");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://Jayasri:Jayasri2816@cluster0.3ku3lfd.mongodb.net/quickstickyNotes?appName=Cluster0")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

/* CREATE note */
app.post("/notes", async (req, res) => {
    try {
        const { title, body } = req.body;
        const newNote = new Note({ title, body });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/* READ all notes */
app.get("/notes", async (req, res) => {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
});

/* UPDATE note */
app.put("/notes/:id", async (req, res) => {
    const { title, body } = req.body;
    const updated = await Note.findByIdAndUpdate(
        req.params.id,
        { title, body },
        { new: true }
    );
    res.json(updated);
});

/* DELETE note */
app.delete("/notes/:id", async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
});

const PORT =process.env.port||3000;
app.listen(PORT, () => {
    console.log("Server running on port ",PORT);
});