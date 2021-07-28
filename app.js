const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

require('./config/mongoose')

const PORT = 3000
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('index')
})


app.listen(PORT, () => console.log(`app is on http://${PORT}`))