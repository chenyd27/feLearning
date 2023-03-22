const express = require("express"); // the latest version of express
const bodyParser = require("body-parser"); // body parser >> data
const https = require('https');
const date = require(__dirname + "/date.js");


const app = express(); // bind the express module to app;
app.use(express.static("public")); // for the css and script file >> create the folder for them
app.use(bodyParser.urlencoded({ extended: true })); // use the form past by a html

app.set("view engine", "ejs"); // tell app to use ejs

const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');


app.listen(process.env.PORT || 3000, function() {
    console.log("Project on!");
});

const reminders = [];
const workingList = [];

// connection URL
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'todoDB';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
// 获取数据库对象
const db = client.db(dbName);
const collection = db.collection('reminders');
client.connect()
    .then(client => {
        console.log('Connected to MongoDB');
        findAll();
        findWork();
    })
    .catch(error => {
        console.error('Error connecting to MongoDB', error);
    });

function findAll() {
    // 查询文档
    collection.find({ type: 'all' }).toArray()
        .then(docs => {
            docs.forEach(function(reminder) {
                if (isValid(reminder.id, reminder.type)) {
                    reminders.push(reminder);
                }
            })
        })
        .catch(error => {
            console.error(error);
        });
}

function findWork() {
    // 查询文档
    collection.find({ type: 'work' }).toArray()
        .then(docs => {
            docs.forEach(function(reminder) {
                if (isValid(reminder.id, reminder.type)) {
                    workingList.push(reminder);
                }
            })
        })
        .catch(error => {
            console.error(error);
        });
}

function isValid(id, type) {
    let valid = true;
    if (type === 'work') {
        workingList.forEach(function(content) {
            if (content.id == id) valid = false;
        })
    } else {
        reminders.forEach(function(content) {
            if (content.id == id) {
                valid = false;
            }
        })
    }
    return valid;
}

function insertOne(content, type) {
    let index = uuidv4();
    let reminder = { content: content, type: type, id: index };
    collection.insertOne(reminder)
        .then(result => {
            console.log(result);
            if (type == 'all') reminders.push(reminder);
            else workingList.push(reminder);
        })
        .catch(error => {
            console.error(error);
        });
}


app.get("/", function(req, res) {
    let day = date.getDate();
    findAll();
    res.render('list', { currentDay: day, newItem: reminders });
})

app.post("/", function(req, res) {
    var reminder = req.body.reminder;
    if (req.body.list === "Working") {
        insertOne(reminder, 'work');
        res.redirect("/work");
    } else {
        insertOne(reminder, 'all');
        res.redirect("/");
    }
})

app.post("/delete", function(req, res) {
    var reminderId = req.body.checkbox;
    // 删除文档
    collection.deleteOne({ id: reminderId },
        function(err, result) {
            if (err) throw err;
            console.log(result);
        }
    );
    for (let i = 0; i < reminders.length; i++) {
        if (reminders[i].id == reminderId) {
            reminders.splice(i, 1);
        }
    }
    res.redirect("/");
})

app.get("/work", function(req, res) {
    findWork();
    res.render('list', { currentDay: "Working List", newItem: workingList });
})

app.get("/:customListName", function(req, res) {
    console.log(req.params.customListName);
    findDynamic(customlist)
    res.render('list', { currentDay: customList, newItem: customList });
})

const customList = []

function findDynamic(customlist) {
    // 查询文档
    collection.find({ type: customlist }).toArray()
        .then(docs => {
            docs.forEach(function(reminder) {
                if (isValid(reminder.id, reminder.type)) {
                    customList.push(reminder);
                }
            })
        })
        .catch(error => {
            console.error(error);
        });
}