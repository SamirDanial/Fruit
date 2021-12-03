const express = require('express');
const connectDB = require('./config/db');
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');


const app = express();

connectDB();

app.use(express.json({ extended: false }))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  app.use(
    "/graphql",
    graphqlHTTP({
      graphiql: true,
      schema: graphqlSchema,
      rootValue: graphqlResolver,
      formatError(error) {
        if (!error.originalError) {
          return error
        }
        const message = error.message || "An Error Occured";
        const data = error.originalError.data;
        const code = error.originalError.code || 500;
        return { message: message, status: code , data: data}
      }
    })
  );

app.get('/', (req, res) => {
    res.send('Now is Okay')
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})