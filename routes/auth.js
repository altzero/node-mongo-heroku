var express = require('express');
var router = express.Router();
var MongoUtil = require('../util/mongo');
var AuthUtil = require('../util/auth');

router.get('/', (req, res) => {
  res.redirect(AuthUtil.getAuthorizationURL());
});

router.get('/callback', (req, res) => {

  // Auth store code + refresh token
  const code = req.query.code;
  const options = {
    code
  };

  AuthUtil.getToken(options, (error, token) => {
    if (error) {
      console.error('Access Token Error', error.message);
      return res.json('Authentication failed');
    }

    console.log('The resulting token: ', token);

    return res
      .status(200)
      .token;
  });
});

module.exports = router;
