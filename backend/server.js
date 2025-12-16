import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.routes.js";
import { authenticate } from "./middleware/auth.middleware.js";
import { authorizeRoles } from "./middleware/role.middleware.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

/* -------- ROOT TEST ROUTE (IMPORTANT) -------- */
app.get("/", (req, res) => {
  res.send("Backend is running");
});

/* -------- PATH FIX FOR ES MODULE -------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, "..", "mock", "hotels.json");
const hotels = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

/* -------- HOTELS ROUTES -------- */
app.get("/api/hotels", (req, res) => {
  const city = (req.query.city || "").toLowerCase();
  const items = hotels.filter(
    (h) =>
      h.location.toLowerCase().includes(city) ||
      h.name.toLowerCase().includes(city) ||
      city === ""
  );
  res.json(items);
});

app.get("/api/hotels/:id", (req, res) => {
  const h = hotels.find((x) => x.id === req.params.id);
  if (!h) return res.status(404).json({ error: "not found" });
  res.json(h);
});

/* -------- BOOKINGS (MOCK) -------- */
app.post("/api/bookings", (req, res) => {
  const ref = "BK" + Math.random().toString(36).slice(2, 9).toUpperCase();
  res.json({ ref });
});

/* -------- AUTH ROUTES -------- */
app.use("/api/auth", authRoutes);


/* -------- ROLE-BASED DASHBOARDS -------- */

app.get(
  "/api/user/dashboard",
  authenticate,
  authorizeRoles("USER"),
  (req, res) => {
    res.json({
      message: "Welcome USER",
      user: req.user
    });
  }
);

app.get(
  "/api/owner/dashboard",
  authenticate,
  authorizeRoles("OWNER"),
  (req, res) => {
    res.json({
      message: "Welcome OWNER",
      user: req.user
    });
  }
);

app.get(
  "/api/admin/dashboard",
  authenticate,
  authorizeRoles("ADMIN"),
  (req, res) => {
    res.json({
      message: "Welcome ADMIN",
      user: req.user
    });
  }
);

/* -------- DATABASE -------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* -------- SERVER -------- */
app.listen(5000, () =>
  console.log("Backend server running on http://localhost:5000")
);
