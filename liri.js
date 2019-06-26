require("dotenv").config();

var axios = require("axios")
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var fs = require("fs")
var spotify = new Spotify(keys.spotify);
var userCommand = process.argv[2];
var secondUserCommand = process.argv[3];
function concertThis(){
  // node liri.js concert-this <artist/band name here>
  axios.get("https://rest.bandsintown.com/artists/" + secondUserCommand + "/events?app_id=codingbootcamp").then(function(response){
    console.log(secondUserCommand)
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

function spotifyThis(){
  spotify.search({ type: 'track', query: secondUserCommand }, function(err, data) {
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

  function movieThis(){
    axios.get("https://www.omdbapi.com/?t="+ secondUserCommand +"&y=&plot=short&apikey=trilogy").then(function(response){
    // console.log(response)  
    console.log(response.data.Title+"\nThe IMDB movie's rating is: " + response.data.imdbRating + "\nThe Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value + "\nCountry Produced: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors);
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
  
function doIt(){
fs.readFile("random.txt", "utf8", function(error, data){
  if(!error){
    var splited = data.toString().split(',');
    userCommand = splited[0];
    secondUserCommand = splited[1];
  }
  mySwitch(userCommand)
});
}

function mySwitch(userCommand){
switch(userCommand){
case "concert-this":
  if(secondUserCommand==undefined){
secondUserCommand= "ariana grande"
  }
concertThis();
break;
case "spotify-this-song":
    if(secondUserCommand==undefined){
      secondUserCommand= "The Sign Ace of Base"
      } 
  spotifyThis();
  break;
  case "movie-this":
      if(secondUserCommand==undefined){
        secondUserCommand= "Mr. Nobody"
      }
      movieThis();
  break;
  case "do-what-it-says":
  doIt();
  break;
}
}
mySwitch(userCommand)