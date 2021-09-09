const express = require('express');
const router = express.Router();
const axios = require('axios');

const { API_KEY } = require('../config')

const { BadRequestError } = require("../expressError");
const { ensureLoggedIn } = require("../middleware/auth");

/* -------------disease.sh routes--------------  */

/*---------------------GLOBAL ROUTES------------------------------- */

//get global COVID-19 totals for today, yesterday and two days ago
router.get("/all", async function(req, res, next){
    try{
      let resp = await axios.get(`https://disease.sh/v3/covid-19/all`)
      return res.send({"data": resp.data})
    }catch(e){
      return next(e)
    }
})

//get COVID-19 totals for all countries
router.get("/countries", async function(req, res, next){
    try{
      let resp = await axios.get(`https://disease.sh/v3/covid-19/countries`)
      return res.send({"data": resp.data})
    }catch(e){
      return next(e)
    }
})

//get COVID-19 totals for specific country
router.get("/countries/:country", async function(req, res, next){
    try{
        let country = req.params.country
      let resp = await axios.get(`https://disease.sh/v3/covid-19/countries/${country}`)
      return res.send({"data": resp.data})
    }catch(e){
      return next(e)
    }
})

//get global accumulated COVID-19 time series data
router.get("/historical-all", async function(req, res, next){
    try{
      let days = "30";
      let resp = await axios.get(`https://disease.sh/v3/covid-19/historical/all?lastdays=${days}`)
      return res.send({"data": resp.data})
    }catch(e){
      return next(e)
    }
})

//get global accumulated COVID-19 time series data w/days parameter
router.get("/historical-all/:days", async function(req, res, next){
    try{
      let days = req.params.days;
      let resp = await axios.get(`https://disease.sh/v3/covid-19/historical/all?lastdays=${days}`)
      return res.send({"data": resp.data})
    }catch(e){
      return next(e)
    }
})


//time series data for all countries w/default 30 days
router.get("/historical", async function(req, res, next){
    try{
      let days = "30";
      let resp = await axios.get(`https://disease.sh/v3/covid-19/historical?lastdays=${days}`)
      return res.send({"data": resp.data})
    }catch(e){
      return next(e)
    }
})

//time series data for all countries w/parameter for days
router.get("/historical/:days", async function(req, res, next){
    try{
      let days = req.params.days;
      let resp = await axios.get(`https://disease.sh/v3/covid-19/historical?lastdays=${days}`)
      return res.send({"data": resp.data})
    }catch(e){
      return next(e)
    }
})

/*---------------------------- US ROUTES ------------------------------------------- */

//totals for all US states
router.get("/us-states-all", async function(req, res, next){
    try{
      let days = req.params.days;
      let resp = await axios.get(`https://disease.sh/v3/covid-19/states`)
      return res.send({"data": resp.data})
    }catch(e){
      return next(e)
    }
})

//totals per state specified
router.get("/us-states-all/:state", async function(req, res, next){
    try{
      let state = req.params.state;
      let resp = await axios.get(`https://disease.sh/v3/covid-19/states/${state}`)
      return res.send({"data": resp.data})
    }catch(e){
      return next(e)
    }
})

//endpoint to get all states/provinces available to query for time series per state
router.get("/us-counties", async function(req, res, next){
    try{
      let resp = await axios.get(`https://disease.sh/v3/covid-19/historical/usacounties`)
      return res.send({"data": resp.data})
    }catch(e){
      return next(e)
    }
})

//time series per state specified, default 30 days
router.get("/us-counties/:state", async function(req, res, next){
    try{
      let state = req.params.state; 
      let days = "30";
      let resp = await axios.get(`https://disease.sh/v3/covid-19/historical/usacounties/${state}?lastdays=${days}`)
      return res.send({"data": resp.data})
    }catch(e){
      return next(e)
    }
})

//time series per state and days specified
router.get("/us-counties/:state/:days", async function(req, res, next){
    try{
      let state = req.params.state; 
      let days = req.params.days;
      let resp = await axios.get(`https://disease.sh/v3/covid-19/historical/usacounties/${state}?lastdays=${days}`)
      return res.send({"data": resp.data})
    }catch(e){
      return next(e)
    }
})

/*--------------------------- Vax routes ------------------------------------ */

//time series global vaccine doses administered default 30 days
router.get("/vaccine/global-total", async function(req, res, next){
    try{
      let days = "30";
      let resp = await axios.get(`https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=${days}&fullData=false`)
      return res.send({"data": resp.data})
    }catch(e){
      return next(e)
    }
})

