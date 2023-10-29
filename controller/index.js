const BlogModel = require('../models/blog.model');
const Blog = require('../models/publishedBlog');
const Model = require('../models/user.model');
const logger = require('../logger');
const middleware = require('../middleware/globalMiddleware');
const jwt = require('jsonwebtoken');

const welcomePageHandler = (req, res) => {
    res.render("home");
}

const allBlogHandler = async (req, res) => {
    const allBlogs = await Blog.find();
    res.render("allBlogs", { blogs: allBlogs});
}

const homePageHandler = async (req, res) => {
    const allBlogs = await Blog.find();
    res.render("index", { blogs: allBlogs});
}

const draftPageHandler = async (req, res) => {
    const allBlogs = await BlogModel.find();
    res.render("draft", { blogs: allBlogs});
}

const composerPageHandler = async (req, res) => {
    res.render("composeBlog")
}

const blogComposerHandler = async (req, res) => {
    const { title, content} = req.body;

    // check for the missing fields
    if (!title || !content ) {
        return res.send("Please enter all the required credentials!")
    }

    const decoded = jwt.verify(req.cookies.data, process.env.SECRETKEY);
    const user = await Model.UserModel.findOne({ _id: decoded._id} )

    const writer = `${user.firstName} ${user.lastName}`
    const newBlog = new BlogModel({ title, content, writer})

    // save the blog to the database
    newBlog.save()

    .then(() => {
        logger.info('[blogComposer]] => Blog Saved Successfully.')
        res.redirect('/draft')
    })
    .catch((err) =>{
        console.log(err)
    })

}

const blogHandler = async (req, res) => {
    const {id} = req.params

    const getBlog = await BlogModel.findOne({_id: id});

    res.render("readMoreBlog", { blog: getBlog});
}

const viewMoreHandler = async (req, res) => {
    const {id} = req.params

    const getBlog = await Blog.findOne({_id: id});

    res.render("readMorePublishedBlog", { blog: getBlog});
}

const editPageHandler = async (req, res) => {
    const {id} = req.params;

    const getData = await BlogModel.findOne({ _id: id});
    res.render("editBlog", {blog: getData});
}

const blogEditHandler = async (req, res) => {
    const {title, content} = req.body;
    const {id} = req.params;

    BlogModel.updateOne({_id: id}, {title, content})
    .then(() => {
        logger.info('[blogEdit]] => Blog Edited Successfully.')
        res.redirect('/blog')
    })
    .catch((err) => {
        logger.err(err.message);
    })
}

const publishPageHandler = async (req, res) => {
    const {id} = req.params;

    const getData = await BlogModel.findOne({ _id: id});
    res.render("publishBlog", {blog: getData});
}

const publishBlogHandler = async (req, res) => {
    const { title, content} = req.body;

    // check for the missing fields
    if (!title || !content ) {
        return res.send("Please enter all the required credentials!")
    }

    const decoded = jwt.verify(req.cookies.data, process.env.SECRETKEY);
    const user = await Model.UserModel.findOne({ _id: decoded._id} )

    const writer = `${user.firstName} ${user.lastName}`
    const newBlog = new Blog({ title, content, writer})

    // save the blog to the database
    newBlog.save()

    .then(() => {
        logger.info('[blogComposer]] => Blog Saved Successfully.')
        res.redirect('/blog')
    })
    .catch((err) =>{
        console.log(err)
    })


}

const blogDeleteHandler = async (req, res) => {
    const {id} = req.params;

    await BlogModel.deleteOne({ _id: id})
    .then(() => {
        logger.info('[blogDelete]] => Blog Deleted Successfully.')
        res.redirect("/blog")
    })
    .catch((err) => {
        logger.err(err.message);
    })
}

const publishedBlogDeleteHandler = async (req, res) => {
    const {id} = req.params;

    await Blog.deleteOne({ _id: id})
    .then(() => {
        logger.info('[blogDelete]] => Blog Deleted Successfully.')
        res.redirect("/blog")
    })
    .catch((err) => {
        logger.err(err.message);
    })
}

const authRoute = async (req, res, next, err) => {
    if( req.cookies.data[1] ){
        if (err) {
            return res.redirect('/login');
        }
        const verify = jwt.verify(req.cookies.data[1], process.env.SECRETKEY);
        next()
    }else {
        return res.redirect('/')
    }

    
}

module.exports = {
    welcomePageHandler,
    allBlogHandler,
    homePageHandler,
    draftPageHandler,
    composerPageHandler,
    blogComposerHandler,
    blogHandler,
    viewMoreHandler,
    editPageHandler,
    blogEditHandler,
    publishPageHandler,
    publishBlogHandler,
    blogDeleteHandler,
    publishedBlogDeleteHandler,
    authRoute
}