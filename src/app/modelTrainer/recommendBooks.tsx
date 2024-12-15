import * as tf from "@tensorflow/tfjs";
import { Book } from "../dataFetchers/getTrainingData";

export const recommendBooks = async (inputCategories: string[], categories: string[], model: tf.Sequential, books: Book[]) => {

    const inputVector = categories.map(category =>
        inputCategories.includes(category) ? 1 : 0
    );

    const prediction = model.predict(tf.tensor2d([inputVector])) as tf.Tensor;
    const predictedIndices = (await prediction.array()) as number[][];
    const recommendedBookIndex = predictedIndices[0]
        .map((score, idx) => ({ score, idx }))
        .sort((a, b) => b.score - a.score)
        .map(item => item.idx)
        .slice(0, 12);

    return recommendedBookIndex.map(idx => books[idx]);
};