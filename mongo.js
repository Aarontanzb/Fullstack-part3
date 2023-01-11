const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://aarontanzb:${password}@cluster0.emcoaxo.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  mongoose
  .connect(url)
  .then((result) => {
    console.log('phonebook:')

    Person.find({}).then(result => {
        result.forEach(person => {
        console.log(person)
        })
        mongoose.connection.close()
    })
  })
  .catch((err) => console.log(err))
  } else if (process.argv.length === 5) {
    mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const note = new Person({
      name: `${name}`,
      number: `${number}`,
    })

    return note.save()
  })
  .then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))
  } 