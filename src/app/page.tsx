import Image from "next/image";
import styles from "./page.module.css";
import { Box } from "@mui/material";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CheckboxList from "@/components/checkBoxList";

export default function Home() {
  return (
    <Box>
      <Header/>
      <CheckboxList labels={['Fantasy', 'History', 'Drama']}/>
      <Footer/>
    </Box>
  );
}
