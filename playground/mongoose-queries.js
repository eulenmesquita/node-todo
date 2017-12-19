const {ObjectID} = require('mongodb');

const {mongoose}  = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5a3997a05b63d0102b5f2413';

// Todo.find({
//     _id: id
// }).then((todos)=>{
//     console.log('todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo)=>{
//     console.log('todo', todo);
// });

// Todo.findById(id).then((todo)=>{
//     console.log('todo by id', todo);
// });

var userId = '5a3905aa77114e2817e24f66';

if (!ObjectID.isValid(userId)) {
    return console.log('the ID was invalid');
}

User.findById(userId).then((user) => {
    if (!user) {
        return console.log('ID was not found');
    }
    console.log(JSON.stringify(user,undefined,2));
}, (e) => {
    console.log('Something went wrong', e);
});