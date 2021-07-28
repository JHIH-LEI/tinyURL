const functions = {
  getNumAndChar: function () {
    let container = []
    Array.from(Array(10).keys()).forEach(num => container.push(num)) //0-9
    Array.from(Array(26).keys()).forEach(num => {
      num = num + 65 //變成ASCII code (對照到英文字母)
      container.push(String.fromCharCode(num)) //放進大寫A-Z
      container.push(String.fromCharCode(num).toLowerCase())//放進小寫A-Z
    })
    return container
  },
  getRandomPath: function (times, list) {
    let container = ""
    for (let i = 0; i < times; i++) {
      let index = Math.floor(Math.random() * list.length)
      container = container + list[index]
    }
    return container
  }
}

module.exports = functions