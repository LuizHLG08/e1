import { NextFunction, Request, Response } from "express";
import { IReqSchemas } from "../interfaces/schemas.interfaces";
import { injectable } from "tsyringe";
import { AnyZodObject } from "zod";

@injectable()
export class VerifyRequestMiddlewares {
    static execute(schema : AnyZodObject) {

        return async (req : Request, res : Response, next : NextFunction) => {
            req.body = await schema.parseAsync(req.body);
           
            next();
        }

    }
}