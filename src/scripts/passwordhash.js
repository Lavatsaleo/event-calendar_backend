const bcrypt = require('bcrypt');

const password = 'admin123'; // Plain text password
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
  if (err) throw err;
  console.log(hash); // Store this hash in the database
});
