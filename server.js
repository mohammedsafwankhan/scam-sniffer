const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const reportRoutes = require("./controllers/reportController");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connect — NO options needed now
mongoose.connect("mongodb+srv://classybutwired_db_user:JRLeyUIeXZv0gtGy@scamdb.w5twl2w.mongodb.net/?appName=ScAMdb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

app.use("/api", reportRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
