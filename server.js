require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

//create a server
const app = express();

//connect to db
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Db connected!"))
    .catch((error) => console.log("Failed to connect", error));

//health api
app.get("/health", (req, res) => {
    res.json({
        service: "job listing server",
        status: "Active",
        time: new Date(),
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
