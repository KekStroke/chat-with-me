export interface Message {
    role: 'human' | 'ai' | 'system';
    text: string;
}