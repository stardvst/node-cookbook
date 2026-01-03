function sumOfSquares(maxNumber) {
  const array = Array.from(Array(maxNumber + 1).keys());
  return array
    .map(n => n ** 2)
    .reduce((a, b) => a + b, 0);
}

module.exports = sumOfSquares;
