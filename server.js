const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const post = require('./routes/api/post');

const app = express();

app.get('/', (req, res) => res.send('Hello'));
//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
    .connect(db, {
        useNewUrlParser: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))


//Use routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/post', post)


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on ${port}`));