const express = require("express"); // the latest version of express
const bodyParser = require("body-parser"); // body parser >> data
const ejs = require("ejs");
const app = express(); // bind the express module to app;
app.use(express.static("public")); // for the css and script file >> create the folder for them
app.use(bodyParser.urlencoded({ extended: true })); // use the form past by a html
app.set("view engine", "ejs"); // tell app to use ejs
// Set up your project

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const textList = [];

app.listen(process.env.PORT || 3000, function() {
    console.log("Project on!");
});

app.get("/", function(req, res) {
    res.render("Home", { homeStartingContent: homeStartingContent, textList: textList });
})

app.get("/about", function(req, res) {
    res.render("About", { aboutContent: aboutContent });
})

app.get("/contact", function(req, res) {
    res.render("Contact", { contactContent: contactContent });
})

app.get("/compose", function(req, res) {
    res.render("Compose");
})

app.post("/compose", function(req, res) {
    var text = {};
    text.title = req.body.title;
    text.post = req.body.post;
    textList.push(text);
    res.redirect("/");
})

app.get('/detail/:detailId', function(req, res) {
    const index = req.params.detailId;
    res.render("Detail", { title: textList[index].title, post: textList[index].post });
})