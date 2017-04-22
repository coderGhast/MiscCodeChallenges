QUnit.module("createSpiral", function() {
  QUnit.module("with invalid input", function() {
    QUnit.test("fails with text instead of number", function(assert) {
      var result = createSpiral("test");
      assert.ok(result.constructor === Array, "returned an array");
      assert.equal(result.length, 0, "empty array for value < 1");
    });
    QUnit.test("fails with null value passed", function(assert) {
      var result = createSpiral(null);
      assert.ok(result.constructor === Array, "returned an array");
      assert.equal(result.length, 0, "empty array for value < 1");
    });
    QUnit.test("fails with undefined value passed", function(assert) {
      var result = createSpiral(undefined);
      assert.ok(result.constructor === Array, "returned an array");
      assert.equal(result.length, 0, "empty array for value < 1");
    });
    QUnit.test("fails with empty object value passed", function(assert) {
      var result = createSpiral({});
      assert.ok(result.constructor === Array, "returned an array");
      assert.equal(result.length, 0, "empty array for value < 1");
    });
    QUnit.test("fails with empty string value passed", function(assert) {
      var result = createSpiral("");
      assert.ok(result.constructor === Array, "returned an array");
      assert.equal(result.length, 0, "empty array for value < 1");
    });
  });

// Valid input from code challenge
  QUnit.module("with valid input", function() {
    QUnit.test("returns empty array with value < 1", function(assert) {
      var result = createSpiral(-5);
      assert.ok(result.constructor === Array, "returned an array");
      assert.equal(result.length, 0, "empty array for value < 1 (-5)");
    });
    QUnit.test("returns empty array with value 0", function(assert) {
      var result = createSpiral(0);
      assert.ok(result.constructor === Array, "returned an array");
      assert.equal(result.length, 0, "empty array for value < 1");
    });
    QUnit.test("returns single element array for value of 1", function(assert) {
      var result = createSpiral(1);
      assert.equal(result[0], 1, "value in position 0 is: " + result[0] + "expected: 1");
    });
    QUnit.test("creates expected spiral structured array from 3", function(assert) {
      var result = createSpiral(3);
      var expected = [
        [1,2,3],
        [8,9,4],
        [7,6,5]];
      for(var i = 0; i < expected.length; i ++){
        for(var j = 0; j < expected[i].length; j++){
          assert.equal(result[i][j], expected[i][j], "created: " + result[i][j] + " with expected: " + expected[i][j]);
        }
      }
    });
    QUnit.test("creates expected spiral structured array from 4", function(assert) {
      var result = createSpiral(4);
      var expected = [
        [1,2,3,4],
        [12,13,14,5],
        [11,16,15,6],
        [10,9,8,7]];
      for(var i = 0; i < expected.length; i ++){
        for(var j = 0; j < expected[i].length; j++){
          assert.equal(result[i][j], expected[i][j], "created: " + result[i][j] + " with expected: " + expected[i][j]);
        }
      }
    });
    QUnit.test("creates expected spiral structured array from 5", function(assert) {
      var result = createSpiral(5);
      var expected = [
        [1,2,3,4,5],
        [16,17,18,19,6],
        [15,24,25,20,7],
        [14,23,22,21,8],
        [13,12,11,10,9]];
      for(var i = 0; i < expected.length; i ++){
        for(var j = 0; j < expected[i].length; j++){
          assert.equal(result[i][j], expected[i][j], "created: " + result[i][j] + " with expected: " + expected[i][j]);
        }
      }
    });
  });
});
