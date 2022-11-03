// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {

  window.Board = Backbone.Model.extend({
    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
             _             _     _
         ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
        / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
        \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
        |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

     */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict

    //Input: rowIndex (number)
    //Output: boolean, if conflict in row
    //Constraints: none
    //Edge Cases: none

    //strategy: check if index is inbound, just return false
    //use helper function of board to get (rowIndex)(array) loop the row,
    //check for conflict (sum up array, compare sum > 1, return true, else false)

    //pseudocode
    // get the row array, currentRow
    // create variable, sum
    // iterate through currentRow
    //add current element to sum
    //return sum > 1

    hasRowConflictAt: function (rowIndex) {
      const currentRow = this.get(rowIndex);
      let sum = 0;
      for (let i = 0; i < currentRow.length; i++) {
        sum += currentRow[i];
      }
      return sum > 1;
    },


    // test if any rows on this board contain conflicts
    // input : none
    // output : boolean (true -> conflict, false -> no)
    // constraints: none
    // edge cases: check if it's a board, yes -> return false


    // strategy : reuse hasRowConflictAt , get all rows in the board(this), for each row run
    // hasRowConflictAt() on it. if any of them is true -> return true , at the end return false

    // pseudocode
    // var rows from board using rows()
      // loop through rows array
        // for each item run hasRowConflictAt(), var result = hasRowConflictAt()
        // if result is true, return true
    // return false;

    hasAnyRowConflicts: function () {
      const rows = this.rows();
      for (var i = 0; i < rows.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },


    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict

    // input : colIndex (number)
    // output : boolean (check specific column has conflict)
    // constrains : none
    // edge case : none

    // strategy : get array of the whole boards, for each array , sum up
    // the colIndex element, return sum > 1;

    // pseudocode:
    // var allRows = this.rows();
    // var sum = 0
    // loop allRows,
    // sum up each element at colIndex
    // return sum > 1;

    hasColConflictAt: function (colIndex) {
      var allRows = this.rows();
      var sum = 0

      for (var i = 0; i < allRows.length; i++) {
        sum += allRows[i][colIndex];
      }

      return sum > 1;

    },

    // test if any columns on this board contain conflicts

    // test if any cols on this board contain conflicts
    // input : none
    // output : boolean (true -> conflict, false -> no)
    // constraints: none
    // edge cases: check if it's a board, yes -> return false

    // strategy : if you pass get('n'), you'll get the size of board back, loop through n, check hasColFonclitasAt


    // pseudocode
    //loop through n
    //this.hasColFonflictAt(i)
    //return true
    //return false

    hasAnyColConflicts: function () {
      let n = this.get('n');
      console.log(n);
      for (let i = 0; i < n; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict

    // input : index of starting point of major diagonal
    // output : boolean (check if conflict exists on major diagonal , yes -> return true)
    // strategy : while loop to check if index are in bound , increment position (add 1 to row && col), sum each element, return sum > 1;

    // pseudocode
    // var row = 0;
    // var col = majorDiagonalColumnIndexAtFirstRow;
    // var allRows = this.rows();
    // while loop (!this.isInbound(allRows[row][col]))
      // sum += allRows[row][col];
      // increment row, col
    // return sum > 1 ;

    hasMajorDiagonalConflictAt: function (majorDiagonalColumnIndexAtFirstRow) {
      var row = 0;
      var col = majorDiagonalColumnIndexAtFirstRow;
      var allRows = this.rows();
      while(!this._isInBounds(row, col)){
        sum += allRows[row][col];
        col += 1;
        row += 1;
      }

      return sum > 1;
    },


    // test if any major diagonals on this board contain conflicts

    // input : none
    // output : boolean (true -> conflict, false -> no)
    // constraints: none
    // edge cases: check if it's a board, yes -> return false

    // strategy : use two different for loops to iterate and call hasMajorDiagonalConflictAt
    // on all of the position 0 columns and and entire row 1


    // pseudocode
    //loop through n
      //this.hasMajorDiagonalConflictAt(i)
      //return true
    // var rows from board using rows()
      // loop through rows array
        // for each item run hasMajorDiagonalConflictAt(), var result = hasMajorDiagonalConflictAt()
        // if result is true, return true
    //return false

    hasAnyMajorDiagonalConflicts: function () {
      let n = this.get('n');
      //console.log(n);
      let allRows = this.get();
      for (let i = 0; i < n; i++) {
        if(this.allRows[i].hasMajorDiagonalConflictAt(0)) {
          return true;
        }
      }

      let firstRow = this.get(0);
      for (var i = 0; i < firstRow.length; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function (minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };

}());
