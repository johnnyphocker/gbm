const express = require("express");
const router = express.Router();

const User = require('../models/user');

router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
});

router.get("/admin", (req, res, next) => {
  let user = req.session.currentUser;
  User.find((err, getUser) => {
    if(err) {
      res.status(400).json({err});
    }    
    res.render("admin", {user, getUser});
  })
});

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/login");
  });
});


router.get('/usuario/:id', (req, res, next) => {
  let user = req.session.currentUser;
  let {id} = req.params;
  User.findOne({_id:id}, (err, getUser) => {
    if(err) {
      res.status(400).json({err})
    }
    res.render('usuario', {user, getUser});
  });
});

router.get('/borrar-usuario/:id', (req, res, next) => {
  console.log('hola')
})

module.exports = router;