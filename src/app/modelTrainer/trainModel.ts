import { Book } from "../dataFetchers/getTrainingData";
import * as tf from "@tensorflow/tfjs";

export const trainModel = async (books: Book[], categories: string[]) => {

    const inputs = books.map(book =>
        categories.map(category => (book.volumeInfo.categories.includes(category) ? 1 : 0))
    );

    const labels = books.map((_, bookIdx) =>
        Array.from({ length: books.length }, (_, idx) => (idx === bookIdx ? 1 : 0))
    );

    const inputTensor = tf.tensor2d(inputs);
    const labelTensor = tf.tensor2d(labels);


    tf.disposeVariables();
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