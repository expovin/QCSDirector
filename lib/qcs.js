const fetch = require('node-fetch');
var toJSON = require( 'utils-error-to-json' );
var Datastore = require('nedb');
var qcssites = new Datastore({ filename: './data/qcssites.db' });
var db = require('./db');

const repo = new db();


class QCS {
    
    getMe(data){

        return new Promise((fulfill, reject) =>{
            let url=data.baseUrl+'/api/v1/users/me';
            fetch(url,{
                "headers": {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+data.API_KEY
                }
              })
              .then(res => res.json())
              .then(body => {
                  // Inserisco nel DB
                  fulfill(body)
              })    
              .catch(err => reject(toJSON(err))) 
        })
    }

    getAPIs(data){

        return new Promise((fulfill, reject) =>{
            let url=data.baseUrl+'/api/v1/api-keys';
            fetch(url,{
                "headers": {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+data.API_KEY
                }
              })
              .then(res => res.json())
              .then(body => {
                  // Inserisco nel DB
                  fulfill(body)
              })    
              .catch(err => reject(toJSON(err))) 
        })
    }    

    register(data) {
        return new Promise((fulfill,reject) =>{
            let qcs={"label":data.label, me:{}, keys:{},API_KEY:data.API_KEY,baseUrl:data.baseUrl}
            this.getMe(data)
            .then(body => {
                qcs.me=body;
                console.log(qcs);
                return this.getAPIs(data)
            })
            .then(body => {
                qcs.keys =body;
                console.log(qcs);
                qcssites.loadDatabase(function(err) {
                    qcssites.insert(qcs, (err, doc) => {
                        if(err)
                            reject(toJSON(err));
                        fulfill(doc);
                    });  
                })                
            }).catch(err => reject(err))          
        })
    }

    getItemsBySite(id) {
        return new Promise ((fulfill, reject) => {
            repo.getQCSSiteById(id)
            .then( qcs =>{
                console.log(qcs);
                let url=qcs.baseUrl+'/api/v1/items';
                fetch(url,{
                    "headers": {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+qcs.API_KEY
                    }
                  })
                  .then(res => res.json())
                  .then(body => {
                      let apps = body.data.filter(app => app.resourceType == "app")
                      fulfill(apps)
                  })    
                  .catch(err => reject(toJSON(err)))                 
            })
        })
    }

}

module.exports = QCS;
