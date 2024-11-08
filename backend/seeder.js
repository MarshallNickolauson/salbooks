import mongoose from "mongoose";
import dotenv from "dotenv";
import books from './data/books.js';
import Book from './models/book.model.js';
import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Book.deleteMany();
    await Book.insertMany(books);
    console.log("Data Imported!".green.inverse);
    const res = await Book.find();
    console.log(res);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

importData();