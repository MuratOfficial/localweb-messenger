import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

interface User {
  id: string;
  username: string;
  color: string;
}

interface Message {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: number;
  color: string;
}

const users = new Map<string, User>();
const messages: Message[] = [];

// Generate random color for user
const generateColor = () => {
  const colors = [
    '#667eea', '#f093fb', '#4facfe', '#43e97b',
    '#fa709a', '#fee140', '#30cfd0', '#a8edea',
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url!, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Handle user join
    socket.on('join', (username: string) => {
      const user: User = {
        id: socket.id,
        username,
        color: generateColor()
      };
      
      users.set(socket.id, user);
      
      // Send existing messages to new user
      socket.emit('previous-messages', messages);
      
      // Broadcast user list to all clients
      io.emit('users-update', Array.from(users.values()));
      
      // Broadcast join notification
      const joinMessage: Message = {
        id: Date.now().toString(),
        userId: 'system',
        username: 'System',
        text: `${username} joined the chat`,
        timestamp: Date.now(),
        color: '#6b6b8c'
      };
      
      messages.push(joinMessage);
      io.emit('message', joinMessage);
    });

    // Handle new message
    socket.on('send-message', (text: string) => {
      const user = users.get(socket.id);
      if (!user) return;

      const message: Message = {
        id: Date.now().toString(),
        userId: user.id,
        username: user.username,
        text,
        timestamp: Date.now(),
        color: user.color
      };

      messages.push(message);
      
      // Keep only last 100 messages
      if (messages.length > 100) {
        messages.shift();
      }

      io.emit('message', message);
    });

    // Handle typing indicator
    socket.on('typing', (isTyping: boolean) => {
      const user = users.get(socket.id);
      if (!user) return;

      socket.broadcast.emit('user-typing', {
        userId: user.id,
        username: user.username,
        isTyping
      });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      const user = users.get(socket.id);
      if (user) {
        users.delete(socket.id);
        
        // Broadcast leave notification
        const leaveMessage: Message = {
          id: Date.now().toString(),
          userId: 'system',
          username: 'System',
          text: `${user.username} left the chat`,
          timestamp: Date.now(),
          color: '#6b6b8c'
        };
        
        messages.push(leaveMessage);
        io.emit('message', leaveMessage);
        io.emit('users-update', Array.from(users.values()));
      }
      
      console.log('User disconnected:', socket.id);
    });
  });

  server
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
