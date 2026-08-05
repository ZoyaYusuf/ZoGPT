import { Schema, model } from "mongoose";

const MessageSchema = new Schema({ //full msg
    role : {
        type: String,
        enum: ['user','assistant'],
        required: true
    },
    content:{
        type: String,
        required: true
    },
    timestramp:{
        type: Date,
        default: Date.now
    }
});

const ThreadSchema = new Schema({ //side panel history
    threadId:{
        type: String,
        required: true,
        unique: true
    },
    title:{
        type: String,
        deafult: "New Chat"
    },
    messages: [MessageSchema],
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },

});

export default model("Thread", ThreadSchema);