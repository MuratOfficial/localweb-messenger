# LocalWeb Messenger 💬

A beautiful, modern real-time chat application built with Next.js, WebSocket (Socket.IO), and TailwindCSS.

## ✨ Features

- **Real-time messaging** - Instant message delivery using WebSocket technology
- **User presence** - See who's online with live user list
- **Typing indicators** - Know when someone is typing
- **Beautiful UI** - Modern design with glassmorphism effects and smooth animations
- **Responsive** - Works seamlessly on desktop and mobile devices
- **User-friendly** - Simple username-based authentication
- **Color-coded users** - Each user gets a unique color for easy identification

## 🚀 Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Socket.IO** - Real-time bidirectional communication
- **TailwindCSS 4** - Modern utility-first CSS framework
- **Custom Server** - Node.js server with Socket.IO integration

## 🎨 Design Features

- **Glassmorphism** - Frosted glass effect with backdrop blur
- **Gradient Accents** - Vibrant purple and pink gradients
- **Smooth Animations** - Fade-in, slide-in, and pulse effects
- **Custom Scrollbar** - Styled scrollbar matching the theme
- **Inter Font** - Modern, clean typography from Google Fonts
- **Dark Theme** - Eye-friendly dark color palette

## 📦 Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```

The application will start on [http://localhost:3000](http://localhost:3000)

### Production Mode
```bash
npm run build
npm start
```

## 🎯 How to Use

1. Open the application in your browser
2. Enter a username (2-20 characters)
3. Click "Join Chat" to enter the chat room
4. Start messaging with other users in real-time!

## 📁 Project Structure

```
localweb-messenger/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles and design system
│   │   ├── layout.tsx       # Root layout with metadata
│   │   └── page.tsx         # Main page component
│   ├── components/
│   │   ├── Chat.tsx         # Main chat interface
│   │   ├── ChatInput.tsx    # Message input component
│   │   ├── ChatMessage.tsx  # Individual message component
│   │   ├── TypingIndicator.tsx  # Typing status display
│   │   ├── UserList.tsx     # Online users sidebar
│   │   └── WelcomeScreen.tsx    # Login/welcome screen
│   ├── hooks/
│   │   └── useSocket.ts     # Socket.IO connection hook
│   └── types/
│       └── chat.ts          # TypeScript type definitions
├── server.ts                # Custom Next.js server with Socket.IO
└── package.json
```

## 🔧 Configuration

The application uses the following default configuration:
- **Port**: 3000
- **Host**: localhost
- **Max Messages**: 100 (older messages are automatically removed)

## 🌟 Key Components

### Server (`server.ts`)
- Custom Next.js server with Socket.IO integration
- Handles user connections, messages, and typing events
- Manages user state and message history

### useSocket Hook
- Manages WebSocket connection lifecycle
- Handles message sending and receiving
- Manages typing indicators
- Provides connection status

### Chat Components
- **WelcomeScreen**: Username entry with validation
- **Chat**: Main chat interface with messages and user list
- **ChatMessage**: Individual message display with timestamps
- **ChatInput**: Message composition with typing detection
- **UserList**: Online users with avatars and status
- **TypingIndicator**: Animated typing status

## 🎨 Design System

The application uses a custom design system with:
- **Color Variables**: Defined in `globals.css`
- **Utility Classes**: Glassmorphism, gradients, animations
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Semantic HTML and proper ARIA labels

## 🔒 Security Notes

This is a demonstration application. For production use, consider:
- Adding proper authentication
- Implementing rate limiting
- Sanitizing user input
- Using HTTPS/WSS
- Adding message persistence
- Implementing user permissions

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork, modify, and use this project for your own purposes!

## 🐛 Known Issues

- Messages are stored in memory and will be lost on server restart
- No message persistence or history
- Limited to 100 messages in memory

## 🚀 Future Enhancements

- [ ] Message persistence with database
- [ ] Private messaging
- [ ] File/image sharing
- [ ] Emoji picker
- [ ] Message reactions
- [ ] User profiles
- [ ] Multiple chat rooms
- [ ] Message editing and deletion
- [ ] Read receipts

---

Built with ❤️ using Next.js and Socket.IO
