const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get("/test", (req, res) => {
    res.json({
      message: "Welcome to service app."
    });
});

// app.use(
//     "/graphql",
//     graphqlHttp({
//       schema: graphqlSchema,
//       rootValue: graphqlResolver,
//       graphiql: true
//     })
// );

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
});