const express = require("express"); // the latest version of express
const bodyParser = require("body-parser"); // body parser >> data

const app = express(); // bind the express module to app;
app.use(express.static("public")); // for the css and script file >> create the folder for them
app.use(bodyParser.urlencoded({ extended: true })); // use the form past by a html
const date = require("./date.js");


app.set("view engine", "ejs"); // tell app to use ejs
const scoreList = [];
const userList = [];
const dateList = [];
var hasName = true;

app.listen(process.env.PORT || 3000, function() {
    console.log("Project on!");
});

app.get("/sound", function(req, res) {
    res.render("sound");
})

app.get("/", function(req, res) {
    sort();
    res.render("main", { userList: userList, scoreList: scoreList, dateList: dateList, validName: hasName });
})

app.post("/sound", function(req, res) {
    scoreList.push(req.body.message);
    dateList.push(date.getDate());
    res.redirect("/");
})

app.post("/", function(req, res) {
    if (req.body.name == null || req.body.name == "") {
        hasName = false;
        res.redirect("/");
    } else {
        hasName = true;
        userList.push(req.body.name);
        res.redirect("/sound");
    }
})

app.post("/return", function(req, res) {
    hasName = true;
    res.redirect("/");
})

// sort the order
function sort() {
    var flag = false;
    var len = scoreList.length;
    if (userList.length > scoreList.length) {
        userList.splice(userList.length - 1, 1); // if quit illegal, remove the last user
    }
    for (let i = 0; i < scoreList.length; i++) {
        for (let j = 0; j < len - 1; j++) {
            if (parseFloat(scoreList[j]) > parseFloat(scoreList[j + 1])) {
                let tmp = scoreList[j];
                scoreList[j] = scoreList[j + 1];
                scoreList[j + 1] = tmp;
                tmp = userList[j];
                userList[j] = userList[j + 1];
                userList[j + 1] = tmp;
                tmp = dateList[j];
                dateList[j] = dateList[j + 1];
                dateList[j + 1] = tmp;
                flag = true;
            }
        }
        len--;
        if (flag == false) break;
        flag = false;
    }
}