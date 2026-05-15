<div align="center">

# 💬 Real-Time Chat Application

**Author:** Abdullah Al Noman

## System Architecture

![System Architecture](readme-photos/system-architecture.png)

</div>

## 🚀 Features

- **Real-time messaging** with Socket.IO
- **User authentication** with JWT
- **File uploads** with Cloudinary
- **Email notifications** with RabbitMQ
- **Microservices architecture**
- **Docker containerization**
- **Production-ready deployment**

## 🏗️ Architecture

### Services
- **Frontend**: Next.js application (Port 3000)
- **User Service**: Authentication & user management (Port 5000)
- **Chat Service**: Real-time messaging (Port 5002)
- **Mail Service**: Email notifications (Port 5003)

### External Dependencies
- **MongoDB**: Database storage
- **Redis**: Caching and sessions
- **RabbitMQ**: Message queuing
- **Cloudinary**: File storage

## 🛠️ Development Setup

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd chat-app
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

3. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - User API: http://localhost:5000
   - Chat API: http://localhost:5002
   - Mail API: http://localhost:5003

## 🚀 Production Deployment

### Dokploy Deployment

This application is ready for deployment on Dokploy. See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

**Quick Deploy:**
1. Set up external services (MongoDB Atlas, Upstash Redis, CloudAMQP)
2. Configure environment variables in Dokploy
3. Deploy using `docker-compose.prod.yml`

### Environment Variables

Required for production:
```env
MONGO_URI=mongodb+srv://...
REDIS_URL=rediss://...
RABBITMQ_URL=amqp://...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
JWT_SECRET=...
MAIL_USER=...
MAIL_PASSWORD=...
NEXT_PUBLIC_USER_SERVICE=https://your-domain.com
NEXT_PUBLIC_CHAT_SERVICE=https://your-domain.com
```

## 📁 Project Structure

```
chat-app/
├── backend/
│   ├── user/          # User service
│   ├── chat/          # Chat service
│   └── mail/          # Mail service
├── frontend/          # Next.js frontend
├── docker-compose.yml # Local development
├── docker-compose.prod.yml # Production
└── DEPLOYMENT.md      # Deployment guide
```

## 🔧 Development Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild services
docker-compose up --build

# Run individual service
cd backend/user && npm run dev
```

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Health checks
curl http://localhost:5000/health
curl http://localhost:5002/health
curl http://localhost:5003/health
```

## 📝 API Documentation

### User Service (Port 5000)
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile
- `GET /health` - Health check

### Chat Service (Port 5002)
- `GET /chats` - Get user chats
- `POST /chats` - Create new chat
- `GET /messages/:chatId` - Get chat messages
- `POST /messages` - Send message
- `GET /health` - Health check

### Mail Service (Port 5003)
- `POST /send` - Send email
- `GET /health` - Health check

## 🔒 Security Features

- JWT authentication
- Non-root Docker containers
- Environment variable encryption
- CORS protection
- Input validation
- Rate limiting (recommended to add)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment issues
- Review Docker logs for debugging
- Ensure all environment variables are set

---

**Built with ❤️ by Abdullah Al Noman**
