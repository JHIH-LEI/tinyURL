const mongoose = require('mongoose')
const MONGODB_URI = process.env.MOGODB_URI || 'mongodb://localhost:27017/tinyurl'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection

db.once('open', () => console.log('mongodb connected!'))
db.on('error', () => console.error.bind(console, 'connection error:'))

module.exports = db