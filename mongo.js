const {MongoClient} = require("mongodb");
const fs = require("fs");

let raw = fs.readFileSync("credentials.json");
// TODO: make sure this plays well with the app.use line in app.js
let credentials = JSON.parse(raw.toString());
const client = new MongoClient(credentials.database_uri);

async function getBlogPosts() {
    try {
        // Connect the client to the server
        await client.connect();
        // Establish and verify connection
        let documents = await client.db("myFirstDatabase").collection("blog_posts").find().sort({date: 1})
        documents = await documents.toArray()
        console.log(documents)
        global.blog_posts = documents
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

module.exports = { getBlogPosts };
