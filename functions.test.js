const functions = require('./functions');


test('Tries to get random from a set of 0', () => {
  expect(functions.getRandomPin(0)).toBe(0);
});
