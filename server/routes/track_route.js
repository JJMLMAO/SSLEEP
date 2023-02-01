const pool = require('../db');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

// track route

// to post data into database
router.post('/onEntryTrack', async (req, res) => {
  try {
    const jwtToken = req.header('token');
    const {day_entry, hours_entry} = req.body;
    console.log(jwt.decode(jwtToken));
    console.log(day_entry);
    console.log(hours_entry);

    await pool.query(
      `INSERT INTO track (student_matric, day_entry, hours_entry) VALUES($1, $2, $3) RETURNING *`,
      [jwt.decode(jwtToken).student.student_matric, day_entry, hours_entry],
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

// to get data from database
router.get('/getEntryTrack', async (req, res) => {
  try {
    const jwtToken = req.header('token');
    await pool.query(
      `SELECT day_entry, hours_entry FROM track WHERE student_matric = $1`,
      [jwt.decode(jwtToken).student.student_matric],
      (error, result) => {
        if (error) throw error;
        if (result.rowCount > 0) {
          res.status(200).json(result.rows);
        }
      },
    );
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
