<div align="center">

# Real-Time Chat Application - Alapon

**A production-ready **microservices-based** chat platform with real-time messaging, authentication, and email notifications**

---

## Live Demo

### **[alapon.abdnoman.com](https://alapon.abdnoman.com)**

[![Visit Live Site](https://img.shields.io/badge/Visit_Live_Site-alapon.abdnoman.com-FF6B6B?style=for-the-badge&labelColor=2C3E50)](https://alapon.abdnoman.com)

</div>

---

## Project Overview

A **scalable** real-time chat application built with **microservices architecture**, featuring **JWT authentication**, **Socket.IO** messaging, file uploads via **Cloudinary**, and asynchronous email notifications using **RabbitMQ**. Deployed on own **VPS** using **Dokploy** with **Docker** containerization.

---

## Key Features

- **Real-time messaging** with Socket.IO and typing indicators
- **JWT authentication** with Redis session management
- **Email verification** via RabbitMQ message queue
- **File uploads** (images/documents) with Cloudinary
- **User management** with profile updates and account deletion
- **Modern UI** with Tailwind CSS and emoji support
- **Docker containerization** for easy deployment
- **Microservices architecture** for scalability

---

## Tech Stack

<table>
  <tr>
    <td valign="top" width="50%">
      <h3>Frontend</h3>
      <p>
        <img src="https://img.shields.io/badge/Next.js-16.2.6-black?style=flat-square&logo=next.js" alt="Next.js" />
        <img src="https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react" alt="React" />
        <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
        <img src="https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind CSS" />
        <img src="https://img.shields.io/badge/Socket.IO-4.8.3-010101?style=flat-square&logo=socket.io" alt="Socket.IO" />
        <img src="https://img.shields.io/badge/Axios-1.16.0-5A29E4?style=flat-square&logo=axios" alt="Axios" />
      </p>
    </td>
    <td valign="top" width="50%">
      <h3>Backend Services</h3>
      <h4>User Service</h4>
      <p>
        <img src="https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js" alt="Node.js" />
        <img src="https://img.shields.io/badge/Express-5.2.1-000000?style=flat-square&logo=express" alt="Express" />
        <img src="https://img.shields.io/badge/MongoDB-9.6.2-47A248?style=flat-square&logo=mongodb" alt="MongoDB" />
        <img src="https://img.shields.io/badge/Redis-5.12.1-DC382D?style=flat-square&logo=redis" alt="Redis" />
        <img src="https://img.shields.io/badge/JWT-9.0.3-000000?style=flat-square&logo=json-web-tokens" alt="JWT" />
      </p>
      <h4>Chat Service</h4>
      <p>
        <img src="https://img.shields.io/badge/Socket.IO-4.8.3-010101?style=flat-square&logo=socket.io" alt="Socket.IO" />
        <img src="https://img.shields.io/badge/Express-5.2.1-000000?style=flat-square&logo=express" alt="Express" />
        <img src="https://img.shields.io/badge/Mongoose-9.6.2-47A248?style=flat-square&logo=mongodb" alt="Mongoose" />
      </p>
      <h4>Mail Service</h4>
      <p>
        <img src="https://img.shields.io/badge/Nodemailer-8.0.7-0F9DCE?style=flat-square&logo=gmail" alt="Nodemailer" />
        <img src="https://img.shields.io/badge/RabbitMQ-2.0.1-FF6600?style=flat-square&logo=rabbitmq" alt="RabbitMQ" />
      </p>
      <h4>Infrastructure</h4>
      <p>
        <img src="https://img.shields.io/badge/MongoDB-6.0-47A248?style=flat-square&logo=mongodb" alt="MongoDB" />
        <img src="https://img.shields.io/badge/Redis-7_Alpine-DC382D?style=flat-square&logo=redis" alt="Redis" />
        <img src="https://img.shields.io/badge/RabbitMQ-3.12-FF6600?style=flat-square&logo=rabbitmq" alt="RabbitMQ" />
        <img src="https://img.shields.io/badge/Docker-Latest-2496ED?style=flat-square&logo=docker" alt="Docker" />
        <img src="https://img.shields.io/badge/Nginx-Latest-009639?style=flat-square&logo=nginx" alt="Nginx" />
        <img src="https://img.shields.io/badge/Cloudflare-DNS-F38020?style=flat-square&logo=cloudflare" alt="Cloudflare" />
        <img src="https://img.shields.io/badge/Cloudinary-Storage-3448C5?style=flat-square&logo=cloudinary" alt="Cloudinary" />
        <img src="https://img.shields.io/badge/MongoDB_Atlas-Production-47A248?style=flat-square&logo=mongodb" alt="MongoDB Atlas" />
      </p>
    </td>
  </tr>
</table>

---

## System Architecture

![System Architecture](readme-photos/system-architecture.png)

---

## Screenshots

<table>
  <tr>
    <td align="center">
      <img src="readme-photos/login-page.png" alt="Login Page" width="320" />
      <br />
      <strong>Login Page</strong>
    </td>
    <td align="center">
      <img src="readme-photos/verification-page.png" alt="Verification Page" width="320" />
      <br />
      <strong>Verification Page</strong>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="readme-photos/chat-page.png" alt="Chat Interface" width="320" />
      <br />
      <strong>Chat Interface</strong>
    </td>
    <td align="center">
      <img src="readme-photos/typing.png" alt="Typing Indicator" width="320" />
      <br />
      <strong>Typing Indicator</strong>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="readme-photos/inbox.png" alt="Inbox" width="320" />
      <br />
      <strong>Inbox / Chat List</strong>
    </td>
    <td align="center">
      <img src="readme-photos/file-upload.png" alt="File Upload" width="320" />
      <br />
      <strong>File Upload</strong>
    </td>
  </tr>
  <tr>
    <td align="center" colspan="2">
      <img src="readme-photos/user-profile.png" alt="User Profile" width="320" />
      <br />
      <strong>User Profile</strong>
    </td>
  </tr>
</table>

---

## Authentication & Security

- **JWT tokens** with 7-day expiration
- **Password hashing** (implementation ready)
- **Redis session** management
- **Email verification** with OTP
- **CORS protection** on all services
- **Non-root Docker** containers
- **Environment variable** encryption

---

## API Endpoints

### User Service (Port 5000)
```
POST   /api/v1/login           - User login
POST   /api/v1/verify          - Verify email OTP
GET    /api/v1/me              - Get current user profile
GET    /api/v1/user/all        - Get all users
GET    /api/v1/user/:id        - Get specific user
PUT    /api/v1/user/update     - Update profile (with avatar)
DELETE /api/v1/user/delete     - Delete account
GET    /health                 - Health check
```

### Chat Service (Port 5002)
```
POST   /api/v1/chat/new        - Create new chat
GET    /api/v1/chats/all       - Get all user chats
POST   /api/v1/message         - Send message (with file upload)
GET    /api/v1/message/:chatId - Get messages by chat
DELETE /api/v1/message/:messageId - Delete message
PATCH  /api/v1/message/:messageId - Edit message
PATCH  /api/v1/message/:messageId/react - React to message
DELETE /api/v1/chat/:chatId    - Delete chat
GET    /health                 - Health check
```

### Mail Service (Port 5003)
```
GET    /health                 - Health check

Note: Mail service works as RabbitMQ consumer for async email delivery
```

---

## Installation & Local Setup

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- Git

### Steps

```bash
# Clone repository
git clone <your-repo-url>
cd chat-app

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Access application
# Frontend: http://localhost:3000
# User API: http://localhost:5000
# Chat API: http://localhost:5002
```

---

## Deployment Details

**Platform:** Dokploy (VPS)  
**Domain:** Cloudflare DNS + SSL  
**Reverse Proxy:** Nginx

### Production Setup

**Self-Hosted Services (VPS):**
- RabbitMQ 3.12 Management (Message Queue)
- Nginx (Reverse Proxy)
- Docker & Docker Compose

**External Managed Services:**
- MongoDB Atlas (Database)
- Upstash Redis (Cache)
- Cloudinary (File Storage)
- Gmail SMTP (Email Delivery)

### Deployment Steps

1. **Setup VPS:**
   ```bash
   # Install Docker & Docker Compose
   # Install RabbitMQ on VPS
   # Configure Nginx reverse proxy
   ```

2. **Deploy Services:**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d --build
   ```

3. **Environment Variables:**
   - Set in Dokploy dashboard
   - Configure RabbitMQ connection (localhost/VPS IP)
   - Add external service credentials

---

## Project Structure

```
chat-app/
├── backend/
│   ├── user/              # Authentication & user management
│   │   ├── src/
│   │   ├── Dockerfile
│   │   └── package.json
│   ├── chat/              # Real-time messaging
│   │   ├── src/
│   │   ├── Dockerfile
│   │   └── package.json
│   └── mail/              # Email notifications
│       ├── src/
│       ├── Dockerfile
│       └── package.json
├── frontend/              # Next.js application
│   ├── app/
│   ├── components/
│   ├── context/
│   └── Dockerfile
├── readme-photos/
├── docker-compose.yml     # Local development
├── docker-compose.prod.yml # Production
└── nginx.conf             # Reverse proxy config
```

---

## Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| Real-time messaging across services | Implemented Socket.IO with JWT authentication |
| Async email delivery | Used RabbitMQ message queue for decoupling |
| File upload handling | Integrated Cloudinary with Multer middleware |
| Service communication | Docker networking with service discovery |
| Production deployment | Dokploy with external managed services |

---

## Future Improvements

- [ ] Add message encryption (E2E)
- [ ] Implement group chat functionality
- [ ] Add voice/video calling
- [ ] Message read receipts
- [ ] Push notifications
- [ ] Rate limiting on APIs
- [ ] Comprehensive test coverage
- [ ] Message search functionality
- [ ] User presence indicators
- [ ] Dark mode support

---

## License

MIT License - feel free to use this project for learning and portfolio purposes.

---

<div align="center">

## Developer

**Abdullah Al Noman**

**Email:** [abdnoman093@gmail.com](mailto:abdnoman093@gmail.com)  
**LinkedIn:** [linkedin.com/in/nomanit](https://linkedin.com/in/nomanit)  
**Portfolio:** [abdnoman.com](https://abdnoman.com)

---

**Star this repo if you find it helpful!**

</div>
