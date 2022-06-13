const express = require('express')
const app = express()
const cors = require('cors')
const { response } = require('express')
const PORT = 8000

app.use(cors())
app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// app.get('/', (req,res) => {
//     res.sendFile(__dirname + '/index.html')
// })

app.get('/api/:persons', (req,res) => {
    res.json(persons)
})
app.get('/api/persons/:num', (req,res) => {
  const numID = +(req.params.num)
  console.log(numID);
  let resource = persons.find(x => x.id == numID)
  console.log(resource);
  if(resource){
    res.json(resource)
  }
  else{
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req,res) => {
  const numID = Number(req.params.id)
  persons = persons.filter(x => x.id != numID)
  res.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(n => n.id)) : 0
return maxId + 1
}

app.post('/api/persons', (req,res) => {
const body = req.body
// if (!body.content) {
//   return res.status(400).json({ 
//     error: 'content missing' 
//   })
// }
let entry ={
  id: generateId(),
  name: body.name,
  number: body.number
}
persons.push(entry)
if(!body.name || !body.number){
  return res.status(400).json({
    error: 'content missing'
  })
}
if (persons.find(x => x.id == body.name)){
  return res.status(400).json({
    error: 'name must be unique'
  })
}

res.json(entry)
})


app.get('/info', (req,res) => {
    const currDate = new Date()
    res.send(`<h2>Phonebook has info for ${persons.length} people</h2> <h2>${currDate}</h2>`)
    // res.sendFile(__dirname + '/info.html')
    // res.json(persons)
})

app.listen(process.env.PORT || PORT, () => {
    console.log('RUN YOU RUNNING RUN');
}) 