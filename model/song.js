import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    album: {
        type: String,
    },
    cover: {
        type: String,
    },
    lyrics: {
        type: String,
        required: true
    }
})

export default mongoose.model("Song", dataSchema);