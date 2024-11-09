import expressAsyncHandler from 'express-async-handler';
import Book from '../models/book.model.js';

// @desc    Fetch books (custom response)
// @route   GET /api/books
// @access  Public
export const getBooks = expressAsyncHandler(async (req, res) => {
    const books = await Book.find(
        {},
        '-introduction -preface -parts.preface -parts.chapters.content -aboutAuthor'
    );
    res.json(books);
});

// @desc    Fetch all books
// @route   GET /api/books/all
// @access  Public
export const getBooksAll = expressAsyncHandler(async (req, res) => {
    const books = await Book.find({});
    res.json(books);
});

// @desc    Fetch book introduction by title
// @route   GET /api/books/:bookTitle/introduction
// @access  Public
export const getBookIntroductionByTitle = expressAsyncHandler(
    async (req, res) => {
        const book = await Book.findOne(
            { title: req.params.bookTitle },
            'introduction'
        );
        if (book) {
            res.json(book);
        } else {
            res.status(404);
            throw new Error('Book not found');
        }
    }
);

// @desc    Update book introduction by title
// @route   PUT /api/books/:bookTitle/introduction
// @access  Private/Admin
export const updateBookIntroductionByTitle = expressAsyncHandler(async (req, res) => {
    const book = await Book.findOne({ title: req.params.bookTitle });
    if (book) {
        book.introduction = req.body.introduction;
        const updatedBook = await book.save();
        res.json(updatedBook);
    }
});

// @desc    Fetch book preface by title
// @route   GET /api/books/:bookTitle/preface
// @access  Public
export const getBookPrefaceByTitle = expressAsyncHandler(async (req, res) => {
    const book = await Book.findOne({ title: req.params.bookTitle }, 'preface');
    if (book) {
        res.json(book);
    } else {
        res.status(404);
        throw new Error('Book not found');
    }
});

// @desc    Fetch part preface by title and part number
// @route   GET /api/books/:bookTitle/parts/:partNumber/preface
// @access  Public
export const getPartPrefaceByTitleAndNumber = expressAsyncHandler(
    async (req, res) => {
        const book = await Book.findOne(
            { title: req.params.bookTitle },
            'parts'
        );
        if (book) {
            const part = book.parts.find(
                (part) => part.part === parseInt(req.params.partNumber)
            );
            if (part) {
                res.json({
                    _id: part._id,
                    preface: part.preface,
                });
            } else {
                res.status(404);
                throw new Error('Part not found');
            }
        } else {
            res.status(404);
            throw new Error('Book not found');
        }
    }
);

// @desc    Fetch chapter content by title, part number, and chapter number
// @route   GET /api/books/:bookTitle/parts/:partNumber/chapters/:chapterNumber/content
// @access  Public
export const getChapterContentByTitleAndNumbers = expressAsyncHandler(
    async (req, res) => {
        const book = await Book.findOne(
            { title: req.params.bookTitle },
            'parts'
        );
        if (book) {
            const part = book.parts.find(
                (part) => part.part === parseInt(req.params.partNumber)
            );
            if (part) {
                const chapter = part.chapters.find(
                    (chapter) =>
                        chapter.chapter === parseInt(req.params.chapterNumber)
                );
                if (chapter) {
                    res.json({
                        _id: chapter._id,
                        chapter: chapter.chapter,
                        title: chapter.title,
                        content: chapter.content,
                    });
                } else {
                    res.status(404);
                    throw new Error('Chapter not found');
                }
            } else {
                res.status(404);
                throw new Error('Part not found');
            }
        } else {
            res.status(404);
            throw new Error('Book not found');
        }
    }
);

// @desc    Fetch author content by title
// @route   GET /api/books/:bookTitle/author/about
// @access  Public
export const getAuthorContentByTitle = expressAsyncHandler(async (req, res) => {
    const book = await Book.findOne(
        { title: req.params.bookTitle },
        'aboutAuthor'
    );
    if (book) {
        res.json(book);
    } else {
        res.status(404);
        throw new Error('Book not found');
    }
});