require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// Core node package for reading and writing files
var fs = require("fs");

// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");
var moment = require("moment");

function concertThis(query) {
    if (query != undefined) {
        axios.get("https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp").then(
            function (response) {
                console.log("\nhere are the upcoming event details: ")
                for (var i = 0; i < response.data.length; i++) {
                    console.log("\nname of venue: " + response.data[i].venue.name);
                    console.log("venue location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                    console.log(response.data[i].datetime.substring(0, 10));
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    else {
        var input = process.argv.slice(3).join(" ");
        axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(
            function (response) {
                console.log("\nhere are the upcoming event details: ")
                for (var i = 0; i < response.data.length; i++) {
                    console.log("\nname of venue: " + response.data[i].venue.name);
                    console.log("venue location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                    console.log("date of concert: " + moment(response.data[i].datetime.substring(0, 10)).format("MM/DD/YYYY"));
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

}

function spotifyThisSong(myQuery) {
    if (myQuery != undefined) {
        spotify.search({ type: 'track', query: myQuery }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("\nname of artist: " + data.tracks.items[0].artists[0].name);
            console.log("\nname of song: " + data.tracks.items[0].name);
            console.log("\npreview of song: " + data.tracks.items[0].preview_url);
            console.log("\nit's from the album: " + data.tracks.items[0].album.name);
        });
    }
    else {
        if (process.argv[3] == undefined) {
            spotify.search({ type: 'track', query: 'The Sign ace of base' }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log("\nname of artist: " + data.tracks.items[0].artists[0].name);
                console.log("name of song: " + data.tracks.items[0].name);
                console.log("preview of song: " + data.tracks.items[0].preview_url);
                console.log("it's from the album: " + data.tracks.items[0].album.name);
            });
        }
        else {
            var input = process.argv.slice(3).join(" ");
            spotify.search({ type: 'track', query: input }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log("\nname of artist: " + data.tracks.items[0].artists[0].name);
                console.log("\nname of song: " + data.tracks.items[0].name);
                console.log("\npreview of song: " + data.tracks.items[0].preview_url);
                console.log("\nit's from the album: " + data.tracks.items[0].album.name);
            });
        }
    }
}

function movieThis(query) {
    if (query != undefined) {
        axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + query).then(
            function (response) {
                console.log("\ntitle of movie: " + response.data.Title);
                console.log("\nyear of movie's release: " + response.data.Year);
                console.log("\nIMDB rating of movie: " + response.data.Ratings[0].Value);
                console.log("\nRotten Tomatoes rating of movie: " + response.data.Ratings[1].Value);
                console.log("\ncountr(ies) where movie was produced: " + response.data.Country);
                console.log("\nlanguage of movie: " + response.data.Language);
                console.log("\nplot of movie: " + response.data.Plot);
                console.log("\nactors in movie: " + response.data.Actors);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    else {
        if (process.argv[3] == undefined) {
            // Then run a request with axios to the OMDB API with the movie specified
            axios.get("http://www.omdbapi.com/?apikey=trilogy&i=tt0485947").then(
                function (response) {
                    console.log("\ntitle of movie: " + response.data.Title);
                    console.log("\nyear of movie's release: " + response.data.Year);
                    console.log("\nIMDB rating of movie: " + response.data.Ratings[0].Value);
                    console.log("\nRotten Tomatoes rating of movie: " + response.data.Ratings[1].Value);
                    console.log("\ncountr(ies) where movie was produced: " + response.data.Country);
                    console.log("\nlanguage of movie: " + response.data.Language);
                    console.log("\nplot of movie: " + response.data.Plot);
                    console.log("\nactors in movie: " + response.data.Actors);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            var input = process.argv.slice(3).join(" ");
            // Then run a request with axios to the OMDB API with the movie specified
            axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + input).then(
                function (response) {
                    console.log("\ntitle of movie: " + response.data.Title);
                    console.log("\nyear of movie's release: " + response.data.Year);
                    console.log("\nIMDB rating of movie: " + response.data.Ratings[0].Value);
                    console.log("\nRotten Tomatoes rating of movie: " + response.data.Ratings[1].Value);
                    console.log("\ncountr(ies) where movie was produced: " + response.data.Country);
                    console.log("\nlanguage of movie: " + response.data.Language);
                    console.log("\nplot of movie: " + response.data.Plot);
                    console.log("\nactors in movie: " + response.data.Actors);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
}

if (process.argv[2] == "concert-this") {
    concertThis();
}

if (process.argv[2] == "spotify-this-song") {
    spotifyThisSong();
}

if (process.argv[2] == "movie-this") {
    movieThis();
}

if (process.argv[2] == "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
        // We will then re-display the content as an array for later use.
        var command = dataArr[0];
        var query = dataArr[1];
        query = query.substring(1, query.length - 1);

        if (command == "concert-this") {
            concertThis(query);
        }

        if (command == "spotify-this-song") {
            spotifyThisSong(query);
        }

        if (command == "movie-this") {
            movieThis(query);
        }

    });
}