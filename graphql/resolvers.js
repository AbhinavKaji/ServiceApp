const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;
const bcrypt = require('bcryptjs');
let sequelize = require('../db/sequelize');
const User = require('../models/user')(sequelize, DataTypes);
module.exports = {
    welcome:async function(args,req) {
        // if(!req.isAuth){
        //     throw new Error("unautho");
        // }
        return { message: "welcome to service app" };
    },
    login: async function({ email,password }) {
        const user = await User.findByCredentials(email,password);
        const token = await User.generateAuthToken(user);
        return { userId : user.id , token , tokenExpiration : 1 };
    },
    logOut: async function({},req) {
        try {
            if(!req.isAuth){
                throw new Error("unautho");
            }
            req.isAuth = false;
            req.userId = null;
            return true;
        } catch (error) {
            return false;
        }
    },
    createUser: async function({input}){
        
        const existingUser = await User.findOne({ where: { email: input.email } });
        if(existingUser){
            throw new Error('user already exists');
        }
        const user = new User({
            email:input.email,
            name:input.name,
            password: input.password
        });
        try{
            if(!user){
                throw new Error('user',user);
            }

            const result = await user.save();
            return{ name: result.name,email: result.email, password:null, id:result.id };
        } catch (error) {
            throw new Error("user not created");
        }
        
    },
    getAllUser: async function({},req) {
        if(!req.isAuth){
            throw new Error("unautho");
        }
        const list = await User.findAll();
        list.forEach(element => {
            element.password = null;
        });
        return list;
    }

};