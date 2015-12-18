'use strict';
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const router = express.Router();

router.get('/login', (req, res) => {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('login', {
      error: req.flash('error')
    });
  }
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: false,
  failureFlash: 'Invalid username or password.'
}));

router.get('/logout', (req, res) => {
  if (req.user) {
    req.logout();
  }

  res.redirect('login');
});

router.get('/', (req, res) => {
  if (req.user) {
    res.render('index');
  } else {
    res.redirect('login');
  }
});

router.get('/test', (req, res) => {
  if (req.user) {
    res.render('test');
  } else {
    res.redirect('login');
  }
});

module.exports = router;
