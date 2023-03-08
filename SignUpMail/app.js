const express = require("express"); // the latest version of express
const bodyParser = require("body-parser"); // body parser >> data
const https = require('https');

const app = express(); // bind the express module to app;
app.use(express.static("public")); // for the css and script file >> create the folder for them
app.use(bodyParser.urlencoded({ extended: true })); // use the form past by a html

app.listen(process.env.PORT || 3000, function() {
    console.log("Sign Up on!");
});


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const arr = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: name,
                LNAME: name
            },
        }]
    }
    const jsonArr = JSON.stringify(arr);
    console.log(jsonArr);
    const url = "https://us9.api.mailchimp.com/3.0/lists/bb82f7a9eb";
    const options = {
        method: "POST",
        auth: "cyd:7a7ddcaa9e5f94b97b13d6b2561cdb94-us9"
    }
    const request = https.request(url, options, function(response) {
        if (response.statusCode === 200) {
            response.on("data", function(data) {
                var obj = JSON.parse(data);
                console.log(obj);
                res.sendFile(__dirname + "/success.html");
            })
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

    });
    request.write(jsonArr);
    request.end();
})


app.post("/failure", function(req, res) {
    res.redirect("/");
})