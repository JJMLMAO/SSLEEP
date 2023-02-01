const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');
const jwt = require('jsonwebtoken');

// router.get('/', authorization, async (req, res) => {
//   try {
//     // req.student has the payload
//     // res.json(req.student);
//     const student = await pool.query(
//       'SELECT student_name FROM students WHERE student_id = $1',
//       [req.student],
//     );
//     res.json(student.rows[0]);
//   } catch (err) {
//     console.err(err.message);
//     res.status(500).json('Server Error');
//   }
// });

// get student's name
router.get('/getName', async (req, res) => {
  try {
    const jwtToken = req.header('token');
    await pool.query(
      `SELECT student_name FROM students WHERE student_matric = $1`,
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
