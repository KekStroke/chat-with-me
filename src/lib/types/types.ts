export interface Message {
    sender: 'user' | 'model';
    message: string;
}