function unique(){
  return this.filter(function (value, index, self) { 
    return self.indexOf(value) === index;
  });
};
function sum(prop){
    var total = 0;
    for ( var i = 0, _len = this.length; i < _len; i++ ) {
        total += this[i][prop];
    }
    return total;
};

module.exports = {
    unique: unique,
    sum: sum
};