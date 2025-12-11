const express = require("express")
require("dotenv").config()
const cors = require("cors")
const mongoose = require("mongoose")

const app = express();
const PORT = process.env.PORT;
BASE_URL = process.env.BASE_URL;
const DB_URL = process.env.DB_URL;

app.use(cors({origin: BASE_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.setEncoding("<h1>Welcome to SE NPRU Blog Restful API</h1>");
});

if(!DB_URL){
    console.error("DB URL is missing Plese set if in your .env file")
} else {
    mongoose.connect(DB_URL).then(() => {
        console.log("MongoDB connnected successfully");
    })
    .catch((error) =>{
        console.error("MongoDB connnection error:", error.message);
    })};

app.listen(PORT, () => {
    console.log("Server is runnig on https://localhost:" + PORT);
});