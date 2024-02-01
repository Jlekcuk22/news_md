import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import NewsLIst from "./components/newsList";
import NewsDetails from "./components/NewsDetails";

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NewsLIst />} />
          <Route path="/newsdetails/:path" element={<NewsDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
