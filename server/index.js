const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();

const db = monk('localhost/database')
const posts = db.get('tweets')

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.json({
        message: 'hello world this is a test',
    });
})

app.get('/tweets', (req, res) => {
    posts.find()
    .then(posts => {res.json(posts)})
})

function isValid(tweet) {
    return tweet.name && tweet.name.toString().trim() !== ''
    && tweet.content && tweet.content.toString().trim() !== '';
}

app.post('/tweets', (req, res) => {
    if(isValid(req.body)) {

        const tweet = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created: new Date()
        }

        posts
        .insert(tweet)
        .then(createdTweet =>
            res.json(createdTweet));
        // console.log(tweet);

    } else {
        res.status(422)
        res.json({
            message: "ERROR!"
        })
    }
    
})


app.listen(8080, () => {
    console.log('LISTENING ON LOCALHOST:8080')
})