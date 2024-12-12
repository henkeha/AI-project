import Image from "next/image";
import styles from "./page.module.css";
import { Box } from "@mui/material";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CheckboxList from "@/components/checkBoxList";
import getTrainingData from "./dataFetchers/getTrainingData";

export default async function Home() {

  const {books, genres} = await getTrainingData();


  return (
    <Box>
      <Header/>
      <CheckboxList labels={genres}/>
      <Footer/>
    </Box>
  );
}
