const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const dotenv  = require('dotenv')
const routes = require('./routes.js')
const cors = require('cors')
const PORT = process.env.PORT || 4000

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, ()=>(
  console.log("DB Connected")
))


app.use(express.json())
app.use(cors())
app.use('/', routes)
app.listen(PORT, () => {
  console.log(`Server is running /`);
});