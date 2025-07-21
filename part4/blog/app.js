const express = require("express");
const mongoose = require("mongoose");
const {MONGODB_URI, PORT} = require("./utils/config")
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

const app = express();
app.use(express.json())

// logger.info("connecting to", MONGODB_URI)
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB", err.message);
    });

// app.use(express.static('dist'))
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
