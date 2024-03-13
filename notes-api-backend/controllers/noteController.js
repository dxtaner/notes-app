const Note = require("../models/note");

module.exports.getAllNotes = async function (req, res) {
  try {
    const user_id = req.user;
    const notes = await Note.find({ user_id });

    return res.status(200).json({ notes });
  } catch (err) {
    return res.status(500).json({ message: "Error. Please try again" });
  }
};

module.exports.getNoteFromId = async function (req, res) {
  try {
    const noteId = req.params.id;
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: "Note does not exist" });
    }

    res.status(200).json(note);
  } catch (err) {
    return res.status(500).json({ message: "Error. Please try again" });
  }
};

module.exports.createNote = function (req, res) {
  const { title, note } = req.body;
  const user_id = req.user;

  const notes = new Note({
    title,
    note,
    user_id,
  });

  try {
    notes
      .save()
      .then((savedNote) => {
        res
          .status(200)
          .json({ message: "Note created successfully", note: savedNote });
      })
      .catch((err) => {
        res.status(500).json({ message: "Error. Please try again" });
      });
  } catch (error) {
    res.status(500).json({ message: "Error. Please try again" });
  }
};

module.exports.deleteNote = async function (req, res) {
  const noteId = req.params.id;

  try {
    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note does not exist" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error. Please try again" });
  }
};

module.exports.updateNote = async function (req, res) {
  const noteId = req.params.id;
  const { title, note, user } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      {
        title,
        note,
        user: req.user,
      },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note does not exist" });
    }

    res
      .status(200)
      .json({ message: "Note updated successfully", note: updatedNote });
  } catch (err) {
    return res.status(500).json({ message: "Error. Please try again" });
  }
};
