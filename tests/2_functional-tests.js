const chaiHttp = require('chai-http')
const chai = require('chai')
const assert = chai.assert
const server = require('../server')

chai.use(chaiHttp)

suite('Functional Tests', function () {
  suite('Routing tests', function () {
    const _ids = []

    suite('POST /api/books with title => create book object/expect book object',
      function () {

        // #1
        test(`Test POST /api/books with no title given`, function (done) {
          chai.request(server).post(`/api/books`).send({})
            .end(function (err, res) {
              assert.equal(res.status, 200)
              assert.equal(res.text, 'missing required field title')
              done()
            })
        })
        // #2
        test(`POST /api/books with title`, function (done) {
          chai.request(server).post(`/api/books`).send({title:'Atomic Habits'})
            .end(function (err, res) {
              _ids.unshift(res.body._id)
              assert.equal(res.status, 200)
              assert.equal(res.body.title, 'Atomic Habits')
              assert.equal(res.body._id, _ids[0])
              done()
            })
        })
      }
    )

    suite('GET /api/books => array of books', function () {
      // #3
      test('Test GET /api/books', function (done) {
        chai.request(server).get(`/api/books`)
          .end(function (err, res) {
            assert.equal(res.status, 200)
            assert.equal(res.body.length, 1)
            assert.equal(res.body[0].title, 'Atomic Habits')
            assert.equal(res.body[0]._id, _ids[0])
            assert.equal(res.body[0].commentcount, 0);
            assert.equal(res.body[0].comments.length, 0);
            done()
          })
      })
    })

    suite('GET /api/books/[id] => book object with [id]', function () {

     // #3
     test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server).get(`/api/books/${_ids[0]}`)
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.comments.length, 0);
            assert.equal(res.body.title, 'Atomic Habits')
            assert.equal(res.body._id, _ids[0])
            assert.equal(res.body.commentcount, 0);
            assert.equal(res.body.__v, 0);
            done()
          })
      });
      
      // #4
      test('Test GET /api/books/[id] with id not in db', function (done) {
        chai.request(server).get(`/api/books/123`)
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'no book exists');
            done()
          })
      })
    })

    suite(
      'POST /api/books/[id] => add comment/expect book object with id',
      function () {
        test('Test POST /api/books/[id] with comment', function (done) {
          //done()
        })

        test('Test POST /api/books/[id] without comment field', function (done) {
          //done()
        })

        test('Test POST /api/books/[id] with comment, id not in db', function (done) {
          //done()
        })
      }
    )

    suite('DELETE /api/books/[id] => delete book object id', function () {
      test('Test DELETE /api/books/[id] with valid id in db', function (done) {
        //done()
      })

      test('Test DELETE /api/books/[id] with  id not in db', function (done) {
        //done()
      })
    })

  })
})
