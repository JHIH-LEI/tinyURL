const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

const PORT = 3000
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.listen(PORT, () => console.log(`app is on http://${PORT}`))