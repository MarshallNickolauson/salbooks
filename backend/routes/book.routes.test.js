import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import bookRoutes from '../routes/book.routes.js';
import Book from '../models/book.model.js';

const app = express();
app.use(express.json());
app.use('/api/books', bookRoutes);

beforeAll(async () => {
    const url = `mongodb://127.0.0.1:27017/testdb`;
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterEach(async () => {
    await Book.deleteMany();
});

afterAll(async () => {
    await mongoose.connection.close();
});

const bookData = [
    {
        title: 'journey-through-the-unknown',
        introduction: 'An exploration of mysterious lands and ancient secrets.',
        preface:
            'This tale is a culmination of experiences and legends passed down through generations.',
        parts: [
            {
                part: 1,
                title: 'The Beginning of the Quest',
                preface: 'Every journey starts with a spark of curiosity.',
                chapters: [
                    {
                        chapter: 1,
                        title: 'The First Encounter',
                        content:
                            'It was a foggy morning when they first met, setting the stage for an unforgettable adventure...',
                    },
                    {
                        chapter: 2,
                        title: 'Hidden Paths',
                        content:
                            'A hidden path led them to new discoveries, filled with challenges and surprises...',
                    },
                    {
                        chapter: 3,
                        title: 'Voices in the Dark',
                        content:
                            'Whispers in the shadows kept them on edge, but their determination pushed them forward...',
                    },
                    {
                        chapter: 4,
                        title: 'The River of Time',
                        content:
                            'The river carried more than water; it carried stories of the past waiting to be revealed...',
                    },
                    {
                        chapter: 5,
                        title: 'The Mysterious Map',
                        content:
                            'An ancient map found by chance held the key to their future journey...',
                    },
                ],
            },
            {
                part: 2,
                title: 'Trials and Triumphs',
                preface: 'Endurance is tested in the face of uncertainty.',
                chapters: [
                    {
                        chapter: 6,
                        title: 'The Desert of Echoes',
                        content:
                            'Sand stretched endlessly, echoing their doubts and fears...',
                    },
                    {
                        chapter: 7,
                        title: 'The Hidden Fortress',
                        content:
                            'They stumbled upon a fortress that promised safety but held many secrets...',
                    },
                    {
                        chapter: 8,
                        title: 'Allies and Betrayals',
                        content:
                            'New friends were made and old loyalties tested as they continued their journey...',
                    },
                    {
                        chapter: 9,
                        title: 'The Storm of Ages',
                        content:
                            'A storm unlike any other brought them face-to-face with their inner demons...',
                    },
                    {
                        chapter: 10,
                        title: 'The Dawn of Resolve',
                        content:
                            'With the storm behind them, they found a new sense of purpose and unity...',
                    },
                ],
            },
            {
                part: 3,
                title: 'The Final Stand',
                preface:
                    'Everything they had learned and endured led to this moment.',
                chapters: [
                    {
                        chapter: 11,
                        title: 'The Return Home',
                        content:
                            'Returning to familiar grounds, they realized how much they had changed...',
                    },
                    {
                        chapter: 12,
                        title: 'The Last Battle',
                        content:
                            'The greatest challenge awaited them, demanding every ounce of their courage...',
                    },
                    {
                        chapter: 13,
                        title: 'Sacrifice and Glory',
                        content:
                            'Sacrifices were made, and true heroism was revealed in their darkest hour...',
                    },
                    {
                        chapter: 14,
                        title: 'A New Dawn',
                        content:
                            'Victory came at a price, but it brought the promise of a brighter future...',
                    },
                    {
                        chapter: 15,
                        title: 'Legends Never Die',
                        content:
                            'Their story became a legend, passed down to inspire future generations...',
                    },
                ],
            },
        ],
        aboutAuthor:
            'This story was penned by a world-renowned adventurer and storyteller who has dedicated their life to chronicling tales of bravery and discovery.',
        color: 'Golden',
    },
];

describe('Book Routes', () => {
    beforeEach(async () => {
        await Book.create(bookData);
    });

    it('should fetch all books', async () => {
        const res = await request(app).get('/api/books');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(1);
    });

    it('should fetch all book details', async () => {
        const res = await request(app).get('/api/books/all');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(1);
    });

    it('should fetch book introduction by book title', async () => {
        const res = await request(app).get(
            `/api/books/journey-through-the-unknown/introduction`
        );
        expect(res.statusCode).toEqual(200);
        expect(res.body.introduction).toEqual(bookData[0].introduction);
    });

    it('should fetch book preface by book title', async () => {
        const res = await request(app).get(
            `/api/books/journey-through-the-unknown/preface`
        );
        expect(res.statusCode).toEqual(200);
        expect(res.body.preface).toEqual(bookData[0].preface);
    });

    bookData[0].parts.forEach((part) => {
        it(`should fetch part preface by book title and part number ${part.part}`, async () => {
            const res = await request(app).get(
                `/api/books/journey-through-the-unknown/parts/${part.part}/preface`
            );
            expect(res.statusCode).toEqual(200);
            expect(res.body.preface).toEqual(part.preface);
        });

        part.chapters.forEach((chapter, chapterIndex) => {
            it(`should fetch chapter content by book title, part number ${part.part}, and chapter number ${chapter.chapter}`, async () => {
                const res = await request(app).get(
                    `/api/books/journey-through-the-unknown/parts/${part.part}/chapters/${chapter.chapter}/content`
                );
                expect(res.statusCode).toEqual(200);
                expect(res.body.content).toEqual(chapter.content);
            });
        });
    });

    it('should fetch author content by title', async () => {
        const res = await request(app).get(
            `/api/books/journey-through-the-unknown/author/about`
        );
        expect(res.statusCode).toEqual(200);
        expect(res.body.aboutAuthor).toEqual(bookData[0].aboutAuthor);
    });
});
