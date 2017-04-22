QUnit.module("nextVersion", function() {
  QUnit.module("with invalid input", function() {
    QUnit.test("fails with text instead of numbers", function(assert) {
      var result = nextVersion("test.1.0.incorrect.2");
      assert.equal(result, "", "invalid response returns empty string");
    });
    QUnit.test("fails with null value passed", function(assert) {
      var result = nextVersion(null);
      assert.equal(result, "", "invalid response returns empty string");
    });
    QUnit.test("fails with undefined value passed", function(assert) {
      var result = nextVersion(undefined);
      assert.equal(result, "", "invalid response returns empty string");
    });
    QUnit.test("fails with empty object value passed", function(assert) {
      var result = nextVersion({});
      assert.equal(result, "", "invalid response returns empty string");
    });
    QUnit.test("fails with empty string value passed", function(assert) {
      var result = nextVersion("");
      assert.equal(result, "", "invalid response returns empty string");
    });
  });

  QUnit.module("with valid input", function() {
    QUnit.test("increments without overflow", function(assert) {
      var result = nextVersion("1.1.1");
      assert.equal(result, "1.1.2", "increments last number by 1");
    });
    QUnit.test("increments with overflow for 10", function(assert) {
      var result = nextVersion("1.1.9");
      assert.equal(result, "1.2.0", "increments last and second number by 1");
    });
    // Test assumes that if we have a number above 10, we miscalculated previous
    // versions, so correct it with the overflow.
    QUnit.test("increments with overflow for 20", function(assert) {
      var result = nextVersion("1.1.19");
      assert.equal(result, "1.3.0", "increments last number by 1, second by 2");
    });
    QUnit.test("cascades up through last number to first", function(assert) {
      var result = nextVersion("1.9.9");
      assert.equal(result, "2.0.0", "increments all numbers by 1");
    });
    QUnit.test("cascades up through last number to first with large first", function(assert) {
      var result = nextVersion("101.9.9");
      assert.equal(result, "102.0.0", "increments all numbers by 1, preserving large first number");
    });
  });

  // Input from code challenge document
  QUnit.module("input from code challenge", function() {
    QUnit.test("1.2.3", function(assert) {
      var result = nextVersion("1.2.3");
      assert.equal(result, "1.2.4", "matches expected outcome1 1.2.4");
    });
    QUnit.test("0.9.9", function(assert) {
      var result = nextVersion("0.9.9");
      assert.equal(result, "1.0.0", "matches expected outcome 1.0.0");
    });
    QUnit.test("1", function(assert) {
      var result = nextVersion("1");
      assert.equal(result, "2", "matches expected outcome 2");
    });
    QUnit.test("1.2.3.4.5.6.7.8", function(assert) {
      var result = nextVersion("1.2.3.4.5.6.7.8");
      assert.equal(result, "1.2.3.4.5.6.7.9", "matches expected outcome 1.2.3.4.5.6.7.9");
    });
    QUnit.test("9.9", function(assert) {
      var result = nextVersion("9.9");
      assert.equal(result, "10.0", "matches expected outcome 10.0");
    });
  });
});
