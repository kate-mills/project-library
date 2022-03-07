function BookHandler() {
  this.db = {}

  this.createBook = function(title){
    let id = Array.from({length: 10}
    ).reduce((acc)=>acc+Math.round(Math.random()*10),"");

    this.db[id] = { _id: id, title };
    return this.db[id];
  };

}
module.exports = BookHandler;
