import { User } from "./user.model";

export interface Review {
    _id?: string;
    comment: string;
    user?: User;
    book?: string;
    __v?: number;
    rating: number;
}