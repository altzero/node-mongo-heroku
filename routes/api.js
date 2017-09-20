var express = require('express');
var router = express.Router();
var MongoUtil = require('../util/mongo');

router.get('/sample', function (req, res) {
  var db = MongoUtil.getDb();
  db.collection(MongoUtil.getCollectionName()).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, 'Failed to get sample.');
    } else {
      res.status(200).json(docs);
    }
  });
});

module.exports = router;
