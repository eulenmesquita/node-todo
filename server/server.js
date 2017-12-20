const {ObjectID} = require('mongodb');

const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then( (doc)=> {
        res.status(201).send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res)=> {
    Todo.find().then((todos) => {
        res.send(
            {todos}
        );
    }, (e) => {
        console.log('Error fetching Todo list', e);
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({});
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.status(200).send({todo});
    })
    .catch((e) => {
        res.status(400).send({});
    });
}); 

app.listen(port, () => {
    console.log(`Started up at port: ${port}`);
});

module.exports = {app};