/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const BookHandler = require('../controllers/bookHandler.js');

module.exports = function (app) {
  let bookHandler = new BookHandler();

  app.route('/api/books')
    .get(function (req, res){
      return res.json([{}])

      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(function (req, res){
      let title = req.body.title;
      if(!title){
        return res.json('missing required field title')
      }

      console.log('calling function')
      const book = bookHandler.createBook(title)
      return res.json(book)
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
