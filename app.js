const express = require("express");
const path = require("path");
let blog_posts = []

const app = express();
app.set('view engine', 'ejs')
app.use(express.static("views"));


// Simply a static webpage
app.get('/', (req, res) => {
    res.render('home');
})

// Another static webpage. Well, at least as far as I'm concerned
app.get('/resume', (req, res) => {
    res.render('resume');
})

// This section of the site is dynamic and paginated
app.get('/blog/:page([0-9]+)?', (req, res) => {
    if (req.params.page === undefined) {
        req.params.page = 1;
    }
    let start_post = (req.params.page - 1) * 10;
    console.log(req.params.page)
    let blog_posts = [{name: "Noah Mancino", date: "June 1999", blurb: "Hello, this is a test blurb", subject: "test", title: "hello i am doing lots of text here to see what happens and more and more and more and more"}]
    blog_posts.push({name: "Noah Mancino", date: "April 2021", blurb: "Test blurb 2", subject: "whatever", title: "A noble title"})
    blog_posts.push({name: "Noah Mancino", date: "April 2021", blurb: "Test blurb 2", subject: "whatever", title: "A noble title"})
    blog_posts.push({name: "Noah Mancino", date: "April 2021", blurb: "Test blurb 2", subject: "whatever", title: "A noble title"})
    blog_posts.push({name: "Noah Mancino", date: "April 2021", blurb: "Test blurb 2", subject: "whatever", title: "A noble title"})
    blog_posts.push({name: "Noah Mancino", date: "April 2021", blurb: "Test blurb 2", subject: "whatever", title: "A noble title"})
    blog_posts.push({name: "Noah Mancino", date: "April 2021", blurb: "Test blurb 2", subject: "whatever", title: "A noble title"})
    blog_posts.push({name: "Noah Mancino", date: "April 2021", blurb: "Test blurb 2", subject: "whatever", title: "A noble title"})
    blog_posts.push({name: "Noah Mancino", date: "April 2021", blurb: "Test blurb 2", subject: "whatever", title: "A noble title"})

    res.render('blog', {posts: blog_posts.slice(start_post, start_post + 10)})
})

app.listen(5001)
