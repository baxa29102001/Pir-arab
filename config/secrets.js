const dotenv = require('dotenv')

dotenv.config()

const { MONGO_URI, JWT_SECRET } = process.env

module.exports = { MONGO_URI, JWT_SECRET }