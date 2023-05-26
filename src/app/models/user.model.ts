export interface User {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    rol: UserRole;
    verified?: boolean;
    likes?: string[];
    __v?: number;
}

export enum UserRole {
    User = 'user',
    Admin = 'admin',
}