//time series global vaccine doses administered per days specified
router.get("/vaccine/global-total/:days", async function(req, res, next){
    try{
      let days = req.params.days;
      let resp = await axios.get(`https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=${days}&fullData=false`)
      return res.send({"data": resp.data})
    }catch(e){
      return next(e)
    }
})

// time series vaccine coverage per country 30 days default
router.get("/vaccine/countries", async function(req, res, next){
    try{
      let days = "30"
      let resp = await axios.get(`https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=${days}&fullData=false`)
      return res.send({"data": resp.data})
    }catch(e){
      return next(e)
    }
})

// time series vaccine coverage per country, days specified
router.get("/vaccine/countries/:days", async function(req, res, next){
    try{
      let days = req.params.days;
      let resp = await axios.get(`https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=${days}&fullData=false`)
      return res.send({"data": resp.data})
    }catch(e){
      return next(e)
    }
})

// time series vaccine coverage per country for last 30 days
router.get("/vaccine/country/:country", async function(req, res, next){
    try{
      let days ="30";
      let country = req.params.country;
      let resp = await axios.get(`https://disease.sh/v3/covid-19/vaccine/coverage/countries/${country}?lastdays=${days}`)
      return res.send({"data": resp.data})
    }catch(e){
      return next(e)
    }
})

router.get("/vaccine/country/:country/:days", async function(req, res, next){
    try{
      let days =req.params.days;
      let country = req.params.country;
      let resp = await axios.get(`https://disease.sh/v3/covid-19/vaccine/coverage/countries/${country}?lastdays=${days}`)
      return res.send({"data": resp.data})
    }catch(e){
      return next(e)
    }
})

//time series vaccine coverage per state, 30 days default
router.get("/vaccine/us-states", async function(req, res, next){
    try{
      let days = "30";
      let resp = await axios.get(`https://disease.sh/v3/covid-19/vaccine/coverage/states?lastdays=${days}&fullData=false`)
      return res.send({"data": resp.data})
    }catch(e){
      return next(e)
    }
})

//time series vaccine coverage per state, days specified
router.get("/vaccine/us-states/:days", async function(req, res, next){
    try{
      let days = req.params.days;
      let resp = await axios.get(`https://disease.sh/v3/covid-19/vaccine/coverage/states?lastdays=${days}&fullData=false`)
      return res.send({"data": resp.data})
    }catch(e){
      return next(e)
    }
})

//time series vaccine admins last 30 days per state specified
router.get("/vaccine/us-state/:state", async function(req, res, next){
    try{
      let state = req.params.state;
      let days = "30"
      let resp = await axios.get(`https://disease.sh/v3/covid-19/vaccine/coverage/states/${state}?lastdays=${days}&fullData=false`)
      return res.send({"data": resp.data})
    }catch(e){
      return next(e)
    }
})

router.get("/vaccine/us-state/:state/:days", async function(req, res, next){
    try{
      let state = req.params.state;
      let days = req.params.days;
      let resp = await axios.get(`https://disease.sh/v3/covid-19/vaccine/coverage/states/${state}?lastdays=${days}&fullData=false`)
      return res.send({"data": resp.data})
    }catch(e){
      return next(e)
    }
})

/* Comprehensive data from nyt country wide data */
router.get("/nyt-data/all", async function(req, res, next){
    try{     
      let resp = await axios.get(`https://api.covidactnow.org/v2/country/US.json?apiKey=${API_KEY}`)
      return res.send({"data": resp.data})
    }catch(e){
      return next(e)
    }
})

/* This route returns comprehensive data for all US states*/
router.get("/nyt-data", async function(req, res, next){
    try{     
      let resp = await axios.get(`https://api.covidactnow.org/v2/states.json?apiKey=${API_KEY}`)
      return res.send({"data": resp.data})
    }catch(e){
      return next(e)
    }
})

/* This route returns comprehensive per US state*/
router.get("/test2/:state", async function(req, res, next){
    try{
      let state = req.params.state;
      let resp = await axios.get(`https://api.covidactnow.org/v2/state/${state}.json?apiKey=${API_KEY}`)
      return res.send({"data": resp.data})
    }catch(e){
      return next(e)
    }
})

/* time series per state specified */
router.get("/nyt-data/:state", async function(req, res, next){
    try{
      let state = req.params.state
      let resp = await axios.get(`https://api.covidactnow.org/v2/state/${state}.timeseries.json?apiKey=${API_KEY}`)
      return res.send({"data": resp.data})
    }catch(e){
      return next(e)
    }
})


module.exports = router;

