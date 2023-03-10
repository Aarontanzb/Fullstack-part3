const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')
const { findByIdAndDelete, findByIdAndRemove, findByIdAndUpdate, count } = require('./models/person')

morgan.token('person', (req) => req.method === 'POST' ? JSON.stringify(req.body) : '')

app.use(express.json())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

app.use(cors())

app.use(express.static('build'))

app.get('/api/persons', (req, res, next) => {
    Person.find({})
    .then(persons => {
        res.json(persons)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
    .then(person => {
        if (person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.get('/api/info', (req, res) => {
    Person.countDocuments((err, count) => {
        if (count) {
            info = `
            <p>Phonebook has info for ${count} people</p>
            <p>${new Date()}</p>
            `
            res.send(info)
        } else {
            res.status(404).end()
        }
    })
    })

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
      .then(result => {
        res.status(204).end()
      })
      .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save()
    .then(result => {
        res.json(person)
      })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const { name, number } = req.body

    Person.findByIdAndUpdate(
        req.params.id, 
        { name, number }, 
        { new: true , runValidators: true, context: 'query' })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on ${PORT}`)