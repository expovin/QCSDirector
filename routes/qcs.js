const express = require('express');
const db = require('../lib/db');
const qcs = require('../lib/qcs');
const router = express.Router();

let repo = new db();
let QCS = new qcs();

/* Working on QCS */
router.route('/register')
.post( (req, res, next) => {
    console.log("POST /register")
    console.log(req.body.data);
    QCS.register(req.body.data)
    .then( result => {
      res.status(200).json({success: true, data : result})
  }).catch(e => res.status(500).json({success: false, error : e}))
})

router.route('/items/:id')
.get( (req, res, next) => {
  QCS.getItemsBySite(req.params.id)
  .then( result =>{res.status(200).json({success: true, data : result})})
  .catch(e => res.status(500).json({success: false, error : e}))
})



module.exports = router;
