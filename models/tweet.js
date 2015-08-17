'use strict';
module.exports = function(sequelize, DataTypes) {
  var tweet = sequelize.define('tweet', {
    tweet_id: DataTypes.INTEGER,
    tweet_created_at: DataTypes.DATE,
    tweet_text: DataTypes.STRING,
    tweet_source: DataTypes.STRING,
    user_name: DataTypes.STRING,
    user_url: DataTypes.STRING,
    retweet_count: DataTypes.INTEGER,
    favorite_count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return tweet;
};