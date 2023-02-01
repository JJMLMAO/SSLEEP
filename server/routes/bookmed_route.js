const pool = require('../db');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

// request booking
router.post('/reqbooking', async (req, res) => {
  try {
    console.log('hello');
    const jwtToken = req.header('token');
    const {b_date, b_time, b_details} = req.body;
    console.log(jwt.decode(jwtToken));

    // console.log(b_date + b_time);
    await pool.query(
      `INSERT INTO bookmed (student_matric, appointment_date, appointment_time, appointment_details) VALUES($1, $2, $3, $4) RETURNING *`,
      [jwt.decode(jwtToken).student.student_matric, b_date, b_time, b_details],
      (error, result) => {
        if (error) throw error;
        if (result.rowCount > 0) {
          res.status(200).json(result.rows[0]);
        }
      },
    );
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// get booking data
router.get('/getBookdata', async (req, res) => {
  try {
    const jwtToken = req.header('token');
    await pool.query(
      `SELECT appointment_date, appointment_time, appointment_details FROM bookmed WHERE student_matric = $1`,
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
