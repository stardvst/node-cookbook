const benchmark = require('benchmark');
const slow = require('./slow');
const fast = require('./fast');

const suite = new benchmark.Suite();

const maxNumber = 100;

suite.add('slow', function() {
  slow(maxNumber);
});

suite.add('fast', function() {
  fast(maxNumber);
});

suite.on('complete', printResults);
suite.run();

function printResults() {
  this.forEach(bench => {
    console.log(String(bench));
  });
  console.log("Fastest implementation is:", this.filter('fastest')[0].name);
}
