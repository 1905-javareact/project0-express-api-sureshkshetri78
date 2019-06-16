import { Reimbursement } from "../models/reimbursement";
import { ReimbursementDTO } from "../dtos/reimbursement.dto";

export function sqlReimbursementTojsReimbursement(sqlreimbursement:ReimbursementDTO):Reimbursement{
    return new Reimbursement(sqlreimbursement.reimbursement_id, sqlreimbursement.author, 
        sqlreimbursement.amount, sqlreimbursement.date_submitted,
        sqlreimbursement.date_resolved, sqlreimbursement.description, 
        sqlreimbursement.resolver, sqlreimbursement.status, 
        sqlreimbursement.type)
}