const express = require('express');
const router = express.Router();

const { BadRequestError } = require("../expressError");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");

const jsonschema = require("jsonschema");
const newUserSchema = require("../schemas/newUser.json");
const User = require('../models/user');
const { createToken } = require('../helpers/tokens');



//Route for registering a user so that an admin can create another admin user
//not for front end registration page
router.post("/", ensureAdmin, async function (req, res, next) {
   try{
     const validator = jsonschema.validate(req.body, newUserSchema);
     if(!validator.valid){
       const errors = validator.errors.map(e => e.stack);
       throw new BadRequestError(errors);
     }

     const user = await User.register(req.body);
     const token = createToken(user);
     return res.status(201).json({ user, token });
   }catch(e){
    return next(e)
   }
});

//Route to get all users, only for admins
router.get("/", ensureAdmin, async function (req, res, next) {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});

//Route for getting user information. We will use this route to 
//to handle current user on the front end
router.get("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

//patch route so users or admins can edit user accounts
//USER AUTH HERE---------------------
router.patch("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

//route for deleting user, only for admins
router.delete("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    await User.remove(req.params.username);
    return res.json({ deleted: req.params.username });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;