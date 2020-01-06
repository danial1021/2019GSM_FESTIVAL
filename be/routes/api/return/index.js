const router = require('express').Router()
const createError = require('http-errors')  
const Article = require('../../../models/articles')

router.get('/list', (req, res, next) => {
    Article.find()
    .where('chk').regex('허가됨')
    .then(rs => {
      res.send({ success: true, ds: rs, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

module.exports = router;