const pool = require('../db');
const router = require('express').Router(); // able to breakdown routes and combine the routes together again
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

//signup route

router.post('/signups', validInfo, async (req, res) => {
  try {
    // 1. destructure the req.body (getting name, email, password etc)
    const {student_email, student_password, student_matric, student_name} =
      req.body;

    // 2. check if user exist (if user exist)
    const student = await pool.query(
      'SELECT * FROM students WHERE student_email = $1',
      [student_email],
    );
    if (student.rows.length !== 0) {
      return res.status(401).send('Student already exist.');
    }

    // 3. Bcrypt the user password (hased inside database)
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(student_password, salt);

    // 4. Insert new user inside database
    //const newStudent = await pool.query(
    await pool.query(
      'INSERT INTO students (student_email, student_password, student_matric, student_name) VALUES($1, $2, $3, $4) RETURNING *',
      [student_email, bcryptPassword, student_matric, student_name],
      (error, result) => {
        if (error) throw error;
        if (result.rowCount > 0) {
          res.status(200).json(result.rows[0]);
        }
      },
    );

    // 5. Generating jwt token

    // const token = jwtGenerator(newStudent.rows[0].student_id);
    //res.json({token});
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// Login Route

router.post('/logins', validInfo, async (req, res) => {
  try {
    // 1. destructure req.body

    const {student_email, student_password} = req.body;

    // 2. check if user exist (if not then we throw error)
    console.log('await1');
    const student = await pool.query(
      'SELECT * FROM students WHERE student_email = $1',
      [student_email],
    );

    if (student.rows.length === 0) {
      return res.status(401).json('Password or email is invalid.');
    }

    // 3. check if incoming password is the same with database password
    console.log('await2');

    const validPassword = await bcrypt.compare(
      student_password,
      student.rows[0].student_password,
    );

    if (!validPassword) {
      return res.status(401).json('Password or email is incorrect');
    }

    // 4. give them jwt tokens

    const token = jwtGenerator({
      student_id: student.rows[0].student_id,
      student_matric: student.rows[0].student_matric,
    });
    res.json({
      message: 'User has successfully logged in!',
      token: token,
      email: student.rows[0].student_email,
      matric: student.rows[0].student_matric,
      name: student.rows[0].student_name,
    });
    console.log(token);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server error');
  }
});

router.get('/is-verify', authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server error');
  }
});

module.exports = router;
