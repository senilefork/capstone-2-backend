const express = require('express');
const ExpressError = require('./expressError');

const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const dataRoutes = require("./routes/dataRoutes");
//
const { authenticateJWT } = require("./middleware/auth");

const morgan = require("morgan")



//initialize our server to a variable called app
const app = express();

//
app.use(morgan("dev"));
app.use(express.json());
app.use(authenticateJWT);

//routes
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/data", dataRoutes);


//custom 404
app.use((req, res, next) =>{
    const e = new ExpressError("Page not found", 404);
    next(e)
})

//error handler 
app.use((err, req, res, next) => {
   if(process.env.NODE_ENV !== "test") console.error(err.stack);
   let status = err.status || 500;
   let message = err.msg;

   return res.status(status).json({error: {message, status}})
})

module.exports = app;