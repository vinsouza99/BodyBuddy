export const maxDuration = 60;
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import swaggerSetup from "./swagger.js";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
// import { Buffer } from "buffer";
// global.Buffer = Buffer;

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

swaggerSetup(app);

app.use(express.json());

// const allowedOrigins = ["http://localhost:3000", "https://bodybuddy-umber.vercel.app"];
const allowedOrigins = ["http://localhost:3000", /^https:\/\/bodybuddy.*\.vercel\.app$/, "https://www.bodybuddy.me"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.some((allowed) =>
        typeof allowed === "string" ? allowed === origin : allowed.test(origin)
      )) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
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
