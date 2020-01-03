const mongoose = require('mongoose')
const cfg = require('../../config')

mongoose.set('useCreateIndex', true)
const moveSchema = new mongoose.Schema({
  title: { type: String, default: '', index: true },
  content: { type: String, default: '' }
})

module.exports = mongoose.model('Move', moveSchema)