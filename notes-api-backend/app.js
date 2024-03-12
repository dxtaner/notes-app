const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth.js");
const notesRoutes = require("./routes/notes.js");
const mongoose = require("mongoose");
const authMiddleware = require("./middlewares/auth.js");
require("dotenv").config();
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Sunucu bağlantı noktasında başlatıldı ${PORT}`);
});

app.use("/notes", authMiddleware.ensureAuthenticated, notesRoutes);
app.use("/auth", authRoutes);

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.guofsiq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(url)
  .then(() => console.log("Başarılı veritabanı bağlantısı"))
  .catch((error) => console.log(error));
