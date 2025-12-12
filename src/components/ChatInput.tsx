'use client';

import { useState, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onTyping: () => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, onTyping, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (value: string) => {
    setMessage(value);
    onTyping();
  };

  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex gap-3 items-end">
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => handleChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={disabled}
            rows={1}
            className="w-full bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-[var(--accent-purple)] transition-all duration-200 placeholder-[var(--text-muted)] border border-[var(--border-glass)]"
            style={{
              minHeight: '48px',
              maxHeight: '120px'
            }}
          />
        </div>
        
        <button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className="bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-pink)] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
          Send
        </button>
      </div>
    </div>
  );
};
