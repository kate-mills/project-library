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
      return res.send(bookHandler.getBookById(bookid));
    })

    .post(function (req, res) {
      let {body:{comment}, params:{id}} = req

      if(!id){
        return res.send('missing required field id');
      }
      if(!comment){
        return res.send('missing required field comment');
      }
      res.send(bookHandler.updateBookWithAComment(id, comment));
    })

    .delete(function (req, res) {
      let {id} = req.params

      if(!id){
        return res.send('missing required field id')
      }
      res.send(bookHandler.deleteBookById(id))
    })
}
