'use client';

import { useState, KeyboardEvent } from 'react';

interface WelcomeScreenProps {
  onJoin: (username: string) => void;
}

export const WelcomeScreen = ({ onJoin }: WelcomeScreenProps) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleJoin = () => {
    const trimmedUsername = username.trim();
    
    if (!trimmedUsername) {
      setError('Please enter a username');
      return;
    }
    
    if (trimmedUsername.length < 2) {
      setError('Username must be at least 2 characters');
      return;
    }
    
    if (trimmedUsername.length > 20) {
      setError('Username must be less than 20 characters');
      return;
    }
    
    onJoin(trimmedUsername);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleJoin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'var(--primary-gradient)',
            top: '10%',
            left: '10%',
            animation: 'pulse 4s ease-in-out infinite'
          }}
        ></div>
        <div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'var(--secondary-gradient)',
            bottom: '10%',
            right: '10%',
            animation: 'pulse 4s ease-in-out 2s infinite'
          }}
        ></div>
      </div>

      {/* Welcome Card */}
      <div className="glass rounded-3xl p-8 md:p-12 max-w-md w-full relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">💬</div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">
            Welcome
          </h1>
          <p className="text-[var(--text-secondary)] text-lg">
            Join the conversation
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-[var(--text-primary)] mb-2"
            >
              Choose your username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              onKeyPress={handleKeyPress}
              placeholder="Enter your name..."
              className="w-full bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[var(--accent-purple)] transition-all duration-200 placeholder-[var(--text-muted)] border border-[var(--border-glass)]"
              maxLength={20}
              autoFocus
            />
            {error && (
              <p className="text-red-400 text-sm mt-2 animate-fade-in">{error}</p>
            )}
          </div>

          <button
            onClick={handleJoin}
            className="w-full bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-pink)] text-white py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
          >
            Join Chat
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border-glass)]">
          <div className="flex items-center justify-center gap-2 text-sm text-[var(--text-muted)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <span>Real-time messaging with WebSocket</span>
          </div>
        </div>
      </div>
    </div>
  );
};
