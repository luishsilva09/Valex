import { ErrorRequestHandler,Request,Response,NextFunction } from "express";


export default async function getError(error:any,req:Request,res:Response,next:NextFunction){
    if(error.code === 'NotFound'){
        return res.status(404).send(error.message)
    }
    return res.sendStatus(500)
}