var db = require('../models');
var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var async = require('async');
 

 router.get('/', function(req,res){
 	// res.send('hello');
	  var client = new Twitter({
<<<<<<< HEAD
		  consumer_key: 'V52R2iRmZlA3RowHVnKYRoqHE',
		  consumer_secret: 'ufZZyF9SnLBZ1mNRLHIevQaG13kC8mG4GlN8BUQ7RfvNlrj0U1',
		  access_token_key: '18682848-BrD9Z1S7ZLj7NnwkwIfE9PVsMA7TjaOJ6lGs8LxKY',
		  access_token_secret: 'VTvJ515RX5TR9sLRQH7MAcOcJl2Wdez48axmopZ9OoDfh'
		});

	client.get('search/tweets', {'q':' hillary  since:2015-08-01', 'count': 5, 'result\_type':'popular'}, 
		function(error, tweets, response){
		  if(error) throw error;
		  //  console.log(tweets);  // The favorites. 
		  // console.log(response);  // Raw response object. 

			res.render('twitter/index', {tweets: tweets})

	});
//check limit on API
// client.get('application/rate_limit_status', function(error, limit, response){
//   if(error) throw error;
//   // console.log(response);  // Raw response object. 
// 	res.send(limit)
// 	});
=======
		  consumer_key: process.env.TWITTR_CONSUMER_KEY,
		  consumer_secret: process.env.TWITTR_CONSUMER_SECRET,
		  access_token_key: process.env.TWITTR_ACCESS_TOKEN_KEY,
		  access_token_secret: process.env.TWITTR_ACCESS_TOKEN_SECRET
		});
		var candidates = ['Hillary Clinton', 'Donald Trump', 'Bernie Sanders'];

		async.map(candidates, function(candidate, callback) {
		  console.log("Searching for tweets on  : " + candidate);
		 client.get('search/tweets', {'q': candidate + ' since:2015-08-01', 'count': 30, 'result\_type':'popular'}, 
			function(error, tweets, response){
			  if(error) throw error;
			   // console.log(tweets);  // The favorites. 
			   callback(null,{
			   	term:candidate,
			   	tweets:tweets
			   });

			});
		}, function(err,result) {
			// console.log(result);
			 res.render('twitter/index', {result: result})
			result.forEach(function(person){
				console.log(person.term);
				console.log(person.tweets.statuses.length);
				console.log(person.tweets.statuses.text);
				console.log('-----')
			})
		  	console.log("DONE WITH EVERYTHING");
		});
>>>>>>> 3fcad1cbd05b346c08731fa66fed5e209027c527

});

module.exports = router;