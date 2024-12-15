import React from "react";
import { Box, Card, CardContent, CardMedia, Typography, Grid, Rating } from "@mui/material";
import { Book } from "@/app/dataFetchers/getTrainingData";

interface BookListProps {
    books: Book[];
}

const BookList = ({ books }: BookListProps) => {
    return (
        <Box sx={{ flexGrow: 1, padding: 2, maxWidth: "80rem" }}>
            <Grid container spacing={3}>
                {books.map((book) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                        <Card sx={{ maxWidth: 345, height: "100%" }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={book.volumeInfo.imageLinks.smallThumbnail}
                                alt={book.volumeInfo.title}
                            />
                            <CardContent>
                                <Typography variant="h6" component="div" gutterBottom>
                                    {book.volumeInfo.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    sx={{ marginTop: 1 }}
                                >
                                    Categories: {book.volumeInfo.categories.join(", ")}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default BookList;