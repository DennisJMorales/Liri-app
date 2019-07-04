//grab from .env (personal info) in order make spotify work & npm install
require("dotenv").config();

// pull keys.js , require means to grab it 
var keys = require("./keys.js");

// all var to call them

var axios = require("axios");
var fs = require("fs");


// command arrg entered by user stored in variable
var appCommand = process.argv[2];
//console.log("appCommand: " + appCommand);
//search option with slice method on 3rd index onword and then join 
var userSearch = process.argv.slice(3).join(" ");
//console.log("userSearch: " + userSearch);

//switch statement to execute appCommand based on user input
function liriGo(appCommand, userSearch) {
    switch (appCommand) {

        case "concert-this":
            getBandsInTown(userSearch);
            break;

        case "spotify-this-song":
            getSpotify(userSearch);
            break;

        case "movie-this":
            getOMDB(userSearch);
            break;

        case "do-what-it-says":
            getRandom();
            break;
        //if no input detected return message to user
        default:
            console.log("please enter a commmand, example: 'concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says'");
    }
};



// function to serch omdb
function getOMDB(movie) {
    //if user doesnt type movie name
    if (!movie) {
        movie = "Mr. Nobody"
    }
    var movieQueryUrl = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    axios.request(movieQueryUrl).then(
        function (response) {
            //console.log movie data
            console.log("* Title: " + response.data.Title + " ");
            console.log("* Year Released: " + response.data.Year + " ");
            console.log("* IMDB Rating: " + response.data.imdbRating + " ");
            console.log("* Rotten Tomatoes Rating: " + response.data.Ratings[1] + " ");
            console.log("* Country Where Produced: " + response.data.Country + " ");
            console.log("* Language: " + response.data.Language + " ");
            console.log("* Plot: " + response.data.Plot + " ");
            console.log("* Actors: " + response.data.Actors + " ");
            //log info on log.txt
            var logMovie = "=======Movie Log=======" +
                "\nMovie Title: " + response.data.Title +
                "\nYear Released: " + response.data.Year +
                "\nIMDB Rating: " + response.data.imdbRating +
                "\nRotten Tomatoes Rating: " + response.data.Ratings[1] +
                "\nCountry Where Produced: " + response.data.Country +
                "\nLanguage: " + response.data.Language +
                "\nPlot: " + response.data.Plot +
                "\nActors: " + response.data.Actors;

            fs.appendFile("log.txt", logMovie, function (err) {
                if (err) throw err;
            });
        });
};
// function Random
function getRandom() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        } else {
            console.log(data);

            var randomData = data.split(",");
            liriExecute(randomData[0], randomData[1]);
        }
        //console.log("testing: " + randomData[0] + randomData[1]);
    });
};




// Make it so liri.js can take in one of the following commands:



// concert-this
// spotify-this-song
// do-what-it-says

// What Each Command Should Do


// node liri.js concert-this <artist/band name here>

liriGo(appCommand, userSearch);

