# Hexed Visualizer

Hexed Visualizer is an audio visualizer built for spotify. It's stack includes Node, Express, MySQL, and React. 

To view the deployed application, please visit https://adventurer-hexed.herokuapp.com/

To run a local copy of this application, please ensure you have a spotify developer account, and then follow these simple instructions:

- Clone this repository
- Open the cloned respoitory and run `yarn install` 
- Open https://developer.spotify.com/dashboard and log in
- Create a new app on your spotify developer dashboard
    - Make note of the Client ID and Client Secret, you will need these shortly
- Edit your new apps' settings and add the following Redirect URIs:
    - `http://localhost:5000/auth/spotify/callback`
    - `http://localhost:3000/auth/spotify/callback`
- Open the config folder and create a file named `dev.js`
- Open dev.js and add the following information:
```javascript
    module.exports = {
        spotifyClientID: "SpotifyClientIDHere",
        spotifySecret: "SpotifyClientSecretHere",
        cookieKey: "RandomStringOfYourChoiceHere"
    };
```
- Run `yarn run dev` to start the development servers
