const router = require('express').Router()
const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const cfg = require('../../../../config')
const User = require('../../../models/users')

const signToken = (_id, id, lv, name, rmb) => {
  return new Promise((resolve, reject) => {
    const o = {
      issuer: cfg.jwt.issuer,
      subject: cfg.jwt.subject,
      expiresIn: cfg.jwt.expiresIn,
      algorithm: cfg.jwt.algorithm
    }
    if (rmb) o.expiresIn = cfg.jwt.expiresInRemember
    jwt.sign({ _id, id, lv, name }, cfg.jwt.secretKey, o, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}

router.post('/in', (req, res, next) => {
  const { id, pwd, remember } = req.body
  if (!id) throw createError(400, '아이디가 없습니다')
  if (!pwd) throw createError(400, '비밀번호가 없습니다')
  if (remember === undefined) throw createError(400, '기억하기가 없습니다.')

  let u = {}
  // lean 을 이용하여 r 을 조작함
  User.findOne({ id }).lean()
    .then((r) => {
      if (!r) throw new Error('존재하지 않는 아이디입니다.')
      const p = crypto.scryptSync(pwd, r._id.toString(), 64, { N: 1024 }).toString('hex')
      if (r.pwd !== p) throw new Error('비밀번호가 틀립니다.')
      delete u.pwd
      u = r
      return signToken(r._id, r.id, r.lv, r.name, remember)
    })
    .then((r) => {
      res.send({ success: true, token: r, user: u })
    })
    .catch((e) => {
      res.send({ success: false, msg: e.message })
      // next(createError(401, e.massage))
    })
})

module.exports = router;
