# The LiRi Bot: The Language Interpretation and Recognition Interface

## What problem does the app solve?

This Command Line Interface app takes in certain arguments as parameters from the user, and displays concert, song, or movie information (depending on what the user queries). In addition, a text file can be used as input for the application.

## App Organization

The app utilizes the fs module to read from a text file, the axios module for the tv show/movie api calls, and a node spotify api library for the spotify api calls.

## How to run the app

You can run the app by typing in ``node liri.js [insert concert/spotify/movie param here] [insert name of artist/song/movie here]``, where ``[insert concert/spotify/movie param here]`` can be ``concert-this``, ``spotify-this-song``, or ``movie-this``; ``[insert name of artist/song/movie here]`` can be the artist name to find their concerts, song name to find spotify info, or movie name to find more info, respectively.