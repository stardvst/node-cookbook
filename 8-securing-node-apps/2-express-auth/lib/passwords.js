const bcrypt = require('bcryptjs');

function hashPassword(plainText) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plainText, salt);
}

function comparePassword(plainText, hashed) {
  return bcrypt.compareSync(plainText, hashed);
}

module.exports = {
  hashPassword,
  comparePassword,
};
