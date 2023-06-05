const express = require("express");
const mysql = require("mysql");
const app = express();

app.use(express.json());
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`jolly Rest API sedang berjalan port ${port}`);
});

app.get("/", function (req, res) {
  res.json({ status: "Jolly! ready to roll" });
});

app.get("/:list", async (req, res) => {
  const query = "SELECT * FROM list WHERE id = ?";
  pool.query(query, [req.params.list], (error, results) => {
    if (!result[0]) {
      res.json({ status: "not found!" });
    } else {
      res.json(results[0]);
    }
  });
});

const pool = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
});
