const express = require("express");
const cors = require("cors");

const app = express();

// Frontend adreslerini buraya ekle
const allowedOrigins = [
  "http://localhost:3000", // React veya Vite frontend
  "http://localhost:5173", // Vite için
  "http://localhost:8080", // olası başka local test portu
  "http://localhost:8083",
  "https://midgardoffice.com", // canlı site
  "https://midgard-backend-nodejs.onrender.com" // backend render domaini
];

// ✅ CORS ayarları
app.use(cors({
  origin: function (origin, callback) {
    // Postman veya server-side isteklerde origin boş olabilir, bu yüzden izin veriyoruz
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error("CORS engellendi:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Database
const db = require("./app/models");

db.sequelize.sync()
  .then(() => console.log("✅ Synced db."))
  .catch((err) => console.log("❌ Failed to sync db:", err.message));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Midgard application by VeM." });
});

// Routes
const tutorialRoutes = require("./app/routes/turorial.routes");
const messageRoutes = require("./app/routes/message.routes");

tutorialRoutes(app);
messageRoutes(app);

// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}.`);
});
