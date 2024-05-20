import { Router } from "express";
import { container } from "tsyringe";
import { TasksServices } from "../services/tasks.services";
import { TasksControllers } from "../controllers/tasks.controllers";
import { VerifyRequestMiddlewares } from "../middlewares/verifyRequest.middlewares";
import { createTaskSchema, updateTaskSchema } from "../schemas/tasks.schemas";
import { TasksMiddlewares } from "../middlewares/tasks.middlewares";

export const tasksRouter = Router();

container.registerSingleton("TasksServices", TasksServices);

const tasksControllers = container.resolve(TasksControllers);
const tasksMiddlewares = container.resolve(TasksMiddlewares);

tasksRouter.post("/",
    VerifyRequestMiddlewares.execute(createTaskSchema), 
    (req, res, next) => tasksMiddlewares.isCategoryIdValid(req, res, next),
    (req, res) => tasksControllers.createTask(req, res)
);

tasksRouter.get("/", 
    (req, res) => tasksControllers.getTasks(req, res)
);

tasksRouter.get("/:id",
    (req, res, next) => tasksMiddlewares.isTaskIdValid(req, res, next),
    (req, res) => tasksControllers.getById(req, res)
);

tasksRouter.patch("/:id",
    VerifyRequestMiddlewares.execute(updateTaskSchema),
    (req, res, next) => tasksMiddlewares.isTaskIdValid(req, res, next), 
    (req, res) => tasksControllers.updateTask(req, res)
);

tasksRouter.delete("/:id",
    (req, res, next) => tasksMiddlewares.isTaskIdValid(req, res, next), 
    (req, res) => tasksControllers.deleteTask(req, res)
);

