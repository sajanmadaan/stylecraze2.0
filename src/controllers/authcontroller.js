require("dotenv").config();
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const { formatErrors } = require("../utils/validation");
const User = require("../models/user.model");

const newToken = (user) => {
    return jwt.sign({ user: user }, process.env.JWT_SECRET_KEY);
};




const register = async (req, res) => {


    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: formatErrors(errors.array()) });
        }
        let user = await User.findOne({ email: req.body.email }).lean().exec();

        if (user)
            return res.status(400).send({ message: "User with that email already exists" });

        user = await User.create(req.body);


        const token = newToken(user);

        return res.status(201).send({ user, token });



    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};




const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: formatErrors(errors.array()) });
        }

        let user = await User.findOne({ email: req.body.email });


        if (!user) return res.status(400).send({ message: "Either Email and password incorrect" });

        const match = user.checkPassword(req.body.password);


        if (!match)
            return res.status(400).send({ message: "Either Email and password incorrect" });

        const token = newToken(user);

        return res.status(201).send({ user, token });
    }

    catch (err) {
        return res.status(500).send({ message: err.message });
    }

};


module.exports = { register, login };