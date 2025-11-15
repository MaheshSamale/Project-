const express = require('express');
const cors = require('cors')
const jwt = require('jsonwebtoken');


const authorizeUser = require('./utils/authuser')
const userRouter = require('./routers/users')
const organizationsRouter = require('./routers/organizations')

const app = express();


app.use('/uploads', express.static('uploads'));
app.use(cors())
app.use(express.json())
app.use(authorizeUser) 
app.use('/users',userRouter)
app.use('/organizations',organizationsRouter)

app.get('/',(req,res)=>{
    res.send('Hello');
})

const port = 4000;

app.listen(port,'localhost',()=>{
    console.log(`Server Started on port : ${port}`);
});

