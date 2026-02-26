require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected ✅'))
  .catch(err => console.log(err))

// Routes
const pageRoutes = require('./routes/pageRoutes')
app.use('/api/pages', pageRoutes)

// Test Route
app.get('/', (req, res) => {
  res.json({ message: 'NGO API Running 🚀' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))