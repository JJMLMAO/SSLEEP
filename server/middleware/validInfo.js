module.exports = (req, res, next) => {
  const {student_email, student_password, student_matric, student_name} =
    req.body;

  function validEmail(student_email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(student_email);
  }

  if (req.path === '/signups') {
    // console.log(!student_email.length);
    if (
      ![student_email, student_password, student_matric, student_name].every(
        Boolean,
      )
    ) {
      return res.status(401).send('Missing Credentials');
    } else if (!validEmail(student_email)) {
      return res.status(401).send('Invalid Email');
    }
  } else if (req.path === '/logins') {
    if (![student_email, student_password].every(Boolean)) {
      return res.status(401).send('Missing Credentials');
    } else if (!validEmail(student_email)) {
      return res.status(401).send('Invalid Email');
    }
  }

  next();
};
