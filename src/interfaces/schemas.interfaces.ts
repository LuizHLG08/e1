import { AnyZodObject } from "zod";

export interface IReqSchemas {
    body?: AnyZodObject;
    params?: AnyZodObject;
    query?: AnyZodObject;
}