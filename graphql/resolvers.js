const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;
const bcrypt = require('bcryptjs');
let sequelize = require('../db/sequelize');
const User = require('../models/user')(sequelize, DataTypes);
const Serviceproviderdetails = require('../models/serviceproviderdetails')(sequelize, DataTypes);
const WorkingPlatform = require('../models/workingplatform')(sequelize, DataTypes);
// var messagebird = require('messagebird')('jAr0jrNGmfYtjQVjpIC9G6tTL');
const speakeasy = require("speakeasy");

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
            phoneNo:input.phoneNo,
            name:input.name,
            password: input.password
        });
        try{
            if(!user){
                throw new Error('user',user);
            }

            const result = await user.save();
            // return{ name: result.name,email: result.email, password:null, id:result.id };
            // const user = await User.findByCredentials(input.email,input.password);
        const token = await User.generateAuthToken(result);
        return { userId : result.id , token , tokenExpiration : 1 }
        } catch (error) {
            throw new Error("user not created");
        }
        
    },
    getServiceProvider: async function({id},req){
        try {
            const serviceProvider = await Serviceproviderdetails.findOne({where:{ServiceProviderId: id}});
            if(!serviceProvider){
                console.log("service provider not found");
            }
            const platform = await WorkingPlatform.findAll({where:{ServiceProviderId: serviceProvider.id}});
            let result = Object.assign(serviceProvider, {
                WorkingPlatform: platform
            });
            return result;
        } catch (error) {
            return error;
        }
    },
    updateServiceProvider: async function({id,ServiceProviderDetailsInput},req){
        try {
            const serviceprovider = await Serviceproviderdetails.findOne({where:{ServiceProviderId: id}})
            .then(function(obj){
                if(obj){
                    Serviceproviderdetails.update({
                        ...ServiceProviderDetailsInput
                    });
                }
                Serviceproviderdetails.create({
                    ...ServiceProviderDetailsInput
                })
            });
            if (ServiceProviderDetailsInput.workingPlatform.length > 0) {
                await WorkingPlatform.destroy({
                  where: {
                    ServiceProviderId:serviceprovider.id
                  }
                });
                let result = ServiceProviderDetailsInput.workingPlatform.map(x => {
                  return new Promise(async resolve => {
                    const WP = await WorkingPlatform.create({
                        ServiceProviderId:serviceprovider.id,
                        platform:x
                    });
                    resolve(WP);
                  });
                });
                Promise.all(result).then(WP => {
                  console.log("saftey training created successfully");
                });
            }
        return { message: "true" };
        } catch (error) {
            return error;
        }
    },
    getAllUser: async function({},req) {
        // if(!req.isAuth){
        //     throw new Error("unautho");
        // }
        const list = await User.findAll();
        list.forEach(element => {
            // element.password = null;
        });
        return list;
    },
    generateOTPSecret:async function({}) {
        var secret = speakeasy.generateSecret({length:20});
        return (secret.base32);
    },
    SendOtpCode: async function({phone,secret},req) {
        // const a = messagebird.verify.create(phone,{
        //     template:`Your verification code is %token`
        // },function(err,response) {
        //     if(err){
        //         console.log("msg nor send",err)
        //     }
        //     else{
        //         console.log (response.id);
        //         return true;
        //     }
        // })
        // console.log(a);
        // return true;
        const token = speakeasy.totp({
            secret:secret,
            encoding:"base32"
        })
        var remaining = 30-Math.floor((new Date().getTime()/1000 % 30));
        return {token,remaining};
    },
    verifyOtpCode: async function({OTPCode,secret},req) {
        var verifyIt= speakeasy.totp.verify({
            secret: secret,
            encoding:"base32",
            token: OTPCode,
            window:0
        }) 
        if(verifyIt == "false"){
            throw new Error("not verified user");
        }
        return verifyIt;
    },
    verifyOtpForLogin: async function({OTPCode,secret,phone},req) {
        var verifyIt= speakeasy.totp.verify({
            secret: secret,
            encoding:"base32",
            token: OTPCode,
            window:0
        }) 
        if(verifyIt == "false"){
            throw new Error("not verified user");
        }
        const user = await User.findOne({ where: { phoneNo: phone } });
        if(!user){
            throw new Error("user does not exist");
        }
        const token = await User.generateAuthToken(user);
        return { userId : result.id , token , tokenExpiration : 1 }
    }

};