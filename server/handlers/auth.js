const jwt = require('jsonwebtoken');



const db = require("../models/index");


exports.register = async (req, res, next) => {
  try {
      
      console.log('body details', req.body);
      const user = await db.User.create(req.body);
      const { id, username } = { user };
      const token = jwt.sign({ id: id }, process.env.SECRET)
      res.status(200).json(id, username, token);

  } catch (err) {
      if (err.code === 11000) {
          err.message = 'Sorry username is already taken';
      }
      next(err);
  }

};

exports.login = async (req, res, next) => {
  try {

      const user = await db.User.findOne({ username: req.body.username });
      const { id, username } = user;
      const valid = await user.comparePassword(req.body.pass);

      if (valid) {
          const token = jwt.sign({ id: id }, process.env.SECRET)

          res.json({
              id,
              username,
              token
          });
      } else {
          throw new Error('Wrong username and password');
      }
  } catch (e) {
      e.message = 'Invalid Username/Password'
      next(e)
  }
};