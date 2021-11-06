import { addNewMessage, readChatMessages } from '../controllers/chatController.js';

const messages = [];
const users = new Map();

const messageExpirationTimeMS = 50*60 * 1000;

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;

    socket.on('getMessages', () => this.getMessages());
    socket.on('getReadMessages', () => this.sendReadMessages());
    socket.on('message', (value) => this.handleMessage(value));
    socket.on('readMessages', (args) => this.readMessages(args));
    socket.on('disconnect', () => this.disconnect());
    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }
  
  sendMessage(message) {
      this.io.sockets.emit('message', message);
  }

  sendReadMessages(messages) {
      console.log('new read messages', messages)
      this.io.sockets.emit('readMessages', messages);
  }
  
  getMessages() {
    messages.forEach((message) => this.sendMessage(message));
  }

  readMessages = async(args) => {
    const data = await readChatMessages(args);
    this.sendReadMessages(data);
  }

  handleMessage = async(value) => {
    const message = {
      createdBy: value.userId,
      chatId: value.chatId,
      createdAt: new Date(),
      message: value.message,
    };
    const data = await addNewMessage(message)
    this.sendMessage(data);
  }

  disconnect() {
    users.delete(this.socket);
  }
}

function chat(io) {
  io.on('connection', (socket) => {
    new Connection(io, socket);   
  });
};

export default chat;
