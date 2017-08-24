var MongoClient = require( 'mongodb' ).MongoClient;
var _db;

module.exports = {
  connectToServer: function( callback ) {
    MongoClient.connect( process.env.MONGODB_URI, function( err, db ) {
      _db = db;
      return callback( err );
    });
  },

  getDb: function() {
    return _db;
  },

  getCollectionName: function() {
    return 'default';
  }
};
