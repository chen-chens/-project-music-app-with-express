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
app.use('/css', express.static(path.resolve(__dirname, "public/css")))
app.use('/js', express.static(path.resolve(__dirname, "public/js")))


// body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


/* Routes */
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
    }).catch(err => {
        res.sendStatus(400)
        res.send(err)
    })
})

// api: getRecommendations
app.get('/master/getRecommendations', (req, res) => {
  // console.log("req.query: ", req.query);
  // console.log("token: ", req.headers.authorization.split(' ')[1]);
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.headers.authorization.split(' ')[1]
  });

  spotifyApi
    .getRecommendations(req.query)
    .then((data) => {
      res.json(data.body)
    }).catch(err => {
      console.log("getRecommendations err: ", err)
      res.sendStatus(400)
      res.send({
        message: err,
        status: 400
      })
    })
})


// api: searchTracks
app.get('')
  spotifyApi.searchTracks('artist:Love').then(
    function(data) {
      console.log(data.body);
    },
    function(err) {
      console.log('Something went wrong!', err);
    }
);

app.listen(8000, ()=> {
  console.log("server is running...")
})
