var Datastore = require('nedb');
var db = new Datastore({ filename: '../data/sequences.db' });

var vince = {
    name: 'Vince',
    twitter: '@expovin'
};

/*
db.insert(vince, function(err, doc) {
    console.log('Inserted', doc.name, 'with ID', doc._id);
});
*/



db.loadDatabase(function(err) {

    db.insert(vince, function(err, doc) {
        console.log('Inserted', doc.name, 'with ID', doc._id);
    });

    db.find({}, function(err, doc) {
        console.log('Found users:');
        console.log(doc);
    });
});