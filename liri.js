require("dotenv").config();

var axios = require("axios")
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var fs = require("fs")
var spotify = new Spotify(keys.spotify);
var userCommand = process.argv[2];
var secondCommand = process.argv[3];
var artist = "Ariana+Grande"
function concertThis(){

  // node liri.js concert-this <artist/band name here>
  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function(response){
    // Name of the venue
    console.log(response.data[0].venue.name)
    // Venue location
    console.log(response.data[0].venue.city)
    // Date of the Event (use moment to format this as "MM/DD/YYYY")
    console.log(moment(response.data[0].datetime).format("MM/DD/YYYY"))
  })
  .catch(function(error){
    if(error.response){
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    }else if (error.request){
      console.log(error.request);
    } else {
      
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}




//spotify-this-song
// This will show the following information about the song in your terminal/bash window
function spotifyThis(){

  spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    
    // Artist(s)
    console.log(data.tracks.items[0].album.artists[0].name);
    // The song's name
    console.log(data.tracks.items[0].name);
    // A preview link of the song from Spotify
    console.log(data.tracks.items[0].external_urls.spotify);
    // The album that the song is from
    console.log(data.tracks.items[0].album.name);
  });
}
  // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
  title = "Mr.+Nobody"

  function movieThis(){

    axios.get("https://www.omdbapi.com/?t="+ title +"&y=&plot=short&apikey=trilogy").then(function(response){
      
      console.log("The IMDB movie's rating is: " + response.data.imdbRating + "\nThe Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value + "\nCountry Produced: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors);
    })
    .catch(function(error){
      if(error.response){
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      }else if (error.request){
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
    
  }
  
  
//do-what-it-says
// node liri.js do-what-it-says
function doIt(){
fs.readFile("random.txt", "utf8", function(error, data){
  if(!error){
    var splited = data.toString().split(',');
    console.log(splited);
  }
});

}


// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Edit the text in random.txt to test out the feature for movie-this and concert-this.

function mySwitch(userCommand){
switch(userCommand){
case "concert-this":
concertThis();
break;
case "spotify-this-song":
  spotifyThis();
  break;
  case "movie-this":
  movieThis();
  break;
  case "do-what-it-says":
  doIt();
  break;
}
}
mySwitch(userCommand)