const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type AuthData{
        userId:ID
        token: String
        tokenExpiration:Int
    }

    type Message {
        message:String
    }
    type User{
        id:ID
        name: String,
        email: String,
        phoneNo: String,
        password: String
    }
    input UserInput{
        name: String!,
        email: String!,
        phoneNo: String,
        password: String!
    }
    type OTPData{
        token:String,
        remaining:String
    }
    type RootQuery{
        welcome:Message,
        login(email:String!,password:String!):AuthData,
        getAllUser:[User],
        logOut:Boolean
    }
    type RootMutation{
        createUser(input:UserInput):AuthData,
        SendOtpCode(phone:String,secret:String):OTPData,
        verifyOtpCode(OTPCode:String,secret:String):Boolean,
        verifyOtpForLogin(OTPCode:String,secret:String,phone:String):AuthData,
        generateOTPSecret:String
        
    }
    schema{
        query:RootQuery,
        mutation:RootMutation

    }
`);
