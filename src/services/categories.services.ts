import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { Category, CreateCategory } from "../interfaces/categories.interfaces";

@injectable()
export class CategoriesServices {

    async createCategory(data : CreateCategory) : Promise<Category> {
        return await prisma.category.create({
            data : data
        });
    }

    async deleteCategory(id : number) : Promise<void> {
        await prisma.category.delete({
            where : {id : id}
        });
    }

}