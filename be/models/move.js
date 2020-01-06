const mongoose = require('mongoose')
const cfg = require('../../config')

mongoose.set('useCreateIndex', true)
const moveSchema = new mongoose.Schema({
  location: { type: String, default: '', index: true },
  name: { type: String, default: '' },
  reason: { type: String, default: '' },
  time1: { type: String, default: '' },
  time2: { type: String, default: '' }
})

module.exports = mongoose.model('Move', moveSchema)