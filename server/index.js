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
  res.send('Servidor de Devf DevOps funcionando y con Github Actions 🚀, si esto pasa tuvimos éxito')
})

app.get('/ruta2', (req, res) => {
  res.send('Estas en al ruta 2')
})


app.get('/test', (req, res) => {
  res.send('Ruta de prueba')
})

app.post('/login', (req, res) => {

  return res.status(200).json({
    userToken: '12345',
  });
});

app.get('/user', (req, res) => {
  console.log(req.headers)
  if (req.headers.authorization !== 'Bearer 12345') {
    return res.status(404).json({ 
      error: 'No tienes permiso :('
    })
  }
  
  return res.status(200).json({
    name: 'Misael', 
    age: 25
  })
});

app.get('/error', (req, res) => {
  throw new Error();
});

app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en http://localhost:${PORT}`)
});
