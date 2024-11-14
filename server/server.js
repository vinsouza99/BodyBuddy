import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import swaggerSetup from "./swagger.js";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import { Buffer } from "buffer";

global.Buffer = Buffer;

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

swaggerSetup(app);

app.use(express.json());

const allowedOrigins = ["http://localhost:3000", "https://bodybuddy-umber.vercel.app/"];
app.use(
  cors({
    origin: allowedOrigins, // Clarify client URL (origin)
    credentials: true, // Allow cookies
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/* Routes */
app.use("/api/", routes);

app.use("*", (req, res) => {
  res.status(404).json({
    status: "404",
    message: "Route not found",
  });
});

export default app;
