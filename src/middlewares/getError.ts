import { ErrorRequestHandler,Request,Response,NextFunction } from "express";


export default async function getError(error:any,req:Request,res:Response,next:NextFunction){
    if(error.code === 'NotFound'){
        return res.status(404).send(error.message)
    }
    console.log(error)
    return res.status(500).send(error)
}