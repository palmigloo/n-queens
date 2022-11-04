const Benchmark = require('benchmark');

const suite = new Benchmark.Suite('My performance test');

//solution from hack reactor
// hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {

//   var size = this.get('n');
//   var count = 0;
//   var rowIdx = 0;
//   var colIdx = majorDiagonalColumnIndexAtFirstRow;

//   for ( ; rowIdx < size && colIdx < size; rowIdx++, colIdx++ ) {
//     if ( colIdx >= 0 ) {
//       var row = this.get(rowIdx);
//       count += row[colIdx];
//     }
//   }

//   return count > 1;
//       },

//ours
//hasMajorDiagonalConflictAt: function (majorDiagonalColumnIndexAtFirstRow) {
//   var row = 0;
//   var sumRight = 0;
//   var sumLeft = 0;
//   var col = majorDiagonalColumnIndexAtFirstRow;
//   var allRows = this.rows();
//   while(this._isInBounds(row, col)){
//     sumRight += allRows[row][col];
//     sumLeft += allRows[col][row];
//     col += 1;
//     row += 1;
//   }
//   return sumLeft > 1 || sumRight > 1;
// },

//example test suite

matrix = [
  [0, 0, 0, 0],
  [1, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 1, 0]
];


var board = new Board(matrix);



suite
  .add('Our solution', () => {
    const processed = board.hasMajorDiagonalConflictAt(3);
  })
  .add('Their solution', () => {
    const processed = board.hasMajorDiagonalConflictAt2(3);
  })
  .on('complete', event => {
    const suite = event.currentTarget;
    const fastestOption = suite.filter('fastest').map('name');
    console.log(`The fastest option is ${fastestOption}`)
  })
  .run();


// .add('Array.prototype.some', () => {
//     const processed = values.some(value => value > 990000);
//   })



// const values = [];

// for (let i = 0; i < 1000000; i++) {
//   values.push(i);
// }

// function some(list, predicate) {
//   if (list == null) {
//     return false;
//   }

//   for (let i = 0; i < list.length; i++) {
//     if (predicate(list[i], i)) {
//       return true;
//     }
//   }

//   return false;
// }

// suite
//   .add('Array.prototype.some', () => {
//     const processed = values.some(value => value > 990000);
//   })
//   .add('for loop', () => {
//     const processed = some(values, value => value > 990000);
//   })
//   .on('cycle', event => {
//     const benchmark = event.target;

//     console.log(benchmark.toString());
//   })
//   .on('complete', event => {
//     const suite = event.currentTarget;
//     const fastestOption = suite.filter('fastest').map('name');

//     console.log(`The fastest option is ${fastestOption}`);
//   })
//   .run();


//result
//   Array.prototype.some x 111 ops/sec ±1.33% (78 runs sampled)
// for loop x 1,687 ops/sec ±2.01% (91 runs sampled)
// The fastest option is for loop