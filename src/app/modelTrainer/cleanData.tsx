import { Book } from "../dataFetchers/getTrainingData";

const cleanData = (books: Book[]) => {
    const booksWithCategories = removeBooksWithoutCategories(books);
    return booksWithCategories;
}

const removeBooksWithoutCategories = (books: Book[]) => books.filter(book => !!book.volumeInfo.categories?.length)

export default cleanData;