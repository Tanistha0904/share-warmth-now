const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// -------------------------------------------------------
// POSTGRES / SUPABASE CONNECTION
// -------------------------------------------------------
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

db.connect()
  .then(() => console.log("Connected to Supabase PostgreSQL"))
  .catch(err => console.error("DB Connection Error:", err));

// -------------------------------------------------------
// USER SIGNUP
// -------------------------------------------------------
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
    `;

    await db.query(sql, [name, email, hashedPassword, role]);

    res.json({ message: "User registered successfully" });

  } catch (err) {
    console.log("SIGNUP ERROR:", err);
    res.status(400).json({ message: "User already exists" });
  }
});

// -------------------------------------------------------
// USER LOGIN
// -------------------------------------------------------
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = $1";
    const result = await db.query(sql, [email]);

    if (result.rows.length === 0)
      return res.status(400).json({ message: "Invalid email" });

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user.id, role: user.role }, "SECRET_KEY", {
      expiresIn: "1d",
    });

    res.json({ message: "Login successful", token, role: user.role });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------------------------------------------
// ADD DONATION
// -------------------------------------------------------
app.post("/add-donation", async (req, res) => {
  try {
    const { title, category, description, location, contactInfo } = req.body;

    const sql = `
      INSERT INTO donations (title, category, description, location, contactInfo)
      VALUES ($1, $2, $3, $4, $5)
    `;

    await db.query(sql, [title, category, description, location, contactInfo]);

    res.json({ message: "Donation added successfully" });

  } catch (err) {
    console.log("ADD DONATION ERROR:", err);
    res.status(500).json({ message: "Database error" });
  }
});

// -------------------------------------------------------
// GET DONATIONS BY AREA
// -------------------------------------------------------
app.get("/rider/donations", async (req, res) => {
  try {
    const riderArea = req.query.area;

    if (!riderArea)
      return res.status(400).json({ message: "Area is required" });

    const sql = `
      SELECT * FROM donations
      WHERE LOWER(location) LIKE LOWER($1)
      ORDER BY created_at DESC
    `;

    const result = await db.query(sql, [`%${riderArea}%`]);

    res.json(result.rows);

  } catch (err) {
    console.log("FETCH DONATIONS ERROR:", err);
    res.status(500).json({ message: "Database error" });
  }
});

// -------------------------------------------------------
// RIDER SIGNUP
// -------------------------------------------------------
app.post("/rider/signup", async (req, res) => {
  try {
    const { name, phone, password, vehicle, area, notes } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO riders (name, phone, password, vehicle, area, notes)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;

    await db.query(sql, [name, phone, hashedPassword, vehicle, area, notes]);

    res.json({ message: "Rider registered successfully!" });

  } catch (err) {
    console.log("RIDER SIGNUP ERROR:", err);
    res.status(400).json({ message: "Phone already registered" });
  }
});

// -------------------------------------------------------
// RIDER LOGIN
// -------------------------------------------------------
app.post("/rider/login", async (req, res) => {
  try {
    const { phone, password } = req.body;

    const sql = "SELECT * FROM riders WHERE phone = $1";
    const result = await db.query(sql, [phone]);

    if (result.rows.length === 0)
      return res.status(400).json({ message: "Phone not registered" });

    const rider = result.rows[0];
    const isMatch = await bcrypt.compare(password, rider.password);

    if (!isMatch)
      return res.status(400).json({ message: "Wrong password" });

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

  } catch (err) {
    console.log("RIDER LOGIN ERROR:", err);
    res.status(500).json({ message: "Database errorr" });
  }
});


// -------------------------------------------------------
// ACCEPT DONATION
// -------------------------------------------------------
app.post("/accept-donation", async (req, res) => {
  try {
    const { donationId, riderName, riderContact } = req.body;

    const sql = `
      INSERT INTO accepted_donations (donation_id, rider_name, rider_contact, status)
      VALUES ($1, $2, $3, 'accepted')
    `;

    await db.query(sql, [donationId, riderName, riderContact]);

    res.json({ message: "Donation accepted!" });

  } catch (err) {
    console.log("ACCEPT DONATION ERROR:", err);
    res.status(500).json({ message: "Database error" });
  }
});

// -------------------------------------------------------
app.listen(5000, () => console.log("Server running on port 5000"));
