import express from "express";

const server = express();

server.get("/", (Request, Response) => {
  Response.send("Ola");
});

server.listen(3333);
