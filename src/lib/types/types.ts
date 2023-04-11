import type { ObjectId } from "mongodb";
export interface Message {
    role: 'human' | 'ai' | 'system';
    text: string;
}

export interface Folder {
    _id : number;
    name : string;
    history : Message[];
}

export interface User {
    _id : ObjectId;
    address: string;
    folders: Folder[];
}