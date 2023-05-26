import { Book } from "./book.model";
import { User } from "./user.model";

export interface Loan {
    _id?: string;
    book: Book;
    user: User;
    loanDate: string;
    returnDate: string;
    returned: number;
    __v?: number;
}