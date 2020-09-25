var Datastore = require('nedb');
var sequences = new Datastore({ filename: './data/sequences.db' });
var qcssites = new Datastore({ filename: './data/qcssites.db' });

class REPO {

    addQCSSite(site) {       
        return new Promise( (fulfill, reject)=>{
            qcssites.loadDatabase(function(err) {
                qcssites.insert(site, (err, doc) => {
                    if(err)
                        reject(err);
                    fulfill(doc);
                });  
            })
        })
    }

    getAllQCSSite() {
        console.log("Getting all QCSSite");
        return new Promise( (fulfill, reject) =>{
            qcssites.loadDatabase(function(err) {
                qcssites.find({}, (err,doc) =>{
                    if(err)
                        reject(err);
                    fulfill(doc);
                })
            })

        })
    }
    
    getQCSSiteById(Id) {
        return new Promise( (fulfill, reject) =>{            
            qcssites.loadDatabase(function(err) {
                qcssites.findOne({_id:Id}, (err,doc) =>{
                    if(err)
                        reject(err);
                    fulfill(doc);
                })
            })

        })
    }

    delQCSSiteById(Id) {
        console.log("Deleting "+Id)
        return new Promise( (fulfill, reject) =>{
            qcssites.loadDatabase(function(err) {
                qcssites.remove({_id:Id}, (err,doc) =>{
                    if(err)
                        reject(err);
                    fulfill(doc);
                })
            })

        })
    }    


    addSequence(site) {       
        return new Promise( (fulfill, reject)=>{
            sequences.loadDatabase(function(err) {
                sequences.insert(site, (err, doc) => {
                    if(err)
                        reject(err);
                    fulfill(doc);
                });  
            })
        })
    }

    getAllSequences() {
        console.log("Getting all QCSSite");
        return new Promise( (fulfill, reject) =>{
            sequences.loadDatabase(function(err) {
                sequences.find({}, (err,doc) =>{
                    if(err)
                        reject(err);
                    fulfill(doc);
                })
            })

        })
    }
    
    getQCSSequenceById(Id) {
        return new Promise( (fulfill, reject) =>{
            sequences.loadDatabase(function(err) {
                sequences.find({_id:Id}, (err,doc) =>{
                    if(err)
                        reject(err);
                    fulfill(doc);
                })
            })

        })
    }

    delSequenceById(Id) {
        console.log("Deleting "+Id)
        return new Promise( (fulfill, reject) =>{
            sequences.loadDatabase(function(err) {
                sequences.remove({_id:Id}, (err,doc) =>{
                    if(err)
                        reject(err);
                    fulfill(doc);
                })
            })

        })
    }       

}

module.exports = REPO;