const express = require('express');
const db = require('./db/index');
const dotenv = require('dotenv');
const router = require('./routes/index');
const userRoutes = require('./routes/user-route');
const cookieParser = require('cookie-parser');

const app = express();

// env data
dotenv.config();
const PORT = process.env.PORT;

// connection to mongodb
db.connect();

// middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// routes
app.use(router);
app.use(userRoutes);

// server configurations are here...
app.listen(PORT, () => {
    console.log(`Server started listening at: http://localhost:${PORT}`);
})