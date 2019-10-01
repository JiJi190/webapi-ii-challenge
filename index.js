const express = require("express");

const postsRouter = require("./data/postsRouter.js");

const server = express();

server.use(express.json());

server.use("/api/posts", postsRouter);

const port = process.env.port || 8000;

server.listen(port, console.log(`Running on port ${port}`));
