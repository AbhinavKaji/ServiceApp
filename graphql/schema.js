const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type AuthData{
        userId:ID!
        token: String!
        tokenExpiration:Int!
    }

    type RootQuery{
        login(email:String!,password:String!):AuthData,
    }

    type RootMutation{
        
    }
    schema{
        query:RootQuery,
        mutation:RootMutation
    }
`);
