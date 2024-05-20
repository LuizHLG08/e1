import { injectable } from "tsyringe";
import { CreateTask, Task, UpdateTask } from "../interfaces/tasks.interfaces";
import { prisma } from "../database/prisma";


@injectable()
export class TasksServices {

    async createTask(data: CreateTask) : Promise<Task> {
        return await prisma.task.create({
            data : data,
        }) as Task;
    }

    async getTasks(category? : string) : Promise<Task[]> {

        if(category) {
            return await prisma.task.findMany({
                where : {category : {name : {contains : category, mode : "insensitive"}}},
                include : {category : true},
            }) as Task[];
        }

        return await prisma.task.findMany({include : {category : true}}) as Task[];
    }

    async getById(id : number) : Promise<Task> {

        return await prisma.task.findFirst({
            where: {id : id},
            include : {category : true}
        }) as Task;
    }

    async updateTask(id : number, data : UpdateTask) : Promise<Task> {

        return await prisma.task.update({
            where : {id : id},
            data : data,
        }) as Task;
    }

    async deleteTask(id : number) : Promise<void> {
        
        await prisma.task.delete({
            where: {id : id}
        });
    }
}