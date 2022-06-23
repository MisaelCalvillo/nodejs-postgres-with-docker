const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000


console.log(process.env.NODE_ENV);

function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  throw new Error();
  res.status(500)
  res.render('error', { error: err })
}

app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Servidor de Devf DevOps funcionando y con Github Actions 🚀. CI / CD test 3')
})


app.get('/test', (req, res) => {
  res.send('Ruta de prueba')
})

app.get('/error', (req, res) => {
  throw new Error();
});

app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en http://localhost:${PORT}`)
});
