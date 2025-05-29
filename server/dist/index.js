"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const db_1 = __importDefault(require("./config/db"));
(0, db_1.default)();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    },
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
app.use('/api/auth', authRoutes_1.default);
app.use('/api/orders', orderRoutes_1.default);
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    socket.on('locationUpdate', (data) => {
        console.log('Location received:', data);
        socket.broadcast.emit('location', data);
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});
const USEDPORT = 5000;
server.listen(5000, () => {
    console.log(`Server running on port ${USEDPORT}`);
});
