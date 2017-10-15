const express = require("express");
const bp = require("body-parser");

const db = require("./models");
const nlpRoute = require("./routes/nlp-route.js");

const Entries = db.entries;
const Keywords = db.keywords;
const Users = db.users;

const PORT = process.env.PORT || 3001;
const app = express();

app.use(bp.json({ extended: true }));

app.use("/server", require("./watson/speechToTextAPI.js"));
app.use("/entry/new", nlpRoute);

const server = app.listen(PORT, () => {
  db.sequelize.sync({});
  console.log(`Server running on ${PORT}`);
});
