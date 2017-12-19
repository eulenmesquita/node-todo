const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if(error) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('connected to MongoDB server');

    // db.collection('todo').insertOne(
    //     {
    //         text: 'Go to store to buy something',
    //         completed: false
    //     }, (err, result) => {
    //     if (err) {
    //         console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection('Users').insertOne({
        name: 'Eulen',
        age: 37,
        location: 'Brisbane'
    }, (err, result) => {
        if (err) {
            console.log('Unable to insert this user', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });
    db.close();

});