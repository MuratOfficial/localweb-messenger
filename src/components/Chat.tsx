'use client';

import { useEffect, useRef } from 'react';
import { useSocket } from '@/hooks/useSocket';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { UserList } from './UserList';
import { TypingIndicator } from './TypingIndicator';

interface ChatProps {
  username: string;
}

export const Chat = ({ username }: ChatProps) => {
  const { messages, users, typingUsers, isConnected, sendMessage, handleTyping, socket } =
    useSocket(username);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const currentUser = users.find((u) => u.username === username);

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                LocalWeb Messenger
              </h1>
              <p className="text-[var(--text-secondary)] text-sm">
                Real-time chat powered by WebSocket
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  isConnected ? 'bg-green-400' : 'bg-red-400'
                }`}
                style={{
                  animation: isConnected ? 'pulse 2s ease-in-out infinite' : 'none'
                }}
              ></div>
              <span className="text-sm text-[var(--text-secondary)] hidden md:block">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Area */}
        <div className="lg:col-span-3 flex flex-col h-[calc(100vh-200px)]">
          {/* Messages */}
          <div className="flex-1 glass rounded-2xl p-6 mb-4 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                    No messages yet
                  </h3>
                  <p className="text-[var(--text-muted)]">
                    Be the first to start the conversation!
                  </p>
                </div>
              </div>
            ) : (
              <div>
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    isOwn={message.userId === socket?.id}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Typing Indicator */}
          <TypingIndicator typingUsers={typingUsers} />

          {/* Input */}
          <ChatInput
            onSendMessage={sendMessage}
            onTyping={handleTyping}
            disabled={!isConnected}
          />
        </div>

        {/* User List */}
        <div className="lg:col-span-1 h-[calc(100vh-200px)]">
          <UserList users={users} currentUserId={currentUser?.id || null} />
        </div>
      </div>
    </div>
  );
};
