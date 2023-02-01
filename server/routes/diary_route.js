const pool = require('../db');
const router = require('express').Router();
// const authorization = require('../middleware/authorization');
const jwt = require('jsonwebtoken');
const {json} = require('express');

// diary route

//upload diary content
router.post('/submitdiary', async (req, res) => {
  try {
    const jwtToken = req.header('token');
    // destructure req.body
    const {d_description, d_date, d_time} = req.body;
    console.log(jwt.decode(jwtToken));
    console.log(d_description);

    await pool.query(
      'INSERT INTO diary (student_matric, diary_description, diary_date, diary_time) VALUES($1, $2, $3, $4) RETURNING *',
      [
        jwt.decode(jwtToken).student.student_matric,
        d_description,
        d_date,
        d_time,
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

// to retrieve diary content from users
router.get('/getdiary', async (req, res) => {
  try {
    const jwtToken = req.header('token');
    await pool.query(
      `SELECT diary_description, diary_date, diary_time FROM diary WHERE student_matric = $1`,
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

// to retrieve the month of the created diary
router.get('/getMonth', async (req, res) => {
  try {
    const jwtToken = req.header('token');
    await pool.query(
      `SELECT DISTINCT to_char(diary_date, 'Month') AS month_name, to_char(diary_date, 'MM') AS month_number FROM diary WHERE student_matric = $1 ORDER BY month_number`,
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
    return res.status(200).json(result.rows);
  }
});

// to retrieve the dates of the month
router.get('/getDate', async (req, res) => {
  try {
    const jwtToken = req.header('token');
    await pool.query(
      `SELECT to_char(diary_date, 'YYYY-MM-DD') AS date, to_char(diary_date, 'MM') AS month_number, diary_description AS desc FROM diary WHERE student_matric = $1 ORDER BY month_number`,
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
    return res.status(200).json(result.rows);
  }
});

router.get('/getDescription', async (req, res) => {
  try {
    const jwtToken = req.header('token');
    await pool.query(
      `SELECT diary_description, diary_date FROM diary WHERE student_matric = $1`,
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
    return res.status(200).json(result.rows);
  }
});

module.exports = router;
