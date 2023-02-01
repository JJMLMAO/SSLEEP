const pool = require('../db');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

// feedback route

// to submit feedback
router.post('/submitfeedbacks', async (req, res) => {
  try {
    const jwtToken = req.header('token');
    // destructure req.body
    const {fb_date, fb_desc} = req.body;
    console.log(jwt.decode(jwtToken));

    await pool.query(
      'INSERT INTO feedback (student_matric, feedback_date, feedback_description) VALUES($1, $2, $3) RETURNING *',
      [jwt.decode(jwtToken).student.student_matric, fb_date, fb_desc],
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

// to retrieve feedbacks from users
router.get('/getfeedbacks', async (req, res) => {
  try {
    const jwtToken = req.header('token');

    await pool.query(
      `SELECT feedback_date, feedback_description FROM feedback WHERE student_matric = $1`,
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
