'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message, User, TypingUser } from '@/types/chat';

export const useSocket = (username: string | null) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!username) return;

        const socketInstance = io('http://localhost:3000', {
            transports: ['websocket', 'polling']
        });

        socketInstance.on('connect', () => {
            console.log('Connected to server');
            setIsConnected(true);
            socketInstance.emit('join', username);
        });

        socketInstance.on('disconnect', () => {
            console.log('Disconnected from server');
            setIsConnected(false);
        });

        socketInstance.on('previous-messages', (msgs: Message[]) => {
            setMessages(msgs);
        });

        socketInstance.on('message', (message: Message) => {
            setMessages((prev) => [...prev, message]);
        });

        socketInstance.on('users-update', (userList: User[]) => {
            setUsers(userList);
        });

        socketInstance.on('user-typing', (data: TypingUser) => {
            setTypingUsers((prev) => {
                const filtered = prev.filter((u) => u.userId !== data.userId);
                if (data.isTyping) {
                    return [...filtered, data];
                }
                return filtered;
            });
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, [username]);

    const sendMessage = useCallback(
        (text: string) => {
            if (socket && text.trim()) {
                socket.emit('send-message', text);
            }
        },
        [socket]
    );

    const sendTyping = useCallback(
        (isTyping: boolean) => {
            if (socket) {
                socket.emit('typing', isTyping);
            }
        },
        [socket]
    );

    const handleTyping = useCallback(() => {
        sendTyping(true);

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            sendTyping(false);
        }, 1000);
    }, [sendTyping]);

    return {
        socket,
        messages,
        users,
        typingUsers,
        isConnected,
        sendMessage,
        handleTyping
    };
};
