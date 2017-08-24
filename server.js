var express = require("express");
var bodyParser = require("body-parser");
var mongoUtil = require('./mongo_util');
var ObjectID = require( 'mongodb' ).ObjectID;

var app = express();
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

mongoUtil.connectToServer( function( err ) {
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log('App now running on port', port);
  });
});


// Generic error handler
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}


app.get('/', function(request, response) {
  response.render('pages/index');
});

// CONTACTS API ROUTES BELOW

/*  "/api/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/api/contacts", function(req, res) {
  var db = mongoUtil.getDb();
  db.collection(mongoUtil.getCollectionName()).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/contacts", function(req, res) {
  var newContact = req.body;
  newContact.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {
    var db = mongoUtil.getDb();
    db.collection(mongoUtil.getCollectionName()).insertOne(newContact, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new contact.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});



app.get("/api/upsert/:id", function(req, res) {

  var contact_id = req.params.id;
  var db = mongoUtil.getDb();
  db.collection(mongoUtil.getCollectionName()).findOneAndUpdate({ contact_id: contact_id },
                                                      { $set: { last_read: new Date() } },
                                                      { upsert: true, new: true },

    function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to get contact");
      } else {
        res.status(200).json(doc);
      }
    }
  );
});

/*  "/api/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/api/contacts/:id", function(req, res) {
  var db = mongoUtil.getDb();
  db.collection(mongoUtil.getCollectionName()).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/contacts/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  var db = mongoUtil.getDb();
  db.collection(mongoUtil.getCollectionName()).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update contact");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/contacts/:id", function(req, res) {
  var db = mongoUtil.getDb();
  db.collection(mongoUtil.getCollectionName()).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete contact");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
