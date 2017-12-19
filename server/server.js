const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
app.use(bodyParser.json());
var port = process.env.PORT || 3000;

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then( (doc)=> {
        res.status(201).send(doc);
        console.log('new Todo saved');
    }, (e) => {
        res.status(400).send(e);
    })
})

app.listen(3000, () => {
    console.log(`Started on port ${port}`);
});