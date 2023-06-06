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

/*--Memunculkan data dari database sesuai dengan nama yang di minta--*/
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

/*--Menambah data kedalam database--*/
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

/*--Mengubah data kedalam database--*/
app.put("/:bucket_list", async (req, res) => {
  const data = {
    name: req.body.name,
    amount: req.body.amount,
  };
  const query = "UPDATE lists SET name = ?, amount = ? WHERE name = ?";
  pool.query(
    query,
    [data.name, data.amount, req.params.bucket_list],
    (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res
          .status(500)
          .json({ status: "error", message: "Error executing query" });
        return;
      }

      if (results.affectedRows === 0) {
        res.json({ status: "failure", message: "Data not found" });
      } else {
        res.json({ status: "success", data: data });
      }
    }
  );
});

/*--Menghapus data dari dalam database--*/
app.delete("/:bucket_list", async (req, res) => {
  const query = "DELETE FROM lists WHERE name = ?";
  pool.query(query, [req.params.bucket_list], (error) => {
    if (error) {
      console.error("Error executing query:", error);
      res
        .status(500)
        .json({ status: "error", message: "Error executing query" });
    } else {
      res.json({ status: "success" });
    }
  });
});

const pool = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
});
