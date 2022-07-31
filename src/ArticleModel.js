import mongoose from 'mongoose'
const Schema = mongoose.Schema;

export const ArticlesSchema = Schema({
    name: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
    },
    comments: {
        type: Array,
    },
});