const express = require('express')
const graphqlHttp = require("express-graphql");
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");
const sequelize = require("./db/sequelize");
const isAuth = require("./middleware/auth");
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get("/test", (req, res) => {
    res.json({
      message: "Welcome to service app."
    });
});

app.use(
    "/graphql",
    graphqlHttp({
      schema: graphqlSchema,
      rootValue: graphqlResolver,
      graphiql: true
    })
);
app.use(isAuth);

sequelize.sync().then(() => {
    app.listen(port, () =>
      console.log(`Apollo server started at http://localhost:${port}`)
    );
  });