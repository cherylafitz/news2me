var db = require('../../models');
var async = require('async');

var channelId = 1;

// get searchterms for channel conv to Array, & image_urls
db.searchterm.findAll({
  where:{channelId: channelId}
}).then(function(terms){

  async.eachSeries(terms,function(term,callback1){
    // do something asynchronous here

    db.tweet.findAll({
      where:{search_term: term.term}
    }).then(function(tweets){
      async.eachSeries(tweets,function(tweet,callback2){
        tweet.searchtermId = term.id;
        tweet.save();
        callback2(null,tweet);
      }, function(err){
        console.log('tweet save err',err);
        callback2(err,tweet);
      });
    });
    callback1(null,'something');
  }, function(err) {
    // console.log('done with everything');
    callback1(err,terms);
  });
  console.log('after loop');
});
