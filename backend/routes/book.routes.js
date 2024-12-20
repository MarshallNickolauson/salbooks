import express from 'express';
const router = express.Router();
import {
    createBook,
    deleteBookById,
    getAuthorContentByTitle,
    getBookById,
    getBookIntroductionByTitle,
    getBookPrefaceByTitle,
    getBooks,
    getBooksAll,
    getChapterContentByTitleAndNumbers,
    getPartPrefaceByTitleAndNumber,
    updateBook,
    updateBookIntroductionByTitle,
    updateBookPrefaceByTitle,
    updateChapterContentByTitleAndNumbers,
    updatePartPrefaceByTitleAndNumber,
} from '../controllers/book.controller.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getBooks).post(protect, admin, createBook);
router.route('/all').get(getBooksAll);
router
    .route('/:bookTitle/introduction')
    .get(getBookIntroductionByTitle)
    .put(updateBookIntroductionByTitle);
router
    .route('/:bookTitle/preface')
    .get(getBookPrefaceByTitle)
    .put(updateBookPrefaceByTitle);
router
    .route('/:bookTitle/parts/:partNumber/preface')
    .get(getPartPrefaceByTitleAndNumber)
    .put(updatePartPrefaceByTitleAndNumber);
router
    .route('/:bookTitle/parts/:partNumber/chapters/:chapterNumber/content')
    .get(getChapterContentByTitleAndNumbers)
    .put(updateChapterContentByTitleAndNumbers);
router.route('/:bookTitle/author/about').get(getAuthorContentByTitle);

router.route('/:id').get(getBookById).put(protect, admin, updateBook).delete(protect, admin, deleteBookById);

export default router;
