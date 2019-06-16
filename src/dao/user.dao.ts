
import { connectionPool } from '.';
import { sqlUsertojsUSer } from '../util/user-converter';
import { PoolClient } from 'pg';

//we are allowing getAllUsers to be added to our c++ apis
export async function getAllUsers(){
    let client:PoolClient
    //this connection might take some time to be made
    //we do it asynchronously

    //we will get a Promise
    try{
        client = await connectionPool.connect()//await says, wait for the promise to resolve
        //all code beneath the await will become a callback after the await is done
        let result = await client.query('SELECT * FROM "reim_api".users')
        return result.rows.map(sqlUsertojsUSer)
    }catch(err){
        console.log(err); 
        return 'Internal Server'
    } finally{
        client && client.release()
    }
}


export async function findUserById(userid:number){
    let client:PoolClient

    try{
        client = await connectionPool.connect()//await cause this is async
        //this is how to write a paramaterized query
        //we use $1, $2 ... to represent params
        //we put all those params in an array and use it as the second argument
        let result = await client.query(`SELECT * FROM "reim_api".users WHERE user_id = $1`, [userid])
        return sqlUsertojsUSer(result.rows[0])
    } catch(err){//check for what kind of error and send back appropriate custom error
        console.log(err)
        return '500'
    } finally {
        client && client.release()
    }
}


//login

export async function findUserByUsernameAndPassword(username:string, password:string){
    let client:PoolClient

    try{
        client = await connectionPool.connect()
        let query = 'SELECT * FROM "reim_api".users WHERE username = $1 and password = $2'
        let result = await client.query(query, [username, password])
        if(!result.rows[0]){
            return 'User not found'
        }
        return sqlUsertojsUSer(result.rows[0])

    }catch(err){
        console.log(err);
        return 'Internal'
    } finally{
        client && client.release()
    }
}

//update user
export async function updateUser(user_id:number, username: string, password: string, 
    first_name: string, last_name: string, email: string,  role: string[]){
    let client:PoolClient

    try{
        client = await connectionPool.connect()//await cause this is async
        //this is how to write a paramaterized query
        //we use $1, $2 ... to represent params
        //we put all those params in an array and use it as the second argument
        let result = await client.query(`UPDATE "reim_api".users SET username = $1, password = $2, first_name = $3, last_name = $4, email = $5, roles = $6 WHERE user_id = $7  
        returning username, password, first_name, last_name, email, role, user_id`,
        [username, password, first_name, last_name, email, role,user_id])
        return sqlUsertojsUSer(result.rows[0])
    } catch(err){//check for what kind of error and send back appropriate custom error
        console.log(err)
        return '500'
    } finally {
        client && client.release()
    }
}