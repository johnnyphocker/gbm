const express = require('express');
const router  = express.Router();

const User = require('../models/user');

const bcrypt = require('bcrypt');
const bcryptSalt = 10;


router.get('/signup', (req, res, next) => {
  res.render('signup');
});


router.get('/login', (req, res, next) => {
  res.render('login');
});


router.post('/login', (req, res, next) => {
  const {username, password} = req.body;

  if(username === '' || password === '') {
    res.render('login', {errorMessage: 'Indique un nombre de usuario y/o una contraseña para loguearse'});
    return;
  }

  User.findOne({username})
    .then(user => {
      if(!user) {
        res.render('login', {errorMessage: 'El usuario no existe'});
        return;
      }
      if(bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.redirect('/admin');
      } else {
        res.render('login', {errorMessage: 'Contraseña incorrecta'});
      }
    }).catch(err => next(err));

});



router.post('/signup', (req, res, next) => {

  const {username, name, password, role} = req.body;

  User.findOne({username})
    .then(user => {

      if(user !== null) {
        res.render('signup', {
          errorMessage: 'El usuario ya existe'
        });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt); 

      const newUser = new User({username, role, name, password:hashPass});

      newUser.save()
        .then(user => {
          res.redirect('/login');
        }).catch(err => console.log(err));

  }).catch(err => console.log(err));

});



router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/login");
  });
});


module.exports = router;