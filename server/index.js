const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = 5000;
const db = "mongodb+srv://jamalmohideen971:SIESCHAMPS@cluster0.kfufvok.mongodb.net/collegeproj?retryWrites=true&w=majority"; //Put the database connection string here

app.use(require("./routes"));

mongoose.connect(db).then(() => {
    console.log("success")
}).catch((err) => {
    console.log(err)
});

app.listen(port, () => {
    console.log("Listening on port : ", port);
})