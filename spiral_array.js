var createSpiral = function(size){
  // For creating space for the spiralArray.
  function generate2DArray (size){
    var empty2DArray = [];
    for(var i = 0; i < size; i++){
      empty2DArray[i] = [];
    }
    return empty2DArray;
  }

  // Check that the passed coordinates are within the size boundaries of the Array
  function withinBounds(size, testX, testY){
    return ((testX < size && testX >= 0) && (testY < size && testY >= 0));
  }

// Would use default values, but as they're ES6 and it's almost but not quite fully supported
// I'll manually set defaults.
// Recursive function for running a "spiral" edge line until you must change direction.
  function goTilEdge(array, x, y, cursor, xDir, yDir){
    x = x? x : 0;
    y = y? y : 0;
    cursor = cursor? cursor : 1;
    size = array.length;

    array[x][y] = cursor++;

    // Check if the next space in the current direction is free and in bounds.
    // If not, set a new (clockwise) direction. y+ "->", x+ "v", y- "<-", x- "^"
    if(!(withinBounds(size, x+xDir, y+yDir) && array[x+xDir][y+yDir] === undefined)){
      if(yDir === 1){
        yDir = 0;
        xDir = 1;
      } else if(xDir === 1){
        yDir = -1;
        xDir = 0;
      } else if(yDir === -1){
        yDir = 0;
        xDir = -1;
      } else {
        yDir = 1;
        xDir = 0;
      }
    }
    // Exit condition: Return array when we have reached the highest number the
    // sequence will reach within the spiral of given size.
    // Otherwise, keep going in the same direction.
    if(cursor <= size * size){
      array = goTilEdge(array, x+xDir, y+yDir, cursor, xDir, yDir);
    }
    return array;
  }

// Main function that runs when this code is called.
  function makeASpiralArray(size){
    var result = [];
    try{
      if(size >= 1){
        var empty2DArray = generate2DArray(size);
        var spiralArray = goTilEdge(empty2DArray);
        result = spiralArray;
      }
    } catch(err){
      spiralLogging.error("Spiral Array - Failure in creating spiral array - " + err.message);
      result = [];
    }
    return result;
  }
  // Call to begin.
  return makeASpiralArray(size);
};

// For the purpose of making sure I, as a human, can see the results nicely.
function printArray(array){
  for(var i=0; i < array.length; i++){
    console.log(array[i]);
  }
}

// Unnecessary for this challenge, but used for checking tests & if logging
// was treated such that there is a service attached, i.e. HoneyBadger, serves
// as a potential proxy.
var spiralLogging = {
  warning : function(input){
    console.log("Mock JE Logging - Warning: " + input);
  },
  error : function(input){
    console.log("Mock JE Logging - Error: " + input);
  }
};
