const n = 10;

const fib = (n) => {
  let a = 0, b = 1, next = 1, i = 2;
  for(; i <= n; i++) {
    next = a + b;
    a = b;
    b = next;
  }
  console.log(`The ${n}th Fibonacci number is ${next}`);
};

fib(n);
console.log('...')
