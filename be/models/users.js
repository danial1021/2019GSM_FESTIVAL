const mongoose = require('mongoose')
const crypto = require('crypto')
const cfg = require('../../config')

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
const userSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  age: { type: Number, default: 1 },
  id: { type: String, default: '', unique: true, index: true },
  pwd: { type: String, default: '' },
  grade: { type: Number, default: ''},
  class: { type: Number, default: ''},
  num: { type: Number, default: ''},
  lv: { type: Number, default: 2 }, //add
  img: {type: String, default: 'https://cdn.discordapp.com/attachments/645787220464369670/663586887595851780/bd1fd42b-06ed-48ef-b1b5-f0c680c6be82.jpg'}
})

const User = mongoose.model('User', userSchema)
// User.collection.dropIndexes({ name: 1})

User.findOne({ id: cfg.admin.id })
  .then((r) => {
    // console.log(r)
    if (!r) return User.create({ id: cfg.admin.id, pwd: cfg.admin.pwd, name: cfg.admin.name, lv: 0 })
    // if (r.lv === undefined) return User.updateOne({ _id: r._id }, { $set: { lv: 0, inCnt: 0 } }) // 임시.. 관리자 계정 레벨 0으로..
    return Promise.resolve(r)
  })
  .then((r) => {
    if (r.pwd !== cfg.admin.pwd) return Promise.resolve(null)
    console.log(`admin:${r.id} created!`)
    const pwd = crypto.scryptSync(r.pwd, r._id.toString(), 64, { N: 1024 }).toString('hex')
    return User.updateOne({ _id: r._id }, { $set: { pwd } })
  })
  .then(r => {
    if (r) console.log('pwd changed!')
  })
  .catch((e) => {
    console.error(e.message)
  })

module.exports = User
