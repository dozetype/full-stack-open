const logger = require("./logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
    logger.info("Method:", request.method);
    logger.info("Path:  ", request.path);
    logger.info("Body:  ", request.body);
    logger.info("---");
    next();
};

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
    logger.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    } else if (
        error.name === "MongoServerError" &&
        error.message.includes("E11000 duplicate key error")
    ) {
        return response
            .status(400)
            .json({ error: "expected `username` to be unique" });
    } else if (error.name === "JsonWebTokenError") {
        return response.status(401).json({ error: "token invalid" });
    } else if (error.name === "TokenExpiredError") {
        return response.status(401).json({
            error: "token expired",
        });
    }

    next(error);
};

const tokenExtractor = (req, res, next) => {
    // For extracting Authorization Token from curl header
    const authorization = req.get("authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
        req.token = authorization.replace("Bearer ", "");
    }
    next();
};

const userExtractor = async (req, res, next) => {
    if(req.method !== "GET"){
        const decodedToken = jwt.verify(req.token, process.env.SECRET);
        if (!decodedToken.id) {
            return res.status(401).json({
                error: "token invalid",
            });
        }
        const user = await User.findById(decodedToken.id);
        if (!user) {
            return res.status(400).json({ error: "userID missing or not valid" });
        }
        req.user = user;
    }
    next();
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor,
};
