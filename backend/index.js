const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path"); // เพิ่ม path สำหรับจัดการเส้นทางไฟล์
const fs = require("fs"); // เพิ่ม fs สำหรับจัดการไฟล์ระบบ
const userRoute = require("./routers/user.router");
const postRoute = require("./routers/post.router");

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

// --- ส่วนของการจัดการไฟล์ (Multer Setup) ---
// ตรวจสอบว่ามีโฟลเดอร์ uploads หรือไม่ ถ้าไม่มีให้สร้างใหม่
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ตั้งค่าให้โฟลเดอร์ uploads สามารถเข้าถึงได้ผ่าน URL (Static Files)
// เช่น http://localhost:5000/uploads/filename.jpg
app.use("/uploads", express.static(uploadDir));

// --- Middleware ---
app.use(
  cors({
    origin: "http://localhost:5173", // URL ของ Frontend
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Database Connection ---
if (!DB_URL) {
  console.error("DB URL is missing. Please set it in your .env file");
} else {
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error.message);
    });
}

// --- Routes ---
app.get("/", (req, res) => {
  res.send("<h1>Welcome to SE NPRU Blog Restful API</h1>");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);

// --- Error Handling Middleware (Optional) ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});