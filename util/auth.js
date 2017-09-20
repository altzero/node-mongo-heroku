const oauth2 = require('simple-oauth2').create({
  client: {
    id: process.env.OAUTH_CLIENT_ID,
    secret: process.env.OAUTH_CLIENT_SECRET
  },
  auth: {
    tokenHost: process.env.OAUTH_HOST,
    authorizePath: process.env.OAUTH_AUTH_PATH,
    tokenPath:  process.env.OAUTH_TOKEN_PATH
  }
});

module.exports = {
  getToken: function( options, callback ) {
    oauth2.authorizationCode.getToken(options, (error, result) => {
      if (error) {
        console.error('Access Token Error', error.message);
        return callback( error );
      }

      console.log('The resulting token: ', result);
      const token = oauth2.accessToken.create(result);

      return callback( token );
    });
  },

  getAuthorizationURL: function() {
    return oauth2.authorizationCode.authorizeURL({
      redirect_uri: process.env.OAUTH_REDIRECT_URL,
      scope: process.env.OAUTH_SCOPE,
      state: '3/!~(#0YUNJS@3/!~(#'
    });
  },

};
