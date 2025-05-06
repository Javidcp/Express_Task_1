const express = require("express")
const { v4 : uuidv4 } = require("uuid")

const app = express()
const port = 5050;

app.use(express.json())

let users = [];


//      POST
app.post('/users', (req, res) => {
    const { name, email, username } = req.body;

    if (!name || !email || !username) {
        return res.status(400).json({ error: 'Name, Email and UserName are required' })
    }

    const newUser = {
        id: uuidv4(),
        name,
        email,
        username
    }

    users.push(newUser)
    res.status(201).json(newUser)
})


//      GET
app.get('/users', (req, res) => {
    res.json(users);
})
//      GET specifice user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'User Not Found' })
    }
    res.json(user)
})


//      Update
app.put('/users/:id', (req, res) => {
    const { name, email, username } = req.body;
    const userIndex = users.findIndex(u => u.id === req.params.id);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User Not Found' })
    }

    users[userIndex] = {
        ...users[userIndex],
        name: name || users[userIndex].name,
        email: email || users[userIndex].email,
        username: username || users[userIndex].username
    }

    res.json(users[userIndex])
})


//      DELETE
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === req.params.id);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' })
    }

    const deleteUser = users.splice(userIndex, 1);
    res.json({ message: 'User deleted', user: deleteUser[0] })
})




//      Server
app.listen(port, () => console.log(`server is running... on port ${port}`))