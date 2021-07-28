const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

require('./config/mongoose')
const Url = require('./models/url')
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
  // 產生隨機路由
  let list = getNumAndChar() //0-9 A-Z a-z
  let pathname = getRandomPath(5, list)
  // 檢查是否存在，沒有的話存進去
  async function storeUrl() {
    let match = await Url.find({ tiny: pathname }).lean() //如果pathname已存在，回傳已存在結果
    // 如果已存在，對象會被存到match陣列中，長度不為0，為真，進行重新取得縮網址
    while (match.length) {
      pathname = getRandomPath(5, list)
      match = await Url.find({ tiny: pathname }).lean()
    }
    // 取到獨一無二的縮網址，之後存到資料庫當中
    await Url.create({ url: url, tiny: pathname })
      .then(() => {
        res.render('index', { tinyURL: req.headers.host + '/' + pathname })
      })
  }
  storeUrl()
})

// 處理縮網址請求
// req 縮網址，回應對照原網址
app.get('/:tinyUrl', (req, res) => {
  const tinyUrl = req.params.tinyUrl
  Url.find({ tiny: tinyUrl })
    .lean()
    .then(data => res.redirect(data[0].url))
})

app.listen(PORT, () => console.log(`app is on http://localhost:${PORT}`))