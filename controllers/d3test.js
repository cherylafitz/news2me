var db = require('../models');
var express = require('express');
var router = express.Router();

router.get("/", function(req,res){
  res.render("d3/index");
});


module.exports = router;

