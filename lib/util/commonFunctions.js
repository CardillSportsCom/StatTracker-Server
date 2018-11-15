if(!Array.prototype.unique){
    Array.prototype.unique = function(){
        return this.filter(function (value, index, self) { 
            return self.indexOf(value) === index;
        });
    };
}

if(!Array.prototype.sum){
    Array.prototype.sum = function(prop){
        var total = 0;
        for ( var i = 0, _len = this.length; i < _len; i++ ) {
            total += this[i][prop];
        }
        return total;
    }
}


// module.exports = {
//     unique: unique,
//     sum: sum
// };
// module.exports=function(){
//     Array.prototype.sum = function(prop){
//         var total = 0;
//         for ( var i = 0, _len = this.length; i < _len; i++ ) {
//             total += this[i][prop];
//         }
//         return total;
//     }

//     Array.prototype.unique = function(){
//         return this.filter(function (value, index, self) { 
//             return self.indexOf(value) === index;
//           });
//     }
// }