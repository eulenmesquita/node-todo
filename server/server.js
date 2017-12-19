const {ObjectID} = require('mongodb');

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
});

app.get('/todos', (req, res)=> {
    Todo.find().then((todos) => {
        res.send(
            {todos}
        );
    }, (e) => {
        console.log('Error fetching Todo list', e);
        res
            .status(400)
            .send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    
    if (!ObjectID.isValid(id)) {
<<<<<<< HEAD
        return res.status(404).send({});
=======
<<<<<<< HEAD
        return res.status(404).send({});
=======
        res.status(404).send({});
>>>>>>> 5022d1a254cf29862271c91ea1be44b428060058
>>>>>>> e641db92917afd7b22ef4d0fb8ef4b00ba54bbdf
    }

    Todo.findById(id)
        .then((todo) => {
            if (todo) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> e641db92917afd7b22ef4d0fb8ef4b00ba54bbdf
                return res.status(200).send({todo});
            }
            res.status(404).send({});
        })
        .catch((e) => {
            res.status(400).send({});
        })
    }); 
<<<<<<< HEAD
=======
=======
                res.status(200).send({todo});
            } else {
                res.status(404).send({});
            }
        }, (e) => {
            res.status(400).send({});
        });
});
>>>>>>> 5022d1a254cf29862271c91ea1be44b428060058
>>>>>>> e641db92917afd7b22ef4d0fb8ef4b00ba54bbdf

app.listen(3000, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};