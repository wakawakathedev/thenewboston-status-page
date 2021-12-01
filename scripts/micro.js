const {send} = require('micro')

module.exports = async (req, res) => {
  const statusCode = 200
  const data = { value: "ok" }
  
  // const statusCode = 500
  // const data = { error: 'Custom error message' }
  send(res, statusCode, data)
}
