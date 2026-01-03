function sumOfSquares(maxNumber) {
  let i = 0;
  let sum = 0;
  while(i <= maxNumber) {
    sum += i * i;
    i++;
  }
  return sum;
}

module.exports = sumOfSquares;
