const router = require("express").Router();
const controller = require("../controller/user_controller")

router.get("/signup", controller.signUpHandler);

router.get("/login", controller.loginHandler);

router.post('/signup', controller.sigupValidation);

router.post('/login', controller.loginValidation);

module.exports = router;