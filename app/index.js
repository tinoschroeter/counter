const Database = require("better-sqlite3");
const dbFile = process.env.DBFILE || "./data.sql";
const db = new Database(dbFile);

const nocache = require("nocache");

const express = require("express");
const app = express();
const morgan = require("morgan");
const { makeBadge, ValidationError } = require("badge-maker");

app.use(nocache());
app.enable("trust proxy");
app.use(morgan("combined"));

const tableName = "counter";
const fields = "(id text NOT NULL UNIQUE, count integer NOT NULL)";
const query = `CREATE TABLE IF NOT EXISTS  ${tableName} ${fields}`;

db.prepare(query).run();

app.get("/", (req, res) =>
  res.redirect("https://github.com/tinoschroeter/counter")
);

app.get("/visitor", (req, res) => res.send("ID missing..."));
app.get("/visitor/:id", (req, res) => {
  const { id } = req.params;
  let count;
  const result = db
    .prepare(`SELECT count FROM ${tableName} WHERE id=?`)
    .get(id);

  if (!result) {
    count = 0;
    db.prepare(`INSERT INTO ${tableName} VALUES (?,?)`).run(id, count);
  } else {
    count = result.count;
  }
  count++;
  const svg = makeBadge({
    label: "visitors ",
    message: `${count}`,
    labelColor: "#555",
    color: "blue",
    style: "flat",
  });

  const info = db
    .prepare(`update ${tableName} set count = ? where id =?`)
    .run(count, id);

  res.setHeader("Content-Type", "image/svg+xml");
  return res.send(svg);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server run on port ${port}`);
});
