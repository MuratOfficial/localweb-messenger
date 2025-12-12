'use client';

import { TypingUser } from '@/types/chat';

interface TypingIndicatorProps {
  typingUsers: TypingUser[];
}

export const TypingIndicator = ({ typingUsers }: TypingIndicatorProps) => {
  if (typingUsers.length === 0) return null;

  const displayText =
    typingUsers.length === 1
      ? `${typingUsers[0].username} is typing`
      : typingUsers.length === 2
      ? `${typingUsers[0].username} and ${typingUsers[1].username} are typing`
      : `${typingUsers.length} people are typing`;

  return (
    <div className="flex items-center gap-2 px-4 py-2 animate-fade-in">
      <div className="flex gap-1">
        <div
          className="w-2 h-2 rounded-full bg-[var(--accent-purple)]"
          style={{
            animation: 'pulse 1.4s ease-in-out infinite'
          }}
        ></div>
        <div
          className="w-2 h-2 rounded-full bg-[var(--accent-pink)]"
          style={{
            animation: 'pulse 1.4s ease-in-out 0.2s infinite'
          }}
        ></div>
        <div
          className="w-2 h-2 rounded-full bg-[var(--accent-blue)]"
          style={{
            animation: 'pulse 1.4s ease-in-out 0.4s infinite'
          }}
        ></div>
      </div>
      <span className="text-sm text-[var(--text-muted)] italic">{displayText}</span>
    </div>
  );
};
