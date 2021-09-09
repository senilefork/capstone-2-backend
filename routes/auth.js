const User = require('../models/user');
const jsonschema = require("jsonschema");

const { createToken } = require("../helpers/tokens")
const express = require('express');
const router = new express.Router();

const userAuthSchema = require("../schemas/userAuth.json");
const userRegisterSchema = require("../schemas/userRegister.json");
const { BadRequestError } = require("../expressError");


//route for logging in a user, returns a token for authentication purposes
// POST auth/token    req.body ----> { username, password } => { token }
router.post("/token", async function(req, res, next) {
    try{
      const validator = jsonschema.validate(req.body, userAuthSchema);
      if(!validator.valid){
        const errors = validator.errors.map(e => e.stack);
        throw new BadRequestError(errors);
      }
      const { username, password } = req.body;
      const user = await User.authenticate(username, password);
      const token = createToken(user);
      return res.json({token});
    }catch(e){
      next(e);
    }
})



//Route for registering a user
//POST auth/register    req.body ----> { username, password, firstName, lastName, email} => { token }
router.post("/register", async function (req, res, next) {
    try{
      const validator = jsonschema.validate(req.body, userRegisterSchema);
      if(!validator.valid){
        const errors = validator.errors.map(e => e.stack);
        throw new BadRequestError(errors);
      }

      const newUser = await User.register({...req.body, isAdmin: false });
      const token = createToken(newUser)
      return res.json({ token });
    }catch(e){
     return next(e);
    }
 });

module.exports = router;