const express = require('express');
const router  = express.Router();


router.get('/', (req, res, next) => {
  let user = req.session.currentUser;
  res.render('index', {user});
});


module.exports = router;
