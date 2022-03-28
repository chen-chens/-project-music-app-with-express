require("dotenv").config();
const SpotifyWebApi = require('spotify-web-api-node');
const express = require("express");
const app = express();

// build an api to let client call for access-token 
// hide secret key in server-side 
/*
    草稿：
    - app.post("自己設計api 路徑，之後 client-side可以call", (req, res)=> {})
    - req: client-side call api 給的 request 內容
    - res: 我(sever-side)決定回傳的內容
*/

// morgan: 紀錄 node 活動日誌
const morgan = require("morgan");
app.use(morgan("tiny"));


const path = require("path");
app.use('/css', express.static(path.resolve(__dirname, "public/css")));
app.use('/js', express.static(path.resolve(__dirname, "public/js")));


// Routes:
app.get('/', (req, res) => {
    res.send("client-side connects to server-side.")
})

app.post('/login', (req, res) => {
    // Client Credential flow
    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
    });
    
    spotifyApi
    .clientCredentialsGrant()
    .then(data => {
        res.json({
            access_token: data.body.access_token,
            expires_in: data.body.expires_in,
            token_type: data.body.token_type
        })
        spotifyApi.setAccessToken(data.body['access_token']);
    }).catch(err => {
        console.log("clientCredentialsGrant err: ", err)
        res.sendStatus(400)
    })
})

// api: getRecommendations
// Get Recommendations Based on Seeds
app.get('/master', (req, res) => {
    spotifyApi.getRecommendations({
      min_energy: 0.4,
      seed_artists: ['6mfK6Q2tzLMEchAr0e9Uzu', '4DYFVNKZ1uixa6SQTvzQwJ'],
      min_popularity: 50
    })
  .then(function(data) {
    let recommendations = data.body;
    console.log(recommendations);
  }, function(err) {
    console.log("Something went wrong!", err);
  });
})


// api: searchTracks
// Set the credentials when making the request
// var spotifyApi = new SpotifyWebApi({
//     accessToken: 'njd9wng4d0ycwnn3g4d1jm30yig4d27iom5lg4d3'
//   });
  
//   // Do search using the access token
//   spotifyApi.searchTracks('artist:Love').then(
//     function(data) {
//       console.log(data.body);
//     },
//     function(err) {
//       console.log('Something went wrong!', err);
//     }
//   );


app.listen(8000, ()=> {
  console.log("server is running...")
})
