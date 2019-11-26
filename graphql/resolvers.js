const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const bcrypt = require('bcryptjs');
const User = require("../models/user");
module.exports = {
    login: async function({ email,password }) {
        const user = await User.findByCredentials(email,password);
        const token = await User.generateAuthToken(user);
        return{userId:user.Id,token,tokenExpiration:1};
    },

};