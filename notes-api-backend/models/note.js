const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema(
  {
    title: { type: String, required: true },
    note: { type: String, required: true },
    user_id: { type: Schema.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NotesSchema);
