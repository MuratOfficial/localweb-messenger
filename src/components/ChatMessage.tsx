'use client';

import { Message } from '@/types/chat';
import { useEffect, useRef } from 'react';

interface ChatMessageProps {
  message: Message;
  isOwn: boolean;
}

export const ChatMessage = ({ message, isOwn }: ChatMessageProps) => {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const isSystem = message.userId === 'system';

  if (isSystem) {
    return (
      <div ref={messageRef} className="flex justify-center my-4 animate-fade-in">
        <div className="glass-light px-4 py-2 rounded-full">
          <p className="text-sm text-[var(--text-muted)] text-center">
            {message.text}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={messageRef}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4 animate-slide-in`}
    >
      <div className={`max-w-[70%] ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
        {!isOwn && (
          <span
            className="text-xs font-semibold mb-1 ml-3"
            style={{ color: message.color }}
          >
            {message.username}
          </span>
        )}
        <div
          className={`px-4 py-3 rounded-2xl ${
            isOwn
              ? 'bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-pink)] text-white rounded-br-sm'
              : 'glass rounded-bl-sm'
          } hover-lift`}
        >
          <p className="text-sm leading-relaxed break-words">{message.text}</p>
          <span className={`text-xs mt-1 block ${isOwn ? 'text-white/70' : 'text-[var(--text-muted)]'}`}>
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>
    </div>
  );
};
