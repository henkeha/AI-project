import { Book } from "../dataFetchers/getTrainingData";
import * as tf from "@tensorflow/tfjs";
import { trainModel, recommendBooks } from "./trainModel";


let model: tf.Sequential;
let allBooks: Book[];
let allCategories: string[];

export const trainPredictionModel = async (books: Book[], categories: string[]) => {

    if(model){
        return;
    }

    allBooks = books;
    allCategories = categories;
    model = (await trainModel(books, categories)).model;
}

export const getRecommendedBooks = async (inputCategories: string[]) => {

    if(!model){
        console.log("OBS! Can't recomend books before training model.")
        return [];
    }
    
    return await recommendBooks(inputCategories, allCategories, model, allBooks);

}