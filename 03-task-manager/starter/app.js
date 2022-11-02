const express = require('express')
const app = express()

const PORT = 3000

app.get('/hello', (req, res) => {
  res.send('Task Manager App')
})

app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))