import express from 'express'
import fs from 'fs'
import path from 'path'
import cors from 'cors'  

const app = express()
app.use(express.json())
app.use(cors())        

const dataPath = path.resolve('mock/hotels.json')
const hotels = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))

app.get('/api/hotels', (req, res) => {
  const city = (req.query.city || '').toLowerCase()
  const items = hotels.filter(h =>
    h.location.toLowerCase().includes(city) ||
    h.name.toLowerCase().includes(city) ||
    city === ''
  )
  res.json(items)
})

app.get('/api/hotels/:id', (req, res) => {
  const h = hotels.find(x => x.id === req.params.id)
  if (!h) return res.status(404).json({ error: 'not found' })
  res.json(h)
})

app.post('/api/bookings', (req, res) => {
  const ref = 'BK' + Math.random().toString(36).slice(2, 9).toUpperCase()
  res.json({ ref })
})

app.listen(5000, () => console.log('Mock API running on http://localhost:5000'))
