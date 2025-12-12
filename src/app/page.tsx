'use client';

import { useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { Chat } from '@/components/Chat';

export default function Home() {
  const [username, setUsername] = useState<string | null>(null);

  const handleJoin = (name: string) => {
    setUsername(name);
  };

  return (
    <div className="min-h-screen">
      {!username ? (
        <WelcomeScreen onJoin={handleJoin} />
      ) : (
        <Chat username={username} />
      )}
    </div>
  );
}

