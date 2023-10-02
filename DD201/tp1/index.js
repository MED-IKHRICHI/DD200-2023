const express = require('express')
const app = express()
const port = 3030 ;
app.listen(port , () => {
    console.log("start")
})

app.use(express.json())

const users =[
    {id:1,name:'chihaby',prenom:'mohamed'},
    {id:2,name:'merbah',prenom:'abdellah'},
    {id:3,name:'aznag',prenom:'yassine'},
    {id:4,name:'AZAQUI',prenom:'soukaina'},
]

app.get('/',(req, res)=> {
    res.status(200).json(users)
})

app.get('/:id',(req, res) => {
    const id = req.params.id
    const userFind = users.find((user)=> user.id == id)
    //res.status(200).json(userFind || {message: "Not found"})
    if(userFind)
        res.status(200).json(userFind)
    else
        res.status(300).json({message: "Not found"})
})
// insert
app.post('/', (req, res)=> {
    const id = users.length + 1
    const newUser = req.body;
    newUser.id  = id
    users.push(newUser)
    res.status(200).json(users)
})
//update
app.put('/:id', (req, res) => {
    const id = req.params.id
    const newUser = req.body
    const user = users.find((user)=> user.id == id)
    if(user) {
        const index = users.indexOf(user)
        user.name = newUser.name
        user.prenom = newUser.prenom
        users[index] = user;
        res.status(200).json(user)
    } else {
        res.status(300).json({message: "Not found"})
    }
})

// delete
app.delete('/:id', (req, res) => {
    const id = req.params.id
    const user = users.find((user) => user.id == id)
    if(user) {
        const index = users.indexOf(user)
        users.splice(index, 1)
        res.status(200).json(users)
    } else {
        res.status(300).json({message: "Not found"})
    }
})
