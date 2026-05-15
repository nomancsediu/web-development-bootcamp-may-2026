<div align="center">

# 💬 Alapon

### Real-Time Chat Application — Microservices Architecture

<br/>

[![Visit Live Site](https://img.shields.io/badge/Live_Demo-alapon.abdnoman.com-FF6B6B?style=for-the-badge&labelColor=2C3E50)](https://alapon.abdnoman.com)

</div>

---

## 📖 Project Overview

A **scalable** real-time chat application built with **microservices architecture**, featuring **JWT authentication**, **Socket.IO** messaging, file uploads via **Cloudinary**, and asynchronous email notifications using **RabbitMQ**. Deployed on a self-hosted **VPS** using **Dokploy** with **Docker** containerization and **Nginx** reverse proxy.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| Real-time Messaging | Socket.IO-powered instant messaging with typing indicators |
| JWT Authentication | Secure login with Redis session management |
| Email Verification | OTP-based login via RabbitMQ message queue |
| File Uploads | Images & documents with Cloudinary storage |
| Message Reactions | Emoji reactions on messages |
| Message Editing | Edit and delete messages in real-time |
| User Management | Profile updates, avatar upload, account deletion |
| Online Status | Real-time user presence with invisible mode |
| Modern UI | Tailwind CSS responsive design with dark theme |
| Docker Containerization | Multi-stage builds, non-root containers, health checks |

---

## 🏗️ System Architecture

<p align="center">
  <img src="readme-photos/system-architecture.png" alt="System Architecture" width="100%" />
</p>

---

## 🛠️ Tech Stack

<table width="100%">
  <tr>
    <th colspan="2" align="center">Frontend</th>
  </tr>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/Next.js-16.2.6-black?style=flat-square&logo=next.js" />
      <img src="https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react" />
      <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript" />
      <img src="https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css" />
      <img src="https://img.shields.io/badge/Socket.IO-4.8.3-010101?style=flat-square&logo=socket.io" />
      <img src="https://img.shields.io/badge/Axios-1.16.0-5A29E4?style=flat-square&logo=axios" />
    </td>
  </tr>
</table>

<table width="100%">
  <tr>
    <th align="center">User Service</th>
    <th align="center">Chat Service</th>
    <th align="center">Mail Service</th>
  </tr>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/Express-5.2.1-000000?style=flat-square&logo=express" /><br/>
      <img src="https://img.shields.io/badge/MongoDB-9.6.2-47A248?style=flat-square&logo=mongodb" /><br/>
      <img src="https://img.shields.io/badge/Redis-5.12.1-DC382D?style=flat-square&logo=redis" /><br/>
      <img src="https://img.shields.io/badge/JWT-9.0.3-000000?style=flat-square&logo=json-web-tokens" /><br/>
      <img src="https://img.shields.io/badge/RabbitMQ-2.0.1-FF6600?style=flat-square&logo=rabbitmq" /><br/>
      <img src="https://img.shields.io/badge/Cloudinary-1.41.3-3448C5?style=flat-square&logo=cloudinary" />
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/Express-5.2.1-000000?style=flat-square&logo=express" /><br/>
      <img src="https://img.shields.io/badge/Socket.IO-4.8.3-010101?style=flat-square&logo=socket.io" /><br/>
      <img src="https://img.shields.io/badge/Mongoose-9.6.2-47A248?style=flat-square&logo=mongodb" /><br/>
      <img src="https://img.shields.io/badge/Cloudinary-1.41.3-3448C5?style=flat-square&logo=cloudinary" /><br/>
      <img src="https://img.shields.io/badge/JWT-9.0.3-000000?style=flat-square&logo=json-web-tokens" />
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/Express-5.2.1-000000?style=flat-square&logo=express" /><br/>
      <img src="https://img.shields.io/badge/RabbitMQ-2.0.1-FF6600?style=flat-square&logo=rabbitmq" /><br/>
      <img src="https://img.shields.io/badge/Nodemailer-8.0.7-0F9DCE?style=flat-square&logo=gmail" />
    </td>
  </tr>
</table>

<table width="100%">
  <tr>
    <th colspan="4" align="center">Infrastructure & DevOps</th>
  </tr>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/Docker-Latest-2496ED?style=flat-square&logo=docker" /><br/><sub>Docker</sub>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/Dokploy-v0.29.4-7C3AED?style=flat-square&logo=docker" /><br/><sub>Deployment</sub>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/Nginx-Reverse_Proxy-009639?style=flat-square&logo=nginx" /><br/><sub>Reverse Proxy</sub>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/Cloudflare-DNS_&_SSL-F38020?style=flat-square&logo=cloudflare" /><br/><sub>DNS & SSL</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/MongoDB_Atlas-Production-47A248?style=flat-square&logo=mongodb" /><br/><sub>Database</sub>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/Upstash-Redis-DC382D?style=flat-square&logo=redis" /><br/><sub>Cache</sub>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/Cloudinary-Storage-3448C5?style=flat-square&logo=cloudinary" /><br/><sub>File Storage</sub>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/RabbitMQ-3.12-FF6600?style=flat-square&logo=rabbitmq" /><br/><sub>Message Queue</sub>
    </td>
  </tr>
</table>

---

## 📸 Screenshots

<table width="100%">
  <tr>
    <td align="center" width="50%">
      <img src="readme-photos/login-page.png" alt="Login Page" width="100%" />
      <br /><b>Login Page</b>
    </td>
    <td align="center" width="50%">
      <img src="readme-photos/verification-page.png" alt="Verification Page" width="100%" />
      <br /><b>Verification Page</b>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="readme-photos/chat-page.png" alt="Chat Interface" width="100%" />
      <br /><b>Chat Interface</b>
    </td>
    <td align="center" width="50%">
      <img src="readme-photos/typing.png" alt="Typing Indicator" width="100%" />
      <br /><b>Typing Indicator</b>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="readme-photos/inbox.png" alt="Inbox / Chat List" width="100%" />
      <br /><b>Inbox / Chat List</b>
    </td>
    <td align="center" width="50%">
      <img src="readme-photos/file-upload.png" alt="File Upload" width="100%" />
      <br /><b>File Upload</b>
    </td>
  </tr>
  <tr>
    <td align="center" colspan="2">
      <img src="readme-photos/user-profile.png" alt="User Profile" width="50%" />
      <br /><b>User Profile</b>
    </td>
  </tr>
</table>

---

## 📡 API Endpoints

### User Service — Port 5000

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|:----:|
| `POST` | `/api/v1/login` | OTP login (sends email) | No |
| `POST` | `/api/v1/verify` | Verify OTP | No |
| `GET` | `/api/v1/me` | Get current user profile | Yes |
| `GET` | `/api/v1/user/all` | Get all users | Yes |
| `GET` | `/api/v1/user/:id` | Get specific user | No |
| `PUT` | `/api/v1/user/update` | Update profile + avatar | Yes |
| `DELETE` | `/api/v1/user/delete` | Delete account | Yes |
| `GET` | `/health` | Health check | No |

### Chat Service — Port 5002

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|:----:|
| `POST` | `/api/v1/chat/new` | Create new chat | Yes |
| `GET` | `/api/v1/chats/all` | Get all user chats | Yes |
| `POST` | `/api/v1/message` | Send message (with file) | Yes |
| `GET` | `/api/v1/message/:chatId` | Get messages + mark seen | Yes |
| `PATCH` | `/api/v1/message/:messageId` | Edit message | Yes |
| `PATCH` | `/api/v1/message/:messageId/react` | React with emoji | Yes |
| `DELETE` | `/api/v1/message/:messageId` | Delete message | Yes |
| `DELETE` | `/api/v1/chat/:chatId` | Delete entire chat | Yes |
| `GET` | `/health` | Health check | No |

### Mail Service — Port 5003

> Works as a **RabbitMQ consumer** — listens on `send-otp` queue and sends emails via Nodemailer (Gmail SMTP).

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check |

---

## 🚀 Installation & Local Setup

### Prerequisites

- **Node.js** 20+
- **Docker** & **Docker Compose**
- **Git**

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/nomancsediu/web-development-bootcamp-may-2026.git
cd web-development-bootcamp-may-2026/nomancsediu/chat-app

# 2. Setup environment
cp .env.example .env
# Edit .env with your credentials

# 3. Start all services
docker-compose up -d

# 4. Access the application
# Frontend:  http://localhost:3000
# User API:  http://localhost:5000
# Chat API:  http://localhost:5002
# Mail API:  http://localhost:5003
# RabbitMQ:  http://localhost:15672
```

---

## 🌍 Production Deployment

### Architecture Overview

| Component | Service | Type |
|-----------|---------|------|
| Database | MongoDB Atlas | External Managed |
| Cache | Upstash Redis | External Managed |
| Message Queue | RabbitMQ 3.12 | Self-Hosted (VPS) |
| File Storage | Cloudinary | External Managed |
| Email | Gmail SMTP | External |
| Reverse Proxy | Nginx | Self-Hosted (VPS) |
| Deployment | Dokploy | Self-Hosted (VPS) |
| DNS & SSL | Cloudflare | External |

### Deploy Steps

```bash
# 1. Deploy using production compose
docker-compose -f docker-compose.prod.yml up -d --build

# 2. Configure environment variables in Dokploy dashboard

# 3. Setup Nginx reverse proxy with SSL (Certbot)
```

### Environment Variables

```env
MONGO_URI=mongodb+srv://...
REDIS_URL=rediss://...
RABBITMQ_URL=amqp://...
RABBITMQ_HOST=localhost
RABBITMQ_USERNAME=guest
RABBITMQ_PASSWORD=guest
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
JWT_SECRET=...
MAIL_USER=...
MAIL_PASSWORD=...
USER_SERVICE=http://user:5000
NEXT_PUBLIC_USER_SERVICE=https://user.abdnoman.com
NEXT_PUBLIC_CHAT_SERVICE=https://chat.abdnoman.com
```

---

## 📁 Project Structure

```
chat-app/
├── backend/
│   ├── user/                    # Authentication & user management
│   │   ├── src/
│   │   │   ├── config/          # DB, Redis, RabbitMQ, Cloudinary
│   │   │   ├── controllers/     # User CRUD + OTP logic
│   │   │   ├── middleware/      # Auth, Multer (avatar upload)
│   │   │   ├── model/           # Mongoose User model
│   │   │   └── routes/          # User API routes
│   │   ├── Dockerfile
│   │   └── package.json
│   ├── chat/                    # Real-time messaging
│   │   ├── src/
│   │   │   ├── config/          # DB, Socket.IO, Cloudinary
│   │   │   ├── controllers/     # Chat & message logic
│   │   │   ├── middleware/      # Auth, Multer (file upload)
│   │   │   ├── models/          # Chat & Message models
│   │   │   └── routes/          # Chat API routes
│   │   ├── Dockerfile
│   │   └── package.json
│   └── mail/                    # Email notifications
│       ├── src/
│       │   ├── consumer.ts      # RabbitMQ consumer
│       │   └── index.ts         # Express + health check
│       ├── Dockerfile
│       └── package.json
├── frontend/                    # Next.js application
│   ├── app/                     # App router pages
│   ├── components/              # React components
│   ├── context/                 # App & Socket context
│   ├── Dockerfile
│   └── package.json
├── readme-photos/               # README screenshots
├── docker-compose.yml           # Local development
├── docker-compose.prod.yml      # Production deployment
├── nginx.conf                   # Reverse proxy config
└── .env.example                 # Environment template
```

---

## 🔒 Security Features

- **JWT authentication** with 15-day token expiration
- **OTP-based login** — no password stored on server
- **Redis session** management with 5-minute OTP expiry
- **CORS protection** on all services with origin whitelisting
- **Non-root Docker containers** — runs as `nodejs` user
- **Environment variable** encryption via Dokploy
- **Rate limiting** on OTP requests (1 per 60 seconds)
- **Input validation** on all API endpoints
- **File type filtering** — only allowed MIME types accepted
- **File size limits** — 5MB for avatars, 10MB for chat files

---

## 🤝 Contributing

1. **Fork** the repository
2. Create a **feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. Open a **Pull Request**

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use it for learning and portfolio purposes.

---

<div align="center">

<br/>

## 👨‍💻 Abdullah Al Noman

<br/>

[![Email](https://img.shields.io/badge/Email-abdnoman093@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:abdnoman093@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-nomanit-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/nomanit)

[![Portfolio](https://img.shields.io/badge/Portfolio-abdnoman.com-FF6B6B?style=for-the-badge&logo=google-chrome&logoColor=white)](https://abdnoman.com)
[![GitHub](https://img.shields.io/badge/GitHub-nomancsediu-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nomancsediu)

<br/>

⭐ **Star this repo if you find it helpful!** ⭐

</div>