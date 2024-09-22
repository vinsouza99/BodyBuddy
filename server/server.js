import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import swaggerSetup from './swagger.js';
import routes from './routes/index.js';

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

swaggerSetup(app);

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

/* Routes */
app.get("/", (req,res) => {
  res.json("THIS COMES FROM THE SERVER");
});

app.use("/api/", routes);

app.use("*", (req, res) => {
  res.status(404).json({
    status: "404",
    message: "Route not found"
  });
});