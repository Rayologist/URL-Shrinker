import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    `Server listening on port ${PORT}`;
  });
  