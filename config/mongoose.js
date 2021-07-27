const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/tinyurl', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection

db.once('open', () => console.log('mongodb connected!'))
db.on('error', () => console.error.bind(console, 'connection error:'))

module.exports = db