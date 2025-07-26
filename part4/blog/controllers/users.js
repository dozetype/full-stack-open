const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
    const users = await User.find({}).populate("blogs", {
        title: 1,
        author: 1,
        url: 1,
    }); // populate to connect users and blogs with foreign key(SQL JOIN) instead of only showing key
    res.json(users);
});

usersRouter.post("/", async (req, res) => {
    const { username, name, password } = req.body;

    const saltRounds = 10;
    if (!password || password.length < 3) {
        res.status(400).json({
            error: "Missing Password or less than 3 letters",
        });
    }
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name,
        passwordHash,
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
});

module.exports = usersRouter;
