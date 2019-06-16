import express from 'express'

import bodyParser from 'body-parser'
import { loggingMiddleware } from './middleware/logging.middleware';
import { sessionMiddleware } from './middleware/session.middleware';
import { userRouter } from './routers/user-router'
import { reimbursementsRouter } from './routers/reimbursement-router';


let cors = require('cors')
 


const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true// some legacy browsers (IE11, various SmartTVs) choke on 204
  }

))

app.use(loggingMiddleware)

app.use(bodyParser.json())

app.use(sessionMiddleware)
app.get('/', (req, res)=>{
    res.json('Try making a request to project 0')
})


app.use('/users', userRouter)
app.use('/reimbursements', reimbursementsRouter)


app.listen(9050, ()=>{
    console.log('Project 0 started');  
})