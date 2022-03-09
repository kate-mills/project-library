'use strict'

const BookHandler = require('../controllers/bookHandler.js')

module.exports = function (app) {
  let bookHandler = new BookHandler()

  app
    .route('/api/books')

    .get(function (req, res) {
      return res.send(bookHandler.db)
    })

    .post(function (req, res) {
      let title = req.body.title
      return !title
        ? res.send('missing required field title')
        : res.json(bookHandler.createBook(title))
    })

    .delete(function (req, res) {
      //if successful response will be 'complete delete successful'
    })

  app
    .route('/api/books/:id')
    .get(function (req, res) {
      let bookid = req.params.id
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })

    .post(function (req, res) {
      let bookid = req.params.id
      let comment = req.body.comment
      //json res format same as .get
    })

    .delete(function (req, res) {
      let bookid = req.params.id
      //if successful response will be 'delete successful'
    })
}
