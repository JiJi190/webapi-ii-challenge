const express = require("express");

const db = require("./db.js");

const router = express.Router();

router.post("/", (req, res) => {
  const { title, contents } = req.body;
  const user = req.body;
  if (!title || !contents) {
    res
      .status(400)
      .json({ errorMessage: "Please provide title and contents for the post" });
  } else {
    db.insert(user)
      .then(() => {
        res.status(201).json(user);
      })
      .catch(() => {
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  }
});

router.get("/", (req, res) => {
  db.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

module.exports = router;
