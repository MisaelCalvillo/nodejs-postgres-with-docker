const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
  res.send('Servidor funcionando ✅')
})

app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en http://localhost:${PORT}`)
});
