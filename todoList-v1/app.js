const express = require("express"); // the latest version of express
const bodyParser = require("body-parser"); // body parser >> data
const https = require('https');
const date = require(__dirname + "/date.js");

const app = express(); // bind the express module to app;
app.use(express.static("public")); // for the css and script file >> create the folder for them
app.use(bodyParser.urlencoded({ extended: true })); // use the form past by a html

app.set("view engine", "ejs"); // tell app to use ejs

app.listen(process.env.PORT || 3000, function() {
    console.log("Project on!");
});

var reminders = [];
var workingList = [];
app.get("/", function(req, res) {
    let day = date.getDate();
    res.render('list', { currentDay: day, newItem: reminders });
})

app.post("/", function(req, res) {
    var reminder = req.body.reminder;
    console.log(req.body);
    if (req.body.list === "Working") {
        workingList.push(reminder);
        res.redirect("/work");
    } else {
        reminders.push(reminder);
        res.redirect("/");
    }
})

app.get("/work", function(req, res) {
    res.render('list', { currentDay: "Working List", newItem: workingList });
})