const pool = require('../db');
const router = require('express').Router(); // able to breakdown routes and combine the routes together again
const authorization = require('../middleware/authorization');
const jwt = require('jsonwebtoken');

// personalisation route

router.post('/personalisations', async (req, res) => {
  try {
    const jwtToken = req.header('token');
    // destructure the req.body
    const {list, date, list_hourslept, list_bedtime} = req.body;
    console.log(jwt.decode(jwtToken));

    await pool.query(
      'INSERT INTO personalisation (student_matric, p_gender, p_dob, p_sleephours, p_bedtime) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [
        jwt.decode(jwtToken).student.student_matric,
        list,
        date,
        list_hourslept,
        list_bedtime,
      ],
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

// display personalisation route
router.get('/getpersonalisationdata', async (req, res) => {
  try {
    const jwtToken = req.header('token');
    await pool.query(
      'SELECT p_gender, p_dob, p_sleephours, p_bedtime FROM personalisation WHERE student_matric = $1',
      [jwt.decode(jwtToken).student.student_matric],
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

// check personalisation route
router.get('/verifyPersonalisation', async (req, res) => {
  try {
    const jwtToken = req.header('token');
    await pool.query(
      `SELECT EXISTS (SELECT p_id FROM personalisation WHERE student_matric = $1) AS isPersonalised`,
      [jwt.decode(jwtToken).student.student_matric],
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

module.exports = router;
