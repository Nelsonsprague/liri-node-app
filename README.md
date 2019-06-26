<h1><center> Liri Bot!</h1>

<h2><center>It does stuff!</h2>
<h3>Helps you find information about movies, conerts, songs, and has a bit that will read from a text file and do what you say (to a point) </h3>

Some files are displayed some not to keep the api keys safe but it is linked on the back end so if you run installs listed in the requires you can load it from other places. 

type in node liri.js:
* movie-this _movie title_ //to get:
    * Title
    * IMDB Rating
    * Rotten Tomatoes Rating
    * Country Produced
    * Plot
    * Actors 
* conert-this _artist name_ //to get:
    * Artist Name
    * Venue Name
    * City Name
    * Performance Date
* spotify-this-song _song name_ //to get:
    * Artist Name
    * Song Name
    * Spotify Preview Link
    * Album Name
* do-what-it-says // it will:
    * Read off the attached txt file
    * Run the corrorsponding function to the code from the txt (movie, concert, spotify)
    * Feed the search with info provided
    * Display as listed above


Clearly list the technologies used in the app
* Node runs the java file in bash
* fs allows the bot to access the txt file
* axios used to access OMDB and Bands in town api links
* spotify api allowed us to search for song names
* bands in town api allowed us to search for touring bands
* omdb api allowed us to search the movie database
* moment allowed us to format dates

I types all the keys that did all the stuffs ENJOY!:

![Liri Gif](/assets/giphy.gif)