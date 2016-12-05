var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var db; //= mongoose.connect("mongodb://localhost/bookApi");

if (process.env.ENV == 'Test') {
    db = mongoose.connect("mongodb://localhost/bookApiTest");
} else {
    db = mongoose.connect("mongodb://localhost/bookApi");
}

var Book = require("./models/book");

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var bookRouter = require("./routes/book")(Book);
app.use("/api/books", bookRouter);
//app.use("/api/authors", bookAuthor);



app.get("/", function (req, res) {
    res.send("welcome to my api");
});

app.listen(port, function () {
    console.log("Gulp is running my app on PORT: " + port);
})

module.exports = app;