const test = require('node:test');
const assert = require('node:assert/strict');

const { add, subtract, multiply } = require('./calculator');

test('addition: 2 + 3 = 5', () => {
  assert.equal(add(2, 3), 5);
});

test('subtraction: 5 - 3 = 2', () => {
  assert.equal(subtract(5, 3), 2);
});

test('multiplication: 4 * 3 = 12', () => {
  assert.equal(multiply(4, 3), 12);
});

test('addition with negative numbers', () => {
  assert.equal(add(-2, -3), -4);
});
