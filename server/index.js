const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000


console.log(process.env.NODE_ENV);

app.get('/', (req, res) => {
  res.send('Servidor de Devf DevOps funcionando ✅')
})

app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en http://localhost:${PORT}`)
});
