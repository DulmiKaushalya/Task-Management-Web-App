const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: `${process.env.CLIENT_URL}/dashboard`
  }));

router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ message: "Error logging out" });
    res.redirect(process.env.CLIENT_URL);
  });
});

router.get('/current-user', (req, res) => {
  res.json(req.user || null);
});

module.exports = router;
