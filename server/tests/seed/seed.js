const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const todos = [
    {
        _id: new ObjectID(), 
        text: 'Todo test 01',
        _creator: userOneId
    },
    {
        _id: new ObjectID(), 
        text: 'Todo test 02',
        _creator: userTwoId
    },
    {
        _id: new ObjectID(), 
        text: 'Todo test 03',
        completed: true,
        completedAt: 444,
        _creator: userOneId
    }
];

const users = [
    {
        '_id': userOneId,
        'name': 'Eulen',
        'email': 'eulen@gmail.com',
        'password': 'userOnePass',
        'tokens': [{
            access: 'auth',
            token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
        }]

    },
    {
        '_id': userTwoId,
        'name': 'Joseph',
        'email': 'joe@mail.com',
        'password': 'userTwoPass',
        'tokens': [{
            access: 'auth',
            token: jwt.sign({_id: userTwoId, access: 'auth'}, 'abc123').toString()
        }]
    }
];

const populateTodos = (done) => {
    Todo.find().remove().then(() => {
        Todo.insertMany(todos).then(()=> done());
    });
}

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
}

module.exports = {todos, populateTodos, users, populateUsers}