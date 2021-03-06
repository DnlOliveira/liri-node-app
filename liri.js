//required npms
var request = require("request");

var Twitter = require('twitter');
var keys = require('./keys.js');

var Spotify = require('spotify');

var MovieDB = require('moviedb')('edd19c4e733b1cd3715b4ee5b5926008');

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
				console.log(`
					------------------------
					My Tweets:
				`);
				for (var i = 0; i < tweets.length; i++) {
					console.log(`
						${i+1}:${tweets[i].text}\n${tweets[i].created_at}
						----------------------
					`);
				}
			}
			else {
				console.log(error);
			}
		});//client.get
	},//tweets function

	//function to search for songs
	songs: function(title) {
		Spotify.search({ type: 'track', query: title, limit: 1 }, function(error, data) {
    	if (!error) {
				//views all data returned
    		// console.log(JSON.stringify(data, null, 4));

    		var artistName = data.tracks.items[0].album.artists[0].name;
    		var songName = data.tracks.items[0].name;
    		var songLink = data.tracks.items[0].preview_url;
				var albumName = data.tracks.items[0].album.name;

    		console.log(`
					---------------------------
					Spotify:

					Artist: 		${artistName}
					Song Title: ${songName}
					Album:			${albumName}
					Song Link:	${songLink}
					---------------------------
					`);
    	}
    	else {
    		console.log('Error occurred: ' + error);
        return;
    	}
		});//spotify.search
	},//songs function

	//function to search for movies
	movies: function(movie) {
		MovieDB.searchMovie({ query: movie }, (err, res) => {
			if (!err) {
				var title = res.results[0].original_title;
				var released = res.results[0].release_date;
				var rating = res.results[0].popularity;

				console.log(`
					---------------------------
					MovieDB:

					Title: 				${title}
					Release Date: ${released}
					Rating:				${rating}
					---------------------------
				`);
			}
		});//moviedb search
	}//movies function

};//liri object


// ----- Events ----- //

switch (command) {
	case "my-tweets":
		liri.tweets();
		break;

	case "spotify-this-song":
		liri.songs(info);
		break;

	case "movie-this":
		liri.movies(info);
		break;

	default:
		console.log("Error with command");
}
