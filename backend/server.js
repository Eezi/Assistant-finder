import express from'express';
import dotenv from 'dotenv';
import colors from 'colors';
import path from 'path';
import connectDB from './config/db.js';
import chatRoutes from './routes/chatRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import uploadRoutes from './routes/uploadRoutes.js';
import morgan from 'morgan';
import chat from './chat/chat.js'
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

connectDB();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  //origin: '*',
  //methods: ['GET', 'POST'],
  //wsEngine: 'ws',
});

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json());

chat(io);

app.use('/api/chats', chatRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if(process.env.NODE_ENV === 'production'){
   app.use(express.static(path.join(__dirname, '/frontend/build'))) 
   app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => {
    res.send('API is running now...')
})
}

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 6000;

server.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
