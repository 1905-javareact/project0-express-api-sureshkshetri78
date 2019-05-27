import express from 'express'
// import { users } from '../state';
import { authorization } from '../middleware/auth.middleware';
import { getAllUsersService, findUserByIdService, findUserByUsernameAndPasswordService,updateUserService } from '../service/utl/users.service';


export const userRouter = express.Router()

userRouter.get('',[authorization(['finance-manager']),async (req, res)=>{
    res.json(await getAllUsersService())
}])
    
    
    //Find Users By Id
userRouter.get('/:id', [authorization(['finance-manager','employee']), async (req, res)=>{
    
    
    let id = +req.params.id//id is string by default, adding the + turns to int
    //let user = users.find((u) =>{ 
        if(isNaN(id)){
            res.sendStatus(400)
        }else {    
    let user = await findUserByIdService(id)
    if(user){
        res.json(user)
    } else {
        res.sendStatus(400)
    } }
}])


//lets make a login endpoint
userRouter.post('/login', async (req, res)=>{
    const {username, password} = req.body
    // const user = users.find(u => u.username === username && u.password === password)
    let user = await findUserByUsernameAndPasswordService(req, username, password)    
    if(typeof(user) === 'string'){
        res.sendStatus(401)
    } else{
        res.send(JSON.stringify(user))// don't send them the session
        //we send them their user object
    }})

    


//updating user

userRouter.patch('/:id', [authorization(['admin']), async(req, res)=>{
    let userid = +req.params.id
    const { username, password, 
            first_name, last_name, email, role} = req.body
    
    if(isNaN(userid)){
        res.sendStatus(400)
    }else{
        let user:any = await updateUserService(userid, username, password, 
            first_name, last_name, email, role)
    if(user){
        let {body} = req
        for(let key in user ){//loop through all fields on user
            if(!body[key]){//if they didn't give us one
              
            }else{
                user[key] = body[key]//else set new field
            }
        }
        res.json(user)
    } else {
        res.sendStatus(400)
    }
}
}])