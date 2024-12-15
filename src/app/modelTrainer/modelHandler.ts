'use server'
import { Book } from "../dataFetchers/getTrainingData";
import * as tf from "@tensorflow/tfjs";
import { trainModel } from "./trainModel";
import { recommendBooks } from "./recommendBooks";

let model: tf.Sequential;
let allBooks: Book[];
let allCategories: string[];

export const trainPredictionModel = async (books: Book[], categories: string[]) => {
    allBooks = books;
    allCategories = categories;
    model = (await trainModel(books, categories)).model;
}

export const getRecommendedBooks = async (inputCategories: string[]) => {
    return await recommendBooks(inputCategories, allCategories, model, allBooks);
}