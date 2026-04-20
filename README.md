# Yogesh AI Portfolio Chatbot

A premium AI-powered chatbot built with **Next.js**, **Tailwind CSS**, **Framer Motion**, and the **Grok-2 API** (xAI). This chatbot is specifically trained on Yogesh's professional portfolio data.

## Features
- **Grok-2 Integration**: Leverages the latest xAI model for professional and accurate responses.
- **Midnight Ebony Theme**: A sophisticated visual design that matches the "Midnight Ebony & Champagne Bronze" portfolio aesthetic.
- **Streaming Responses**: Real-time message streaming for a fluid user experience.
- **Native Language Support**: Fully aware of Tamil and English communication.
- **Technical Expertise**: Deep knowledge of Yogesh's RAG, AI/ML, and MLOps projects.

## Tech Stack
- **Core**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI**: OpenAI SDK (configured for xAI Grok)
- **Icons**: Lucide React

## Getting Started

### 1. Prerequisites
- Node.js installed.
- A Grok API Key from [xAI Console](https://console.x.ai).

### 2. Setup
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root and add your Grok API key:
```env
GROK_API_KEY=your_xai_grok_api_key_here
```

### 4. Run Locally
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to see the chatbot.

## Deployment on Vercel

### Option 1: Vercel CLI (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root.
3. Add the `GROK_API_KEY` when prompted or in the Vercel dashboard.

### Option 2: GitHub Integration
1. Push this code to a GitHub repository.
2. Connect the repository to your Vercel Dashboard.
3. Add the Environment Variable `GROK_API_KEY` in the project settings.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F%5Byour-user%5D%2Fai-chatbot&env=GROK_API_KEY)
