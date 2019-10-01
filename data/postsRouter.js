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

router.post("/:id/comments", (req, res) => {
  const { id } = req.params.id;
  const { comment } = req.body.comment;

  if (!id) {
  }
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const post = req.body;

  if (!post) {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist" });
  } else {
    db.findById(id)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: "The post information could not be retrieved." });
      });
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const change = req.body;
  if (!id) {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  } else if (!change.title || !change.contents) {
    res
      .status(400)
      .json({ errorMessage: "Please provide title and contents for the post" });
  } else {
    db.update(id, change).then(post => {
      res.status(201).json(post);
    });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    res
      .status(404)
      .json({ error: "The post with the specified ID does not exist." });
  } else {
    db.remove(id)
      .then(() => {
        res.status(201).json({ message: "deleted" });
      })
      .catch(() => {
        res.status(500).json({ error: "The post could not be removed" });
      });
  }
});

router.get("/:id/comments", (req, res) => {
  const id = req.params.id;

  if (!id) {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist" });
  } else {
    db.findPostComments(id)
      .then(comments => {
        res.status(201).json(comments);
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: "The comments information could not be retrieved." });
      });
  }
});

module.exports = router;
