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

router.put('/:_id', (req, res, next) => {
    if (!req.user._id) throw createError(403, '게시물 수정 권한이 없습니다')
  const _id = req.params._id

  Article.findById(_id)
    .then(r => {
      if (!r) throw new Error('게시물이 존재하지 않습니다')
      if (!r._user) throw new Error('손님 게시물은 수정이 안됩니다')
      if (r._user.toString() !== req.user._id) throw new Error('본인이 작성한 게시물이 아닙니다')
      return Article.findByIdAndUpdate(_id, { $set: req.body}, { new: true })
    })
    .then(r => {
      res.send({ success: true, d: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})



module.exports = router;