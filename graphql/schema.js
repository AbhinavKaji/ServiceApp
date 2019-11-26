const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type AuthData{
        userId:ID!
        token: String!
        tokenExpiration:Int!
    }

    type Message {
        message:String
    }

    type RootQuery{
        welcome:Message,
    }
    type RootMutation{
        welcome:Message,
        login(email:String!,password:String!):AuthData
    }
    schema{
        query:RootQuery,
        mutation:RootMutation

    }
`);
