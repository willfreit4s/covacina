import { Request } from "express";
import { User } from "../entity/User";

export interface ExampleBaseRequest extends Request {
    user?: User;
}