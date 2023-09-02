const express = require('express')
const router = require('./routes/user-router')
const PORT = process.env.PORT || 3001

const app = express()

app.use(express.json())
app.use('/api', router)


app.listen(PORT, ()=> console.log(`Server run on port: ${PORT}`))