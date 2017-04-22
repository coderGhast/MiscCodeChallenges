var nextVersion = function(input){
  // Check that a passt part can be converted into a number to be worked with.
  // If not, log it and return empty String.
  function parseVersionPart(part){
    var result = part;
    result = Number(result);
    if(isNaN(result)){
      versionLogging.warning("Next Version: String provided contains NaN - " + part);
      result = "";
    }
    return result;
  }

  // Starting from the last number (last array element), checks if there are
  // values to be carried over and increment the next number along, and by how much.
  // The assumption is made that if the last number is even greater than 9, e.g.
  // somehow it is 21, the 1 will be kept while the 20 (2) will be carried to the next
  // number, as if retroactively correcting the version.
  function carryOverValues(versionParts){
    for(var i = versionParts.length - 1; i > 0; i--){
      if(versionParts[i] >= 10){
        var remainder = versionParts[i] % 10;
        var carryOver = (versionParts[i] - remainder) / 10;
        versionParts[i-1] += carryOver;
        versionParts[i] = remainder;
      }
    }
    return versionParts;
  }

  // To make Strings that look like "1.0.0" instead of "1.0.0."
  function getTrailingCharacter(index, length){
    return (index === length - 1)? "" : ".";
  }

  // Put the numbers back together as Strings separated by "." where necessary.
  function recombineVersion(versionParts){
    var result = "";
    for(var i= 0; i < versionParts.length; i++){
      result = result + versionParts[i].toString() + getTrailingCharacter(i, versionParts.length);
    }
    return result;
  }

  // Main function for running the nextVersion code.
  function determineNextVersion(input){
    var result = "";
    try{
      if(input.length > 0){
        var versionParts = input.split(".");
        for(var i = versionParts.length - 1; i >= 0; i--){
          versionParts[i] = parseVersionPart(versionParts[i]);
          // If we have an empty part, it failed parsing, so return
          if(versionParts[i] === ""){
            versionLogging.warning("Next Version: A part is empty at index: " + i + " of " + versionParts);
            return "";
          }
        }
        // Otherwise, increment last number
        versionParts[versionParts.length - 1]++;
        // Then check overflow
        versionParts = carryOverValues(versionParts);
        // Then combine to String output
        return recombineVersion(versionParts);
      }
    } catch(err){
      versionLogging.error("NextVersion: Failure in parsing version input - " + err.message + ", input: " + input);
      result = "";
    }
    return result;
  }
  // Call to begin.
  return determineNextVersion(input);
};

// Unnecessary for this challenge, but used for checking tests & if logging
// was treated such that there is a service attached, i.e. HoneyBadger, serves
// as a potential proxy.
var versionLogging = {
  warning : function(input){
    console.log("Mock JE Logging Warning: " + input);
  },
  error : function(input){
    console.log("Mock JE Logging Error: " + input);
  }
};
