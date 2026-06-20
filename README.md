# 🌌 Chatheaven

Chatheaven is a premium, real-time collaboration workspace designed for modern teams, built on Next.js 15, React 19, and Tailwind CSS. Inspired by platforms like Discord and Slack, it delivers high-performance communication, voice/video calls, and file-sharing in a sleek, glassmorphic interface with advanced dark/light modes.

---

## ✨ Features

- **🚀 Real-Time Communication**
  - Instant text messaging inside channels.
  - Multi-user server/workspace chats and Direct Messages (DMs).
  - Webhook-like Pusher and WebSockets integration for low-latency synchronization.
  - Attachment uploads (images, PDFs, documents) with real-time progress.

- **🎙️ Audio & Video Channels**
  - WebRTC-powered voice calls and video meetings using **LiveKit**.
  - Screen-sharing, active speaker detection, and grid view layout.
  - Individual mute/unmute and camera toggles.

- **🗂️ Server & Channel Organization**
  - Flexible layout supporting **Text**, **Audio**, and **Video** channels.
  - Dynamic server invite links with auto-generated **QR Codes** for quick joining.
  - Custom server branding (logos, images, and server names).

- **🛡️ Advanced Member & Role Management**
  - Role-based permissions (`ADMIN`, `MODERATOR`, `GUEST`).
  - Admins can manage member roles, kick members, or generate fresh invite codes.
  - Custom server settings modals.

- **🎨 Sleek, Fluid UX**
  - Harmonious custom CSS gradients, glassmorphism, and Outfit typography.
  - Micro-animations and transitions powered by **Framer Motion**.
  - Seamless dark and light theme switching via **Next Themes** & Radix UI.
  - Fully responsive design optimized for desktop, tablet, and mobile views.

---

## 🛠️ Technology Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | [Next.js 15](https://nextjs.org/) | App Router, Turbopack compilation |
| **State & Logic** | [React 19](https://react.dev/) / [Zustand](https://github.com/pmndrs/zustand) | Concurrent UI features, clean state hooks |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Responsive styles, custom theme variables |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Production-ready transitions and layout animations |
| **Auth** | [Clerk](https://clerk.com/) | Secure OAuth, email sign-in/up, and session controls |
| **Database** | [MySQL](https://www.mysql.com/) / [Aiven](https://aiven.io/) | Relational database hosting |
| **ORM** | [Prisma](https://www.prisma.io/) | Database modeling and migrations schema |
| **File Uploads** | [UploadThing](https://uploadthing.com/) | Direct client-to-storage secure file uploading |
| **WebRTC Calls** | [LiveKit](https://livekit.io/) | Secure voice, video, and screen share pipelines |
| **Real-time Sync**| [Pusher](https://pusher.com/) / [Socket.io](https://socket.io/) | Bi-directional messaging channels |

---

## 🏗️ Database Schema

The relational database is orchestrated using Prisma with the following models:

- `Profile`: Holds user data integrated with Clerk authentication.
- `Server`: Workspace containers containing channels, members, and custom settings.
- `Member`: Represents server participants with roles (`ADMIN`, `MODERATOR`, `GUEST`).
- `Channel`: Text, Audio, or Video segments under a server.
- `Message`: Chat messages sent inside text channels (supports attachments).
- `Conversation`: Direct message session linking two members.
- `DirectMessage`: Message entries inside private DMs.

---

## 🚀 Quick Start

### 1. Prerequisites
Ensure you have the following installed on your machine:
- Node.js (v18.x or later)
- npm or yarn
- A running MySQL database instance

### 2. Clone and Install
Clone the project repository and install the dependencies:
```bash
git clone https://github.com/patelalok1309/discord-next-js.git
cd discord-clone
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and configure the environment variables:
```env
# Clerk Authentication Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Database Connectivity
DATABASE_URL="mysql://username:password@host:port/database"

# UploadThing Token for Uploads
UPLOADTHING_TOKEN="your_uploadthing_token"

# Pusher Channels Configuration (Real-time events)
PUSHER_APP_ID="your_pusher_app_id"
NEXT_PUBLIC_PUSHER_APP_KEY="your_pusher_app_key"
PUSHER_SECRET="your_pusher_secret"
PUSHER_CLUSTER="your_pusher_cluster"

# LiveKit WebRTC Configuration (Voice/Video channels)
LIVEKIT_API_KEY="your_livekit_api_key"
LIVEKIT_API_SECRET="your_livekit_api_secret"
NEXT_PUBLIC_LIVEKIT_URL="wss://your-livekit-url"

# Scheduler API Token
CRON_SECRET_TOKEN="your_random_uuid_or_secret"
```

### 4. Database Setup
Push the schema definitions to your database and generate the Prisma Client:
```bash
npx prisma generate
npx prisma db push
```

### 5. Running the Application
Run the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the port specified in terminal) in your browser to see Chatheaven in action!

---

## 📂 Project Structure

```text
├── app/                  # Next.js App Router routes (setup, main app, invites)
├── pages/                # Pages Router paths (mainly WebSocket API legacy sockets)
├── components/           # Reusable React components (chat, server, home, UI elements)
├── hooks/                # Custom React hook utilities (sockets, modal actions)
├── lib/                  # Library bindings (Prisma client, Pusher, utilities)
├── prisma/               # Prisma Database modeling schema
├── public/               # Static assets and brand logos
└── middleware.ts         # Route guards and authentication rules (Clerk middleware)
```
