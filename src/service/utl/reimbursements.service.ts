import { findReimbursementByStatus, findReimbursementByUser, submitReimbursement, updateReimbursement, getAllReimbursements } from "../../dao/reimbursement.dao";
// import { Request } from "express-serve-static-core";



export async function getAllReimbursementsService(){
    return await getAllReimbursements()
}


//Find Reimbursements By Status/statusId
export async function findReimbursementByStatusService(status_id:number){
    return await findReimbursementByStatus(status_id)
}


//Find Reimbursements By User/userId
export async function findReimbursementByUserService(user_id:number){
    return await findReimbursementByUser(user_id)
}

//Submit Reimbursement
export async function submitReimbursementService(body:any){
    return await submitReimbursement(body)
}


//Update Reimbursement
export async function updateReimbursementService(reimbursement_id:number, author: number, amount: number, 
    date_submitted: number, date_resolved: number, description: string, resolver: number, status: number, type: number){
    return await updateReimbursement(reimbursement_id, author, amount, date_submitted, date_resolved, 
                                     description, resolver, status, type)
}