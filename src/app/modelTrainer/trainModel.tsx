import { Book } from "../dataFetchers/getTrainingData";
import * as tf from "@tensorflow/tfjs";


export const trainModel = async (books: Book[], categories: string[]) => {

    const categoryIndex = new Map(categories.map((cat, idx) => [cat, idx]));
    const indexCategory = new Map(categories.map((cat, idx) => [idx, cat]));

    const inputs = books.map(book =>
        categories.map(category => (book.volumeInfo.categories.includes(category) ? 1 : 0))
    );

    const labels = books.map((_, bookIdx) =>
        Array.from({ length: books.length }, (_, idx) => (idx === bookIdx ? 1 : 0))
    );

    const inputTensor = tf.tensor2d(inputs);
    const labelTensor = tf.tensor2d(labels);


    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [categories.length], units: 128, activation: "relu" }));
    model.add(tf.layers.dense({ units: books.length, activation: "softmax" }));

    model.compile({
        optimizer: tf.train.adam(),
        loss: "categoricalCrossentropy",
        metrics: ["accuracy"],
    });

    await model.fit(inputTensor, labelTensor, {
        epochs: 20,
        batchSize: 32,
    });


    return { model };
}

export async function recommendBooks(inputCategories: string[], categories: string[], model: tf.Sequential, books: Book[]) {
    
    const inputVector = categories.map(category =>
        inputCategories.includes(category) ? 1 : 0
    );

    const prediction = model.predict(tf.tensor2d([inputVector])) as tf.Tensor;
    const predictedIndices = (await prediction.array()) as number[][];
    const recommendedBookIndex = predictedIndices[0]
        .map((score, idx) => ({ score, idx }))
        .sort((a, b) => b.score - a.score)
        .map(item => item.idx);

    return recommendedBookIndex.map(idx => books[idx]);
};