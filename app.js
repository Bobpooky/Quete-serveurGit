require("dotenv").config();

const express = require("express");

const app = express();
app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favorite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);

app.post("/api/movies", movieHandlers.postMovie)

app.get("/api/movies/:id", movieHandlers.getMovieById);

app.put("/api/movies/:id", movieHandlers.modifyMovieById);

const usersHandlers = require("./usersHandlers");

app.get("/api/users", usersHandlers.getUsers);

app.post("/api/users", usersHandlers.postUser);

app.get("/api/users/:id", usersHandlers.getUsersById);

app.put("/api/users/:id", usersHandlers.changeUserById);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
