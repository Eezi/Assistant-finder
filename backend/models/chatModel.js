import mongoose from 'mongoose';

const chatSchema = mongoose.Schema({
    createdBy: {
        type: String,
        required: true
    },
    participatedUser: {
        type: String,
        required: true
    }, 
    createdAt: {
        type: Date,
        required: true
    }, 
    messages: [
        {
            createdBy: { type: String, required: true },
            createdAt: { type: Date, required: true },
            message: { type: String, required: true },
            receiverHasRead: { type: Boolean, required: false },
        }
    ],
}, {
    timestapmps: true
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;