var db = require('../models');
var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var async = require('async');

// channel list all
router.get('/', function(req, res) {
  db.channel.findAll().then(function(channels){
    res.render('channels/index',{
      channels: channels
    });

  });
});


router.get('/:id/terms/:termId', function(req,res) {
  res.send(req.params);
});


// channel set on get send to to home
router.get('/:id', function(req,res) {
  req.session.currentChannel = req.params.id;
  res.redirect('/');
});


// ENTER NEW CHANNEL
router.get('/new', function(req, res) {
  if (!req.session.user) {
    req.flash('danger','You must be logged in to create a channel.');
    res.redirect('/auth/login');
  } else {
    res.render('channels/form',{
      action: 'Create',
      thisChannel: null
    });
  }
});

// CREATE CHANNEL
router.post('/new', function(req, res) {
  db.channel.create({
    name: req.body.name,
    userId: req.session.user
  }).then(function(thisChannel) {
    // res.send(thisChannel);
    res.redirect('/channels/'+thisChannel.id+'/terms/new');
  });
});

// ENTER NEW SEARCH TERM
router.get('/:id/terms/new', function(req, res) {
  // res.send(req.params.id);
  db.channel.find({
    where:{id: req.params.id},
    include:[db.searchterm]
  }).then(function(thisChannel){
    res.render('channels/newterm',{
      thisChannel: thisChannel
    });
  });
});

// CREATE SEARCHTERM
router.post('/:id/terms', function(req,res) {
  // res.send(req.body);
  db.channel.findById(req.params.id).then(function(thisChannel){
    thisChannel.createSearchterm({
      term: req.body.term,
      image_url: req.body.image_url
    }).then(function(searchterm){
      res.redirect('/channels/'+thisChannel.id+'/terms/new');
    });
  });
});

// EDIT CHANNEL
//     .com/channels/##/edit
router.get('/:id/edit', function(req,res) {
  // res.send(req.params.id);
  db.channel.find({
    where:{id:req.params.id},
    include:[db.searchterm]
  }).then(function(thisChannel){
    res.render('channels/form',{
      action: 'Edit',
      thisChannel: thisChannel
    });
  });
});

// UPDATE CHANNEL
//    .com/channels/##/edit
router.post('/:id/edit', function(req,res) {
  // res.send(req.body);
  db.channel.find({
    where:{id:req.params.id},
    include:[db.searchterm]
  }).then(function(thisChannel){
    thisChannel.name = req.body.name;
    thisChannel.save();
    res.redirect('/channels/'+thisChannel.id+'/terms/new');
  });
});

  //    MSHARIF34   GET IMAGE FROM TWITTER FOR DEFAULT IMAGE_URL >> NEEDS IMPLEMENTING
  //
  // // get default term imageUrl from twitter
  // var client = new Twitter({
  //   consumer_key: process.env.TWITTR_CONSUMER_KEY,
  //   consumer_secret: process.env.TWITTR_CONSUMER_SECRET,
  //   access_token_key: process.env.TWITTR_ACCESS_TOKEN_KEY,
  //   access_token_secret: process.env.TWITTR_ACCESS_TOKEN_SECRET
  // });
  // client.get('search/tweets', {'q': term + ' since:2015-08-01', 'count': 15, 'result\_type': 'popular'},
  //   function(error, tweets, response) {
  //     if (error) throw error;
  //     var url = tweets.statuses[0].user.profile_image_url
  // });



module.exports = router;
