const userRouter = require('express').Router();
const User = require('../models/user.js');

userRouter.get('/', (req, res)=> {
    res.send("HOME");
})

module.exports = userRouter; 

