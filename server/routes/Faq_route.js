const pool = require('../db');
const router = require('express').Router();
// const jwt = require('jsonwebtoken');

// faq route

// to display faq to users
router.get('/getFaqs', async (req, res) => {
  try {
    // const jwtToken = req.header('token');
    await pool.query(`SELECT * FROM faq`, [], (error, result) => {
      if (error) throw error;
      if (result.rowCount > 0) {
        res.status(200).json(result.rows);
      }
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
