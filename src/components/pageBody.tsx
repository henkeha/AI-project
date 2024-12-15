'use client'
import { Book } from "@/app/dataFetchers/getTrainingData";
import { getRecommendedBooks } from "@/app/modelTrainer/modelHandler";
import CheckboxList, { CheckedItemsState } from "@/components/checkBoxList";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import BookList from "./bookList";

type Props = {
    bookCategories: string[]
}

const PageBody = ({ bookCategories }: Props) => {
    const [categories, setCategories] = useState<CheckedItemsState>(
        bookCategories.reduce((acc, item) => ({ ...acc, [item]: false }), {})
    );

    const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);

    const handleRecommendButtonClick = async () => {
        const checkedItems = Object.keys(categories).filter((item) => categories[item])
        getRecommendedBooks(checkedItems)
            .then((newRecommendedBooks) => {
                setRecommendedBooks(newRecommendedBooks);
            });
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CheckboxList
                labels={bookCategories}
                checkedItems={categories}
                setCheckedItems={setCategories}
            />

            <Button
                sx={{ maxHeight: '6rem', minWidth: "4rem" }}
                variant="contained"
                color="primary"
                onClick={handleRecommendButtonClick}>
                Recommend books
            </Button>

            <BookList books={recommendedBooks} />
        </Box>

    )

}

export default PageBody;