const express = require('express')
const router = express.Router()
const Url = require('../../models/url')
const { getNumAndChar, getRandomPath } = require('../../tools/helper')
router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  // 獲取表單傳來的網址
  const { url } = req.body
  // 如果網址已存在，就返回已建立好的縮網址
  isExist()
  async function isExist() {
    const existUrl = await Url.find({ url: url }).lean()
    //如果網址存在
    if (existUrl.length) {
      res.render('index', { tinyURL: req.headers.host + '/' + existUrl[0].tiny })
    } else {
      // 如果網址不存在，產生隨機路由
      let list = getNumAndChar() //0-9 A-Z a-z
      let pathname = getRandomPath(5, list)
      await storeUrl()
      // 檢查路由是否存在，沒有的話存進去
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
            // 將縮網址傳到主頁
            res.render('index', { tinyURL: req.headers.host + '/' + pathname })
          })
      }
    }
  }
})

// 處理縮網址請求
// req 縮網址，回應對照原網址
router.get('/:tinyUrl', (req, res) => {
  const tinyUrl = req.params.tinyUrl
  Url.find({ tiny: tinyUrl })
    .lean()
    .then(data => res.redirect(data[0].url))
})

module.exports = router