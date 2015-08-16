var db = require('../models');
var express = require('express');
var router = express.Router();

// console.log('made it to router')

router.get("/", function(req, res) {
    // console.log('hey i got it!!!!')
  var defaultChannel = 'presidentElect2016';
  db.channel.find({
    where:{
      name: defaultChannel
    }
  }).then(function(channel){
    var result = channel.get().search_terms.split('///').map(function(term){
      return '@'+term.replace(/ /gi, '').toLowerCase()});


    console.log('@array',result);
    // // do something with this result HERE!!! like...
    res.render('main/index', {
      channel_name: channel.get().name,
      search_terms: result
    });
  });
});

//GET /restricted
//an example restricted page
router.get('/restricted',function(req,res){
  if(req.currentUser){
    res.render('main/restricted');
  } else {
    res.redirect('/');
  }
});



module.exports = router;