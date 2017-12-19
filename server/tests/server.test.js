const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => {
    Todo.find().remove().then(() => {
        done();
    });
});

describe('POST /todos', () => {
    it('should create a new Todo', (done) => {
        var text = 'test Todo text';

        request(app)
        .post('/todos')
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

            Todo.find().then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        });
    });

    it('should not create Todo having invalid data', (done) => {
        request(app)
            .post('/todos')
            .send({text:''})
            .expect(400)
            .end((err, res) => {

                if (err) {
                    done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(0);
                    done();
                }).catch((e) => done(e));
            });
    });
})