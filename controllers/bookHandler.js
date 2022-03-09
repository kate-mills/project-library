function getId() {
  return Array.from({ length: 10 }).reduce(
    (acc) => acc + Math.round(Math.random() * 10),
    ''
  )
}

function BookHandler() {
  this.db = []

  this.createBook = function (title) {
    let book = { title, _id: getId() }
    this.db.unshift({ __v: 0, comments: [], commentcount: 0, ...book })

    return { ...book }
  }

}
module.exports = BookHandler
