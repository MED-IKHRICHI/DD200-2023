const express = require('express');
const app = express();
const port=3100;
app.listen(port,()=>{
    console.log('start ...')
})

app.use(express.json())

const users = require('./users.json')
/* All */
app.get('/', (req, res)=> {
    res.status(200).json(users)
})

/* Find */
app.get('/:id', (req, res)=> {
    const id = req.params.id
    const user = users.find((user)=> user.id == id)
    if(user){
        res.status(200).json(user)
    } else {
        res.status(200).json({"message": "not Found"})
    }
})

/* Insert */
app.post('/', (req, res)=> {
    const user = req.body
    user.id = users[users.length-1].id +1
    users.push(user)
    console.log(user)
    res.status(200).json(users)
})

/* Update */
app.put('/:id', (req, res) => {
    const id = req.params.id
    const user = req.body
    const index = users.findIndex((user)=> user.id == id)
    console.log(id,user, index)

    if(index == -1 )
        res.status(200).json({"message": "not Found"})
    user.id = id
    users[index] = user
    res.status(200).json(user)
})

/* Delete */
app.delete('/:id', (req, res)=>{
    const id=req.params.id
    const index=users.findIndex((user)=> user.id == id)
    if(index == -1 )
        res.status(200).json({"message": "not Found"})
        users.splice(index,1)
        res.status(200).json(users)
})

/* search */
app.get('/search/:search', (req, res) => {
    const search = req.params.search;
    const usersData = users.filter((user)=>
        user.nom.indexOf(search) != -1 || user.email.indexOf(search) != -1
    )
    res.status(200).json(usersData)
})