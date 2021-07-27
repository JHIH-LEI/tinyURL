const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
  path: {
    type: String,
    required: true
  },
  tiny: String
})

module.exports = mongoose.model('Url', urlSchema)