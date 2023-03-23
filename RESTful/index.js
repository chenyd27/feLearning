const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require('ejs');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

const articleSchema = {
    title: String,
    content: String
};
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", { useNewUrlParser: true, useUnifiedTopology: true });
const Article = mongoose.model("articles", articleSchema);

app.listen(3000, function() {
    console.log("Server started on port 3000");
});

app.get('/all', function(req, res) {
    Article.find({}, function(err, data) {
        if (!err) {
            const answer = {};
            answer.flag = err;
            answer.articles = data;
            res.send(answer);
        } else {
            res.send(err);
        }
    })
});

app.post('/post', function(req, res) {
    const article = new Article({
        title: req.body.title,
        content: req.body.content
    })
    article.save(function(err) {
        if (!err) {
            res.send({
                flag: "success insert a new article"
            })
        } else {
            res.send({
                flag: "error with insert"
            });
        }
    });
});


app.delete('/deleteAll', function(req, res) {
    Article.deleteMany({}, function(err) {
        if (!err) {
            res.send("delete success");
        } else {
            res.send("error in delete process")
        }
    })
});

app.route('/articles').get(function(req, res) {
    Article.find({}, function(err, data) {
        if (!err) {
            const answer = {};
            answer.flag = err;
            answer.articles = data;
            res.send(answer);
        } else {
            res.send(err);
        }
    })
}).post(function(req, res) {
    const article = new Article({
        title: req.body.title,
        content: req.body.content
    })
    article.save(function(err) {
        if (!err) {
            res.send({
                flag: "success insert a new article"
            })
        } else {
            res.send({
                flag: "error with insert"
            });
        }
    });
}).delete(function(req, res) {
    Article.deleteMany({}, function(err) {
        if (!err) {
            res.send("delete success");
        } else {
            res.send("error in delete process")
        }
    })
})

app.get('/article/:articleTitle', function(req, res) {
    const title = req.params.articleTitle;
    // req.params >> json contains the parameters in the url
    Article.findOne({ title: title }, function(err, data) {
        if (!err) {
            const answer = {};
            answer.flag = err;
            answer.articles = data;
            res.send(answer);
        } else {
            res.send(err);
        }
    })
})

app.put('/article/:articleTitle', function(req, res) {
    const title = req.params.articleTitle;
    // req.params >> json contains the parameters in the url
    Article.update({ title: title }, { content: res.body.content, title: res.body.title }, { overwrite: true },
        function(err) {
            if (!err) {
                res.send("success");
            } else {
                res.send(err);
            }
        })
})

app.patch('/article/:articleTitle', function(req, res) {
    const title = req.params.articleTitle;
    // req.params >> json contains the parameters in the url
    // dynamic update the title or content
    Article.update({ title: title }, { $set: req.body },
        function(err) {
            if (!err) {
                res.send("success");
            } else {
                res.send(err);
            }
        })
})

app.delete('/article/:articleTitle', function(req, res) {
    const title = req.params.articleTitle;
    // req.params >> json contains the parameters in the url
    // dynamic update the title or content
    Article.deleteOne({ title: title }, function(err) {
        if (!err) {
            res.send("success");
        } else {
            res.send(err);
        }
    })
})