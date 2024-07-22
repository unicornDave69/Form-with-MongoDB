const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/tutorial", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  bestSubject: { type: [String], enum: ["English", "Math", "Physics"] },
  resumeUrl: { type: String, required: true },
  profileUrl: { type: String, required: true },
  choice: { type: String, required: true },
  about: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

app.post("/users", async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    contact: req.body.contact,
    gender: req.body.gender,
    bestSubject: req.body.bestSubject,
    resumeUrl: req.body.resumeUrl,
    profileUrl: req.body.profileUrl,
    choice: req.body.choice,
    about: req.body.about,
  });

  try {
    const result = await user.save();
    res.send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
