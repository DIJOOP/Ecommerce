const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require ("cloudinary")

// handling uncaught exeption
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log("server shutting down due to uncaught exception error");
  process.exit(1);
});

// config
dotenv.config({ path: "backend/config/.env" });

// connect database
connectDatabase();

// cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const server = app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});

// unhandled Promise rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log("shutting down server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
