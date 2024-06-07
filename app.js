const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
const PORT = process.env.PORT || 3000; 
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const commentRoute = require('./routes/comment');
const { connectdb } = require('./util/database');

connectdb();

app.use(express.json());
app.use(cookieParser());

// Auth route
app.use('/auth', authRoute);

// User route
app.use('/user', userRoute);

// Post route
app.use('/post', postRoute);

// Comment route
app.use('/comment', commentRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
