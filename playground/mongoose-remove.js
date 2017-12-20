const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((res) => {
//     console.log(res);
// });

// Todo.findOneAndRemove({_id:'5a39df2f81e66306af4c5081'}).then((doc) => {
//     console.log(doc)
// });
Todo.findByIdAndRemove('5a39df5581e66306af4c5082').then((doc) => {
    console.log(doc);
});
