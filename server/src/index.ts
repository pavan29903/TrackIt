// src/index.ts
import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
// import dotenv from 'dotenv';
import connectDB from './config/db';
// import { PORT } from './config/env';

// dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
app.use(express.json());

// Routes
import authRoutes from './routes/authRoutes';
import orderRoutes from './routes/orderRoutes';

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// WebSocket logic
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('locationUpdate', (data) => {
    console.log('Location received:', data);
    socket.broadcast.emit('location', data); // send to customers
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const USEDPORT = 3000;
server.listen(3000, () => {
  console.log(`Server running on port ${USEDPORT}`);
});
