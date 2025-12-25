const mongoose = require('mongoose');
const URI = 'mongodb://127.0.0.1:27017/customers';

// start docker with:
// docker run --publish 27017:27017 --name node-mongo --detach mongo:latest

// connect inside main using async/await

const customerSchema = new mongoose.Schema({
  forename: String,
  surname: String
});

const Customer = mongoose.model('Customer', customerSchema);

async function main() {
  try {
    await mongoose.connect(URI);
    console.log('DB connected');

    // Create a new customer
    const customer = new Customer({
      forename: 'John',
      surname: 'Doe'
    });

    await customer.save();
    console.log('New Customer:', customer);

    // Retrieve all customers
    const customers = await Customer.find();
    if (customers.length === 0) {
      console.log('No customers found.');
    } else {
      customers.forEach(cust => console.log(cust));
    }
  } catch(err) {
    console.error('DB error', err);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

main().catch(err => {
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
});
