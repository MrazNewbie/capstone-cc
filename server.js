require("dotenv").config();

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

app.get("/:bucket_list", async (req, res) => {
  const query = "SELECT * FROM lists WHERE name = ?";
  pool.query(query, [req.params.bucket_list], (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ status: "error" });
      return;
    }

    if (!results[0]) {
      res.json({ status: "tidak ada beb!" });
    } else {
      res.json(results[0]);
    }
  });
});

app.post("/", async (req, res) => {
  const data = {
    name: req.body.name,
    amount: req.body.amount,
  };
  const query = "INSERT INTO lists (name, amount) VALUES (?, ?)";
  pool.query(query, Object.values(data), (error) => {
    if (error) {
      res.json({ status: "failure", reason: error.code });
    } else {
      res.json({ status: "success", data: data });
    }
  });
});

const pool = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
});
