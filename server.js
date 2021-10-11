// IMPORT EXPRESS, MONGOOSE AND DOTENV
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// IMPORT USER MODEL
const User = require("./models/User");

// CONFIGURE DOTENV
dotenv.config({ path: "./config/.env" });

// CREATE EXPRESS APPLICATION
const app = express();

// ENABLE PARSING JSON FORMAT
app.use(express.json());

// CREATE USER ROUTER
const usersRouter = express.Router();

// CREATE MONGOOSE CONNECTION TO MONGO ATLAS REMOTE DATABASE
mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected to MongoDB Database");
  })
  .catch((err) => {
    console.log(err);
  });

// GET ALL USERS ROUTE
usersRouter.get("/", async (req, res) => {
  const users = await User.find();
  res.send({ users });
});

// ADD A NEW USER ROUTE
usersRouter.post("/", (req, res) => {
  const newUser = new User(req.body);

  newUser.save((err, results) => {
    if (err) res.sendStatus(500);
    else res.send(results);
  });
});

// EDIT A USER BY ID ROUTE
usersRouter.patch("/:userId", async (req, res) => {
  const _id = req.params.userId;

  await User.findByIdAndUpdate(_id, req.body, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else res.send({ results });
  });
});

// REMOVE A USER BY ID ROUTE
usersRouter.delete("/:userId", async (req, res) => {
  const _id = req.params.userId;

  await User.findByIdAndRemove(_id, {}, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else res.send({ results });
  });
});

// USE USER ROUTER IN EXPRESS APPLICATION
app.use("/api/users", usersRouter);

// RUN EXPRESS APPLICATION LOCALLY ON PORT 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
