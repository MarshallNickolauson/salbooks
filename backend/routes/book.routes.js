import express from 'express';
const router = express.Router();
import {
    getAuthorContentByTitle,
    getBookIntroductionByTitle,
    getBookPrefaceByTitle,
    getBooks,
    getBooksAll,
    getChapterContentByTitleAndNumbers,
    getPartPrefaceByTitleAndNumber,
    updateBookIntroductionByTitle,
    updateBookPrefaceByTitle,
    updateChapterContentByTitleAndNumbers,
    updatePartPrefaceByTitleAndNumber,
} from '../controllers/book.controller.js';

router.route('/').get(getBooks);
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

export default router;
