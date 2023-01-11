const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

morgan.token('person', (req) => req.method === 'POST' ? JSON.stringify(req.body) : '')

app.use(express.json())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

app.use(cors())

app.use(express.static('build'))

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        res.json(person)
    })
})

app.get('/api/info', (req, res) => {
    const persons = Person.find({})
    info = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `
    res.send(info)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    
    if (!body.number || !body.name) {
        return res.status(400).json({
            error: 'name or number is missing'
        })
    }

    const person = new Person({
        id: Math.floor((Math.random() * 100000) + 1),
        name: body.name,
        number: body.number,
    })

    person.save().then(result => {
        res.json(person)
      })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on ${PORT}`)