import React from "react";
import MainPage from "./pages/MainPage";
import ListPage from "./pages/ListPage";
import ScanPage from "./pages/ScanPage";
import ScanFailPage from "./pages/ScanFailPage";
import BuyPage from "./pages/BuyPage";
import PayPage from "./pages/PayPage";
import PayFailPage from "./pages/PayFailPage";
import { Header } from "./components/layout/Header";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/scanfail" element={<ScanFailPage />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/pay" element={<PayPage />} />
        <Route path="/payfail" element={<PayFailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
