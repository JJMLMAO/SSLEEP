const pool = require('../db');
const router = require('express').Router();
const authorization = require('../middleware/authorization');
const jwt = require('jsonwebtoken');

// profile route
// getting data for student profile
router.get('/getStudentData', async (req, res) => {
  try {
    const jwtToken = req.header('token');
    await pool.query(
      `SELECT student_name, student_matric, student_email FROM students where student_matric = $1`,
      [jwt.decode(jwtToken).student.student_matric],
      (error, result) => {
        if (error) throw error;
        if (result.rowCount > 0) {
          res.status(200).json(result.rows);
        }
      },
    );
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
