const express = require('express')
const bodyParser=require("body-parser");
const app = express()
 const { ROLE, users } = require('./data')
 const {authUser, authRole}= require("./basicAuth")
const projectRouter = require('./routes/projects')

app.use(express.json())
app.use(setUser) //for a basic login
app.use('/projects', projectRouter)

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/dashboard',authUser, (req, res) => {
  res.send('Dashboard Page')
})

app.get('/admin',authRole(ROLE.ADMIN), (req, res) => {
  res.send('Admin Page')
})

function setUser(req, res, next) {
    const userId = req.body.userID
    if(!userId){
      return res.send("Please sign in ")
    }
    if (userId) {
      req.user = users.find(user => user.id === userId)
    }
    if(req.user){
      //console.log("login successful");
      next()
    }else{
      return res.send("User not found")
    }
}

app.listen(8000,()=>{
    console.log("server running!!");
})