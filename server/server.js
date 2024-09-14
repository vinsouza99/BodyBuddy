const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.listen(8080,() => {
    console.log("Server started on port 8080");
})

/* Routes */
app.get("/api", (req,res) => {
    res.json("THIS COMES FROM THE SERVER");
})