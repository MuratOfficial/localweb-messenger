'use client';

import { User } from '@/types/chat';

interface UserListProps {
  users: User[];
  currentUserId: string | null;
}

export const UserList = ({ users, currentUserId }: UserListProps) => {
  return (
    <div className="glass rounded-2xl p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-blue)] animate-pulse"></div>
        <h2 className="text-xl font-bold gradient-text">
          Online Users ({users.length})
        </h2>
      </div>
      
      <div className="space-y-3">
        {users.map((user) => {
          const isCurrentUser = user.id === currentUserId;
          
          return (
            <div
              key={user.id}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                isCurrentUser
                  ? 'glass-light border-l-4'
                  : 'hover:bg-white/5'
              }`}
              style={isCurrentUser ? { borderLeftColor: user.color } : {}}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${user.color}, ${user.color}dd)`
                }}
              >
                {user.username.charAt(0).toUpperCase()}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate text-[var(--text-primary)]">
                  {user.username}
                  {isCurrentUser && (
                    <span className="ml-2 text-xs text-[var(--text-muted)]">(You)</span>
                  )}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-xs text-[var(--text-secondary)]">Online</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {users.length === 0 && (
        <div className="text-center py-8">
          <p className="text-[var(--text-muted)] text-sm">No users online</p>
        </div>
      )}
    </div>
  );
};
