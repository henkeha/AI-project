import { Box } from "@mui/material";
import Header from "@/components/header";
import Footer from "@/components/footer";
import getTrainingData from "./dataFetchers/getTrainingData";
import cleanData from "./modelTrainer/cleanData";
import { trainPredictionModel } from "./modelTrainer/modelHandler";
import PageBody from "@/components/pageBody";

export default async function Home() {

  const { books, categories } = await getTrainingData();

  const cleandData = cleanData(books);

  await trainPredictionModel(cleandData, categories);


  return (
    <Box>
      <Header />
      <PageBody
        bookCategories={categories}
      />
      <Footer />
    </Box>
  );
}
