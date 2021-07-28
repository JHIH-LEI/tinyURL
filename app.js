const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

require('./config/mongoose')
const { getNumAndChar, getRandomPath } = require('./tools/helper')

const PORT = 3000
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  // 獲取表單傳來的網址
  const { url } = req.body
  res.send(url)
  // 產生隨機路由
  let list = getNumAndChar() //0-9 A-Z a-z
  let pathname = getRandomPath(5, list)
  // 檢查是否存在，沒有的話存進去

})

// 處理縮網址請求
// req 縮網址，回應對照原網址


app.listen(PORT, () => console.log(`app is on http://${PORT}`))

