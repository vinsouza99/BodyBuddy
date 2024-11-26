import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import swaggerSetup from "./swagger.js";
import routes from "./routes/index.js";

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 8080;

// Allowed origins for CORS (This should be moved to environment variables)
const allowedOrigins = [
  "http://localhost:3000",
  "https://bodybuddy-umber.vercel.app",
  "https://www.bodybuddy.me"
];

// Create Express application
const app = express();

// Setup Swagger
swaggerSetup(app);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS: ${origin}`));
      }
    },
    credentials: true,
  })
);

// Routes setup
app.use("/api/", routes);

// 404 error handling
app.use("*", (req, res) => {
  res.status(404).json({
    status: "404",
    message: "Route not found",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
