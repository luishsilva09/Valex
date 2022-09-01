import {Request,Response,NextFunction } from "express";


export function schemaValidate(schema:any) {
    return (req:Request, res:Response, next:NextFunction) => {
            const data = req.body;
            const { error } = schema.validate(data,{convert:false});
            if (error) throw { code:'invalid',message: error.details[0].message };
            next();
        
}
}