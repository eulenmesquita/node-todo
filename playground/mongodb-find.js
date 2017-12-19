var {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if(error) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('connected to MongoDB server');

    db.collection('Users')
    .find({name: 'Eulen'})
    .toArray()
    .then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch documents', err);
    });


    db.collection('Users')
    .find({name:'Eulen'})
    .count()
    .then((count) => {
        console.log(`Total of documents located: ${count}`);
    }, (err) => {
        console.log('Unable to fetch documents', err);
    });
    db.close();
});