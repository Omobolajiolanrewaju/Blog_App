const mongoose = require('mongoose');
const shortid = require('shortid')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const publishedBlogSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    posted_at: {
        type: String,
        default: new Date().toString()
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    writer: { type: String }
})

const Blog = mongoose.model("publishedBlog", publishedBlogSchema);
module.exports = Blog;