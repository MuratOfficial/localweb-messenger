export interface User {
    id: string;
    username: string;
    color: string;
}

export interface Message {
    id: string;
    userId: string;
    username: string;
    text: string;
    timestamp: number;
    color: string;
}

export interface TypingUser {
    userId: string;
    username: string;
    isTyping: boolean;
}
