const { hashPassword } = require('../lib/passwords');

// Simple in-memory user store for the cookbook example.
// In real apps, store hashed passwords in a database and manage users there.

const users = {
  admin: {
    username: 'admin',
    // default password is 'password' — hashed at startup for the example
    passwordHash: hashPassword('password'),
  },
};

module.exports = users;
