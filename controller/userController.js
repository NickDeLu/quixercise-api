const User = require('../models/User');

exports.getUser = async (req, res) => {

    try {
        let response = await User.getUser(req.param('id'));
        response.rows[0].pwd = ""; //hide password
        res.status(200).json(response.rows[0]) //returns an array by default but in this case theres only ever one project returned hence the [0]
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
};

exports.createUser = async (req, res) => {
    const user = req.body.user
    user.pwd = Buffer.from(user.pwd).toString('base64')
    try {
        let response = await User.createUser(user);
        response.rows[0].pwd = "";
        res.status(200).json(response.rows[0])
    } catch (err) {
        res.status(500).json(err)
    }
};

exports.updateUser = async (req, res) => {
    const user = req.body.user
    console.log("incoming user", JSON.stringify(req.body.user))
    try {
        let response = await User.updateUser(user);
        response.rows[0].pwd = "";
        console.log("after update", JSON.stringify(response.rows[0]))
        res.status(200).json(response.rows[0])
    } catch (err) {
        res.status(500).json(err)
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body.user
    console.log(JSON.stringify(req.body.user))
    try {
        let response = await User.getUserFromEmail(email);
        if (Buffer.from(response.rows[0].pwd, 'base64').toString() == password) {
            response.rows[0].pwd = ""
            res.status(200).json(response.rows[0]);
        } else {
            throw error;
        }
    } catch (err) {
        console.log("lOGIN ERROR")
        res.status(500).json({ ...err, msg: "login failed" })
    }
};