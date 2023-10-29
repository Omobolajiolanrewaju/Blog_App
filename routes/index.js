const express = require('express');
const controller = require('../controller/index');
const middleware = require('../middleware/globalMiddleware')


const router = express.Router();

router.get("/", controller.welcomePageHandler);

router.get("/allblogs", controller.allBlogHandler);

router.get("/blog", middleware.authRoute , controller.homePageHandler);

router.get("/draft", middleware.authRoute , controller.draftPageHandler);

router.get("/blog/compose", middleware.authRoute , controller.composerPageHandler);

router.post("/compose", middleware.authRoute , controller.blogComposerHandler);

router.get("/blog/:id", middleware.authRoute , controller.blogHandler);

router.get("/blog/more/:id", middleware.authRoute , controller.viewMoreHandler);

router.get("/edit/:id", middleware.authRoute , controller.editPageHandler);

router.get("/delete/:id", middleware.authRoute , controller.blogDeleteHandler);

router.post("/edit/:id", middleware.authRoute , controller.blogEditHandler);

router.get("/publish/:id", middleware.authRoute , controller.publishPageHandler);

router.post("/publish/:id", middleware.authRoute , controller.publishBlogHandler);

router.get("/blog/delete/:id", middleware.authRoute , controller.publishedBlogDeleteHandler);

module.exports = router