const mongoose = require('mongoose');

// connection URL
const url = 'mongodb://127.0.0.1:27017/';
// Database name
const dbName = 'fruitDB';
// connect to mongo database
mongoose.connect(url + dbName, { useNewUrlParser: true });

//  data schema
const fruitSchema = new mongoose.Schema({
    name: String,
    price: Number,
    review: String
});
// collection , insert the document
const peoples = mongoose.model("peoples", fruitSchema);

const res = peoples.updateMany({}, { $set: { price: 100 } });
const query = peoples.find({}); // condition
query.then(function(users) {
    console.log(users)
}).catch(function(err) {
    throw err;
});