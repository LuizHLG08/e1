import { Router } from "express";
import { container } from "tsyringe";
import { CategoriesServices } from "../services/categories.services";
import { CategoriesControllers } from "../controllers/categories.controllers";
import { VerifyRequestMiddlewares } from "../middlewares/verifyRequest.middlewares";
import { createCategorySchema } from "../schemas/categories.schemas";
import { CategoriesMiddlewares } from "../middlewares/categories.middlewares";

export const categoriesRouter = Router();

container.registerSingleton("CategoriesServices", CategoriesServices);

const categoriesControllers = container.resolve(CategoriesControllers);
const categoriesMiddlewares = container.resolve(CategoriesMiddlewares);

categoriesRouter.post("/",
    VerifyRequestMiddlewares.execute(createCategorySchema),
    (req, res) => categoriesControllers.createCategory(req, res)
);

categoriesRouter.delete("/:id",
    (req, res, next) => categoriesMiddlewares.isCategoryIdValid(req, res, next),
    (req, res) => categoriesControllers.deleteCategory(req, res)
);