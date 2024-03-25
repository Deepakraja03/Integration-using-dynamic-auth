const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {createMongoDBConnection, createAuthMiddleware} = require('dynamic-auth');

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000 || 5000;

createMongoDBConnection(process.env.MONGODBURI,port,app);

const User = require('./models/user');

const userDataFields = ['email'];

app.use('/auth', createAuthMiddleware({ jwtSecret: process.env.JWT_SECRET, UserModel: User, userDataFields }));