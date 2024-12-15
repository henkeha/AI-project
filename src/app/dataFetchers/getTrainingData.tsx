import { getMaxAge } from "next/dist/server/image-optimizer"

export type Book = {
    kind: string,
    id: string,
    etag: string
    selfLink: string,
    volumeInfo: {
        title: string,
        authors: string[],
        publishedDate: string,
        categories: string[],
        imageLinks: {
            smallThumbnail: string,
            thumbnail: string,
        },
        language: string
    }
}


type ResponseData = {
    items: Book[]
}

const getTrainingData = async () => {

    const books = await getBooks()
    const categories = extractCategories(books)

    return {books, categories};
}

const fetchData = async (url: string) => {
    const response = await fetch(url);

    const data = response.json() as unknown as ResponseData;
    return data;
}



export default getTrainingData;

function extractCategories(books: Book[]) {
    const genreList = books
        .flatMap(book => book.volumeInfo.categories)
        .filter(category => !!category)
        .sort()
    const genreSet = new Set(genreList);
    return Array.from(genreSet.values());
}

async function getBooks() {
    const apiLink = "https://www.googleapis.com/books/v1/volumes"

    const categories = ["magi", "historia", "deckare", "romantik", "fantasy"]
    const promiseList = categories.map(async (genre) => await fetchData(`${apiLink}?q=${genre}&maxResults=40`))
    const data = await Promise.all(promiseList)

    const books = data.flatMap(books => books.items)
    return books
}
