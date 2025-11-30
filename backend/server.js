const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Tanvi@0904",
  database: "sharewarmth"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected...");
});


// ---------------------------------------------------
// USER SIGNUP
// ---------------------------------------------------
app.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, hashedPassword, role], (err) => {
    if (err) return res.status(400).json({ message: "User already exists" });
    res.json({ message: "User registered successfully" });
  });
});

// USER LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM user WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user.id, role: user.role }, "SECRET_KEY", {
      expiresIn: "1d",
    });

    res.json({ message: "Login successful", token, role: user.role });
  });
});


// ---------------------------------------------------
// ADD DONATION
// ---------------------------------------------------
app.post("/add-donation", (req, res) => {
  const { title, category, description, location, contactInfo } = req.body;

  const sql =
    "INSERT INTO donations (title, category, description, location, contactInfo) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [title, category, description, location, contactInfo], (err) => {
    if (err) {
      console.log("DATABASE ERROR:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "Donation added successfully" });
  });
});


// ---------------------------------------------------
// GET DONATIONS FILTERED BY AREA
// ---------------------------------------------------
app.get("/rider/donations", (req, res) => {
  const riderArea = req.query.area; // ex: Delhi

  if (!riderArea) {
    return res.status(400).json({ message: "Area is required" });
  }

  const sql = `
    SELECT * FROM donations
    WHERE LOWER(location) LIKE LOWER(?)
    ORDER BY created_at DESC
  `;

  db.query(sql, [`%${riderArea}%`], (err, results) => {
    if (err) {
      console.log("FILTER DONATIONS ERROR:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
});


// ---------------------------------------------------
// RIDER SIGNUP (with password)
// ---------------------------------------------------
app.post("/rider/signup", async (req, res) => {
  const { name, phone, password, vehicle, area, notes } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = `
    INSERT INTO riders (name, phone, password, vehicle, area, notes)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, phone, hashedPassword, vehicle, area, notes], (err) => {
    if (err) {
      console.log("RIDER SIGNUP ERROR:", err);
      return res.status(400).json({ message: "Phone already registered" });
    }
    res.json({ message: "Rider registered successfully!" });
  });
});


// ---------------------------------------------------
// RIDER LOGIN
// ---------------------------------------------------
app.post("/rider/login", (req, res) => {
  const { phone, password } = req.body;

  const sql = "SELECT * FROM riders WHERE phone = ?";
  db.query(sql, [phone], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ message: "Phone not registered" });
    }

    const rider = results[0];
    const isMatch = await bcrypt.compare(password, rider.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: rider.id, area: rider.area },
      "RIDER_SECRET",
      { expiresIn: "2d" }
    );

    res.json({
      message: "Rider login successful",
      token,
      rider: {
        id: rider.id,
        name: rider.name,
        area: rider.area,
        phone: rider.phone,
      },
    });
  });
});


// ---------------------------------------------------
// ACCEPT DONATION
// ---------------------------------------------------
app.post("/accept-donation", (req, res) => {
  const { donationId, riderName, riderContact } = req.body;

  const sql = `
    INSERT INTO accepted_donations (donation_id, rider_name, rider_contact, status)
    VALUES (?, ?, ?, 'accepted')
  `;

  db.query(sql, [donationId, riderName, riderContact], (err) => {
    if (err) {
      console.log("ACCEPT DONATION ERROR:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "Donation accepted!" });
  });
});


// ---------------------------------------------------
app.listen(5000, () => console.log("Server running on port 5000"));

