const express = require('express');
const db = require('../lib/db');
const hlp = require('../lib/helper');
const router = express.Router();

let repo = new db();

/* Working on QCS */
router.route('/qcssite')
.get( (req, res, next) => {
  repo.getAllQCSSite()
  .then( result => {
      res.status(200).json({success: true, data : result})
  }).catch(e => res.status(500).json({success: false, error : e}))
})
.post( (req, res, next) => {
  repo.addQCSSite(req.body)
  .then( result => {
      res.status(200).json({success: true, data : result})
  }).catch(e => res.status(500).json({success: false, error : e}))
})

router.route('/qcssite/:id')
.get( (req, res, next) => {
  repo.getQCSSiteById(req.params.id)
  .then( result => {
      res.status(200).json({success: true, data : result})
  }).catch(e => res.status(500).json({success: false, error : e}))
})
.put( (req, res, next) => {
  repo.delQCSSiteById(req.params.id)
  .then( result => {
      return repo.addQCSSite(req.body)
  })
  .then( result => {
    res.status(200).json({success: true, data : result})
})  
  .catch(e => res.status(500).json({success: false, error : e}))
})
.delete( (req, res, next) => {
  repo.delQCSSiteById(req.params.id)
  .then( result => {
      res.status(200).json({success: true, data : result})
  }).catch(e => res.status(500).json({success: false, error : e}))
})



/* Working on Sequences */
router.route('/sequence')
.get( (req, res, next) => {
  repo.getAllSequences()
  .then( result => {
      res.status(200).json({success: true, data : result})
  }).catch(e => res.status(500).json({success: false, error : e}))
})
.post( (req, res, next) => {
  repo.addSequence(req.body)
  .then( result => {
      res.status(200).json({success: true, data : result})
  }).catch(e => res.status(500).json({success: false, error : e}))
})

router.route('/sequence/:id')
.get( (req, res, next) => {
  repo.getQCSSequenceById(req.params.id)
  .then( result => {
      res.status(200).json({success: true, data : result[0]})
  }).catch(e => res.status(500).json({success: false, error : e}))
})
.put( (req, res, next) => {
  repo.delSequenceById(req.params.id)
  .then( result => {
      return repo.addSequence(req.body)
  })
  .then( result => {
    res.status(200).json({success: true, data : result})
})  
  .catch(e => res.status(500).json({success: false, error : e}))
})
.delete( (req, res, next) => {
  repo.delSequenceById(req.params.id)
  .then( result => {
      res.status(200).json({success: true, data : result})
  }).catch(e => res.status(500).json({success: false, error : e}))
})


router.route('/execFile')
.post( (req, res, next) => {
  res.status(200).json({success: true, data : hlp.exportToFile(req.body)})
  
})

module.exports = router;
