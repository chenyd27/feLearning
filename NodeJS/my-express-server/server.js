const express = require("express"); // the latest version of express
const bodyParser = require("body-parser"); // body parser >> data
const https = require('https');

const app = express(); // bind the express module to app;
app.use(bodyParser.urlencoded({ extended: true })); // use the form past by a html
app.listen(3000);

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    var query = req.body.typeName;
    console.log(query);
    https.get("https://api.chucknorris.io/jokes/" + query, function(response) {
        response.on("data", function(data) {
            obj = JSON.parse(data);
            res.write(obj.value);
            res.send();
        })
    });
})