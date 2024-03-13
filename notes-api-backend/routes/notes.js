const express = require("express");
const routes = express.Router();
const noteController = require("../controllers/noteController.js");

// Rotaları tanımla
routes.get("/", noteController.getAllNotes);
routes.get("/:id", noteController.getNoteFromId);
routes.post("/", noteController.createNote);
routes.delete("/:id", noteController.deleteNote);
routes.patch("/:id", noteController.updateNote);

module.exports = routes;
