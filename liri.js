//required npms
var request = require("request");

var Twitter = require('twitter');
var keys = require('./keys.js');

var Spotify = require('spotify');

//Var for command line inputs
var input = process.argv;
var command = input[2];
var info = input[3];





// ----- Liri Object ----- //
var liri = {

	//Function to display tweets
	tweets: function() {
		var client = new Twitter(keys.twitterKeys);
		const params = {
			screen_name: 'bigdoliveira',
			count: 20
		};

		client.get('statuses/user_timeline', params, function(error, tweets, response){
			if (!error) {
				for (var i = 0; i < tweets.length; i++) {
					console.log(`My Tweets:\n ${i+1}: ${tweets[i].text}\n${tweets[i].created_at}`);
				}
			}
			else {
				console.log(error);
			}
		});//client.get
	},//tweets function

	songs: function() { 
		Spotify.search({ type: 'track', query: 'dancing in the moonlight', limit: 1 }, function(error, data) {
    	if (!error) {
    		console.log(JSON.stringify(data.items, null, 4));

    		var artistName = data.tracks.items[0].album.artists[0].name;
    		var songName = data.tracks.items[0].name;
    		var songLink = data.tracks.items[0].

    		console.log(`

    			`);
    	}
    	else {
    		console.log('Error occurred: ' + error);
        return;
    	}
	});//spotify.search

	},//songs function

};//liri object


// ----- Events ----- //

switch (command) {
	case "my-tweets":
		liri.tweets();
		break;

	case "spotify-this-song":
		liri.songs();
		break;

	case "movie-this":
		liri.movies();
		break;

	default: 
		console.log("Error with command");
}









