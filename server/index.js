const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//
app.listen(5000, () => {
  console.log('server has started on port 5000');
});
// REGISTER  AND LOGIN ROUTE
app.use('/auth', require('./routes/jwtAuth'));

// APPSTACK ROUTE
app.use('/AppStack', require('./routes/Dashboard'));

// PERSONALISATION ROUTE
app.use('/personalisation', require('./routes/personalisation_route'));

// FEEDBACK ROUTE
app.use('/feedback', require('./routes/feedback_route'));

// DIARY ROUTE
app.use('/diary', require('./routes/diary_route'));

// FAQ ROUTE
app.use('/faq', require('./routes/Faq_route'));

// TRACK ROUTE
app.use('/track', require('./routes/track_route'));

// STUDENT PROFILE ROUTE
app.use('/student', require('./routes/profile_route'));

// BOOKMED ROUTE
app.use('/bookmed', require('./routes/bookmed_route'));
