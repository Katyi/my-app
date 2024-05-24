import { ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { theme } from "./utils/Theme";
import { AOS_INITIAL_OPTIONS } from "./dataset/Animations";

import MainOutlet from "./pages/MainOutlet/MainOutlet";
import { lazy } from "react";

const StartPage =lazy(()=> import("./pages/StartPage/StartPage"));
const AboutPage =lazy(()=> import("./pages/AboutPage/AboutPage"));
const AdvancedSearchPage =lazy(()=> import("./pages/AdvancedSearchPage/AdvancedSearchPage"));
const CitationPage =lazy(()=> import("./pages/CitationPage/CitationPage"));
const FloraPage =lazy(()=> import("./pages/FloraPage/FloraPage"));
const LexemePage =lazy(()=> import("./pages/LexemePage/LexemePage"));
const NewsPage =lazy(()=> import("./pages/NewsPage/NewsPage"));
const PicturePage =lazy(()=> import("./pages/PicturePage/PicturePage"));
const PlantPage =lazy(()=> import("./pages/PlantPage/PlantPage"));
const SourcePage =lazy(()=> import("./pages/SourcePage/SourcePage"));
const AllSourcesPage =lazy(()=> import("./pages/AllSourcesPage/AllSourcesPage"));
const PostPage =lazy(()=> import("./pages/PostPage/PostPage"));
const ChartsPage =lazy(()=> import("./pages/ChartsPage/ChartsPage"));

function App() {
  AOS.init(AOS_INITIAL_OPTIONS)
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<MainOutlet />}>
          <Route  index element={<StartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/adv-search" element={<AdvancedSearchPage />} />
          <Route path="/blog" element={<FloraPage/>} />
          <Route path="/blog/:id" element={<PostPage/>} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/plant/:id" element={<PlantPage />} />
          <Route path="/lexeme/:id" element={<LexemePage />} />
          <Route path="/source/:id" element={<SourcePage />} />
          <Route path="/citation/:id" element={<CitationPage />} />
          <Route path="/picture/:id" element={<PicturePage />} />
          <Route path="/all-sources" element={<AllSourcesPage />} />
          <Route path="/charts" element={<ChartsPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;