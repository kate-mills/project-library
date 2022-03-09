function getId() {
  return Array.from({ length: 20 }).reduce(
    (acc) => acc + Math.round(Math.random() * 10),
    ''
  )
}

function BookHandler() {
  this.db = []

  this.createBook = function(title) {
    let book = { title, _id: getId() }
    this.db.unshift({ comments: [], ...book, commentcount: 0, __v: 0 })
    return { ...book }
  }

  this.getBookById = function(id) {
    let book = this.db.find((item) => {
      return item._id === id
    })
    return !book ? 'no book exists' : book
  }
}
module.exports = BookHandler
