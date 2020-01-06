const router = require('express').Router()
const createError = require('http-errors')
const Move = require('../../../models/move')

router.post('/', function(req, res, next) {
    const u = req.body
    Move.findOne({ id: u.name })
    .then((r) => {
      if (r) throw new Error('이미 등록되어 있는 이름입니다.')
      return Move.create(u)
    })
    .then((r) => {
      res.send({ success: true })
    })
    .catch((e) => {
      res.send({ success: false, msg: e.message })
    })
});

module.exports = router;
