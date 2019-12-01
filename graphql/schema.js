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
        password: String
    }
    input UserInput{
        name: String!,
        email: String!,
        password: String!
    }
    type RootQuery{
        welcome:Message,
        login(email:String!,password:String!):AuthData,
        getAllUser:[User],
        logOut:Boolean
    }
    type RootMutation{
        createUser(input:UserInput):User
        
    }
    schema{
        query:RootQuery,
        mutation:RootMutation

    }
`);
