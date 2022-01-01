const express = require("express");
const {getBlogPosts} = require("./mongo")
global.blog_posts = []

const app = express();
app.set('view engine', 'ejs')
app.use(express.static("views"));

//TODO: error handling and input validation for the blog routes


/*
The database cluster I'm using is really slow. I don't want to read from it
every time someone opens a blog page. Furthermore, I don't anticipate anyone getting
mad they won't be able to see my blog posts the millisecond they are published.
So, I'm just reading from the database every once in a while, and storing the info
in a global variable (global.blog_posts). Bad practice I'm sure, but I'm the only one who has to deal
with this code.
 */
//TODO: decide how long timeout should be
getBlogPosts();
setInterval(getBlogPosts, 100000)


// Simply a static webpage
app.get('/', (req, res) => {
    res.render('home');
})

// Another static webpage. Well, at least as far as I'm concerned
app.get('/resume', (req, res) => {
    res.render('resume');
})

// This section of the site is dynamic and (will be) paginated
app.get('/blog/:page([0-9]+)?', (req, res) => {
    if (req.params.page === undefined) {
        req.params.page = 1;
    }
    let start_post = (req.params.page - 1) * 10;
    //res.render('blog', {posts: global.blog_posts.slice(start_post, start_post + 10)})
    //TODO: Paginate the blog
    res.render('blog', {posts: global.blog_posts})
})

app.get('/blog/post', (req, res) => {
    for (let i = 0; i < global.blog_posts.length; i++) {
        // This part especially is begging for some error handling
        if (global.blog_posts[i]._id.toString() == req.query.id) {
            res.render('post', {blog_post: global.blog_posts[i]})
        }
    }
})

app.listen(5001)
