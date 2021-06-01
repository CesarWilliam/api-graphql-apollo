const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const cors = require("cors");
const connectDb = require("./config/db");

async function startServer() {
    const app = express();
    app.use(cors());
    const apolloServer = new ApolloServer({
        typeDefs, resolvers
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app: app });

    app.use((req, res) => {
        res.send('Hello from express apollo server');
    });

    await connectDb();

    app.listen({ port: 4000 }, () =>
        console.log('Now browse to http://localhost:4000' + apolloServer.graphqlPath)
    );
}
startServer(); 