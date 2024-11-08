import mongoose from 'mongoose';

const chapterSchema = mongoose.Schema({
    chapter: { type: Number, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
});

const partSchema = mongoose.Schema({
    part: { type: Number, required: true },
    title: { type: String, required: true },
    preface: { type: String },
    chapters: [chapterSchema],
});

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    introduction: { type: String },
    preface: { type: String },
    parts: [partSchema],
    aboutAuthor: { type: String, required: true },
    color: { type: String },
});

const Book = mongoose.model('Book', bookSchema);

export default Book;