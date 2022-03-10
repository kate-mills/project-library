const getId = () => {
  return Array.from({ length: 20 }).reduce(
    (acc) => acc + Math.round(Math.random() * 10),
    ''
  )
}

function BookHandler() {
  this.db = []

  this.createBook = function (title) {
    let book = { _id: getId(), title }
    this.db.unshift({ comments: [], ...book, commentcount: 0, __v: 0 })
    return { ...book }
  }

  this.getBookById = function (id) {
    let book = this.db.find((item) => {
      return item._id === id
    })
    return !book ? 'no book exists' : book
  }

  this.updateBookWithAComment = function (id, comment) {
    let updateCount = 0
    this.db.map((book) => {
      if (book._id === id) {
        updateCount++
        book.comments.push(comment)
        book.commentcount++
        book.__v++
        return book
      }
      return book
    })

    return (updateCount < 1
      ? 'no book exists' : this.db.find(book => book._id === id)
    )
  }

  this.deleteBookById = function(id){
    let initBooks  = [...this.db]

    let books = [...this.db].filter(book => {
      return book._id !== id
    })

    if (books.length === initBooks.length){
      return 'no book exists'
    }

    this.db = books

    return 'delete successful'
  }

  this.deleteAllBooks = function(){
    this.db = [];
    return 'complete delete successful'
  }
}
module.exports = BookHandler
