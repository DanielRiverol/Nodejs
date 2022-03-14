const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

router.get("/books", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("SELECT * FROM books", (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});

router.get("/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      "SELECT * FROM books WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        if (err) return res.send(err);
        res.json(rows);
      }
    );
  });
});
router.post("/", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("INSERT INTO books set ?", [req.body], (err, rows) => {
      if (err) return res.send(err);
      res.send("Libro cargado!");
    });
  });
});
router.delete("/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      "DELETE FROM books WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        if (err) return res.send(err);
        res.send("Libro borrado!");
      }
    );
  });
});
router.put("/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      "UPDATE books set ? WHERE id = ?",
      [req.body, req.params.id],
      (err, rows) => {
        if (err) return res.send(err);
        res.send("Libro actualizado!");
      }
    );
  });
});
module.exports = router;
