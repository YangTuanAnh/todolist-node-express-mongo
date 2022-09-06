const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todolist'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client =>
    {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', (request, response) =>
{
    db.collection('tasks').find().toArray()
        .then(data =>
        {
            db.collection('tasks').countDocuments({ completed: false })
                .then(itemsLeft =>
                {
                    response.render('index.ejs', { items: data, left: itemsLeft })
                })
        })
        .catch(error => console.error(error))
})

app.post('/addTask', (request, response) =>
{
    db.collection('tasks').insertOne({
        task: request.body.task,
        completed: false
    })
        .then(result =>
        {
            console.log('Task Added')
            response.redirect('/')
        })
        .catch(error => console.error(error))
})

app.put('/completeTask', (request, response) =>
{
    db.collection('tasks').updateOne({ task: request.body.task }, {
        $set: {
            completed: request.body.completed
        }
    })
        .then(result =>
        {
            console.log(result)
            response.json('Task Updated')
        })
        .catch(error => console.error(error))

})

app.delete('/deleteTask', (request, response) =>
{
    db.collection('tasks').deleteOne({ task: request.body.removedTask })
        .then(result =>
        {
            //console.log(result)
            response.json('Task Deleted')
        })
        .catch(error => console.error(error))

})

app.listen(process.env.PORT, () =>
{
    console.log(`Server running on port ${process.env.PORT}`)
})