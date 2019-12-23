const mongoose = require('mongoose')
const cfg = require('../../config')

mongoose.set('useCreateIndex', true)
const siteSchema = new mongoose.Schema({
  title: { type: String, default: 'ESCAPE IS HOPE', index: true },
  copyright: { type: String, default: '© 2019 heart is hope' },
  dark: { type: Boolean, default: false }
})

const Site = mongoose.model('Site', siteSchema)

Site.findOne()
  .then(r => {
    if (!r) return Site.create({})
    return Promise.resolve(null)
  })
  .then(r => {
    if (r) console.log(`${r.title} site is created`)
  })
  .catch(e => console.error(e.message))

module.exports = Site
