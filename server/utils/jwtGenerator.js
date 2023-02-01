const jwt = require('jsonwebtoken');
require('dotenv').config(); // allow access to all environment variables

function jwtGenerator(student_id) {
  const payload = {
    student: student_id,
  };

  return jwt.sign(payload, process.env.jwtSecret, {expiresIn: '1hr'});
}

module.exports = jwtGenerator;
