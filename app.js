const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes')

require('./config/mongoose')

const PORT = 3000
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'), bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(PORT, () => console.log(`app is on http://localhost:${PORT}`))