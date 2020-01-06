const router = require('express').Router()
const createError = require('http-errors')  
const Article = require('../../../models/articles')

router.get('/list/:search', (req, res, next) => {
  let search = req.params.search
  if (!search) search = ''
  Article.find({chk: '허가됨'})
    .where('name').regex(search)
    .then(rs => {
      res.send({ success: true, ds: rs, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

router.get('/list', (req, res, next) => {
  Article.find({chk: '허가됨'})
    .then(rs => {
      res.send({ success: true, ds: rs, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

router.get('/read/:_id', (req, res, next) => {
    const _id = req.params._id
    Article.find({_id: _id})
    .then(rs => {
      res.send({ success: true, d: rs, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})



module.exports = router;