const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
    it('should create a new Todo', (done) => {
        var text = 'Todo test 4';
        request(app)
        .post('/todos')
        .set('x-auth', users[0].tokens[0].token)
        .send({text})
        .expect(201)
        .expect((res) => {
            expect(res.body.text)
                .toBe(text);
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.find({text: text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        });
    });

    it('should not create Todo having invalid data', (done) => {
        request(app)
        .post('/todos')
        .set('x-auth', users[0].tokens[0].token)
        .send({text:''})
        .expect(400)
        .end((err, res) => {

            if (err) {
                done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(3);
                done();
            }).catch((e) => done(e));
        });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
});


describe('GET /todos/:id', () => {
    it('should return a Todo doc', (done) => {
        var hexId = todos[0]._id.toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .expect(200)
            .set('x-auth', users[0].tokens[0].token)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should not return Todo doc created by other user', (done) => {
        var hexId = todos[1]._id.toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it('should return 404 if Todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it('should return 404 when ID is invalid', (done) => {
        request(app)
            .get('/todos/123')
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a Todo created by a user', (done) => {
        var hexId = todos[1]._id.toHexString();
        request(app)
        .delete(`/todos/${hexId}`)
        .set('x-auth', users[1].tokens[0].token)
        .expect(200)
        .expect((res) =>{
            expect(res.body.todo._id).toBe(hexId)
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            Todo.findById(hexId).then((todo) => {
                expect(todo).toNotExist();
                done();
            })
            .catch((e) => done(e));
        });
    });

    it('should not remove a Todo created by another user', (done) => {
        var hexId = todos[1]._id.toHexString();
        request(app)
        .delete(`/todos/${hexId}`)
        .set('x-auth', users[0].tokens[0].token)
        .expect(404)
        .end(done);
    });

    it('should return 404 if Todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
        .delete(`/todos/${hexId}`)
        .set('x-auth',users[0].tokens[0].token)
        .expect(404)
        .end(done);
    });

    it('should return 404 when ID is invalid', (done) => {
        request(app)
        .delete('/todos/123')
        .set('x-auth',users[0].tokens[0].token)
        .expect(404)
        .end(done);
    });

});

describe('PATCH /todos/:id', () => {
    it('should update the Todo to completed', (done) => {
        var id = todos[0]._id;

        var updatedTodo = {
            text: 'Update Todo to COMPELTED',
            completed: true
        };

        request(app)
        .patch(`/todos/${id}`)
        .send(updatedTodo)
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(updatedTodo.text);
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).toBeA('number');
        })
        .end(done); 
    });
   
    it('should not update a Todo created by another user', (done) => {
        var id = todos[0]._id;

        var updatedTodo = {
            text: 'Update Todo to COMPELTED',
            completed: true
        };

        request(app)
        .patch(`/todos/${id}`)
        .send(updatedTodo)
        .set('x-auth', users[1].tokens[0].token)
        .expect(404)
        .end(done); 
    });
   

    it('should clear completedAt when the Todo is not completed', (done) => {
        var id = todos[1]._id;
        var updatedTodo = {
            text: 'Update Todo to NOT COMPLETED',
            completed: false
        };

        request(app)
        .patch(`/todos/${id}`)
        .set('x-auth', users[1].tokens[0].token)
        .send(updatedTodo)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(updatedTodo.text);
            expect(res.body.todo.completedAt).toNotExist();
        })
        .end(done);
    });
});

describe('GET /users/me', () => {
    it('should return a user if authenticated', (done) => {
        request(app)
        .get('/users/me')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => {
            expect(res.body._id).toBe(users[0]._id.toHexString());
            expect(res.body.email).toBe(users[0].email);
        })
        .end(done);
    });
    it('should return a 401 if not authenticated', (done) => {
        request(app)
        .get('/users/me')
        .expect(401)
        .expect((res) => {
            expect(res.body).toEqual({});
        })
        .end(done);
    });
});

describe('POST /users', () => {
    it('should create a user', (done) => {
        var email = 'user@email.com';
        var password = 'pass123';
        var name = 'Test User 01';
        
        request(app)
        .post('/users')
        .send({
            name, email, password
        })
        .expect(200)
        .expect((res => {
            expect(res.headers['x-auth']).toExist();
            expect(res.body._id).toExist();
            expect(res.body.email).toBe(email);
        }))
        .end(done);
    });

    it('should return validation errors if request is invalid', (done) => {
        var name = 'Amy Duingud'
        var email = "fake_email.com";
        var password = "abc";

        request(app)
        .post('/users')
        .send(
            {name, email, password}
        )
        .expect(400)
        .expect((res) => {
            expect(res.body.name).toBe('ValidationError');
        })
        .end(done);
    });
    
    it('not create a user if email already in use', (done) => {
        var name = 'John Johnson'
        var email = users[0].email;
        var password = "abc_cba";

        request(app)
        .post('/users')
        .send({
            name, email, password
        })
        .expect(400)
        .expect((res) => {
            expect(res.body.code).toBe(11000);
        })
        .end(done);
    });
});

describe('POST /users/login',() => {
    it('should login user and return auth token', (done) => {
        request(app)
        .post('/users/login')
        .send({
            email: users[1].email,
            password: users[1].password
        })
        .expect(200)
        .expect((res) => {
            expect(res.headers['x-auth']).toExist();
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            User.findById(users[1]._id).then((user) => {
                expect(user.tokens[1]).toInclude({
                    access: 'auth',
                    token: res.headers['x-auth']
                });
                done();
            })
            .catch((e) => done(e));
        });
    });

    it('should reject invalid login', (done) => {
        request(app)
        .post('/users/login')
        .send({
            email: users[1].email,
            password: 'wrong'
        })
        .expect(400)
        .expect((res) => {
            expect(res.headers['x-auth']).toNotExist();
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            User.findById(users[1]._id).then((user) => {
                expect(user.tokens.length).toBe(1);
                done();
            })
            .catch((e) => done(e));
        });
    });
});

