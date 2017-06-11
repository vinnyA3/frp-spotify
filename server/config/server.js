import express from 'express'
import path from 'path'
import morgan from 'morgan'

const port = 8080
const app = express()

app.use(morgan('dev'))

// set view directory and default view engine
app.set('views', path.join(__dirname, '../../public/views'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index', {title: 'Hello World!'})
})

app.listen(port, (err) => {
  if (err) console.log(err)
  else console.log(`Application running on port: ${port}`)
})
