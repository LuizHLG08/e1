import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";
import { injectable } from "tsyringe";

@injectable()
export class TasksMiddlewares {

    async isCategoryIdValid(req : Request, res : Response, next : NextFunction) {
        if(req.body.categoryId) {
           const category = await prisma.category.findFirst({
            where : {id : +req.body.categoryId}
           });

           console.log(category)

           if(!category) {
            throw new AppError(403, "Category does not exists");
           } 
        }
        next();
    }

    async isTaskIdValid(req : Request, res : Response, next : NextFunction) {
        const verify = await prisma.task.findFirst({
            where : {id : +req.params.id}
        });

        if(!verify) {
            throw new AppError(404, "Task not found");
        }
        next();
    }
}