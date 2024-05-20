import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { TasksServices } from "../services/tasks.services";

@injectable()
export class TasksControllers {

    constructor(@inject("TasksServices") private tasksServices : TasksServices) {    
    }

    async createTask(req : Request, res : Response) : Promise<Response> {
        const response = await this.tasksServices.createTask(req.body);

        return res.status(201).json(response);
    }

    async getTasks(req : Request, res : Response) : Promise<Response> {
        const response = await this.tasksServices.getTasks(req.query.category as string);

        return res.status(200).json(response);
    }

    async getById(req : Request, res : Response) : Promise<Response> {
        const response = await this.tasksServices.getById(+req.params.id);

        return res.status(200).json(response);
    }

    async updateTask(req : Request, res : Response) : Promise<Response> {
        const response = await this.tasksServices.updateTask(+req.params.id, req.body);

        return res.status(200).json(response);
    }

    async deleteTask(req : Request, res : Response) : Promise<Response> {
        await this.tasksServices.deleteTask(+req.params.id);

        return res.status(204).json();
    }
}