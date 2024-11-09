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
} from '../controllers/book.controller.js';

router.route('/').get(getBooks);
router.route('/all').get(getBooksAll);
router.route('/:bookTitle/introduction').get(getBookIntroductionByTitle);
router.route('/:bookTitle/preface').get(getBookPrefaceByTitle);
router
    .route('/:bookTitle/parts/:partNumber/preface')
    .get(getPartPrefaceByTitleAndNumber);
router
    .route('/:bookTitle/parts/:partNumber/chapters/:chapterNumber/content')
    .get(getChapterContentByTitleAndNumbers);
router.route('/:bookTitle/author/about').get(getAuthorContentByTitle);

export default router;
