require("dotenv").config();

const express = require("express");

const app = express();
app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favorite movie list");
};

const { hashPassword, verifyPassword, verifyToken } = require("./auth.js");

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const usersHandlers = require("./usersHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUsersById);

app.post("/api/users", hashPassword, usersHandlers.postUser);
app.post(
  "/api/login", usersHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);


app.use(verifyToken);

app.post("/api/movies", verifyToken, movieHandlers.postMovie)
app.put("/api/movies/:id", verifyToken, movieHandlers.modifyMovieById);
app.delete("/api/movies/:id", verifyToken, movieHandlers.deleteMovieById);


app.put("/api/users/:id", usersHandlers.changeUserById);
app.delete("/api/users/:id", usersHandlers.deleteUserById);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
