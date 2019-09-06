const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');


router.post('/register', async (req, res) => {

    //Validation
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error);

    //Check if the user email exists in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if(emailExist) return res.status(400).send('Email already exists');

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const registeredUser = await user.save();
            res.json({ user: registeredUser.id });
    } 
    catch(err) {
        res.json({ message: err });
    } 
});

router.post('/login', async (req, res) => {
    //Validation
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error);
    //Check if the user email exists in the database
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send({ message: 'Email not found' });
    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send({ message: 'Invalid password' });
    //Create and assign JWT
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.send({ token: token });
});

module.exports = router;