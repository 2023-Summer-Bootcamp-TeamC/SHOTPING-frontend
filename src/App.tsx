import React from "react";
import MainPage from "./pages/MainPage";
import ListPage from "./pages/ListPage";
import SearchResultPage from "./pages/SearchResultPage";
import ScanPage from "./pages/ScanPage";
import ScanFailPage from "./pages/ScanFailPage";
import BuyPage from "./pages/BuyPage";
import PayPage from "./pages/PayPage";
import PayFailPage from "./pages/PayFailPage";
import NowPayingPage from "./pages/NowPayingPage";
import { Header } from "./components/layout/Header";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <section className="grow min-h-[calc(100vh-5rem)] h-[calc(100vh-5rem)]">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/list" element={<ListPage />} />
            <Route path="/searchresult" element={<SearchResultPage />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/scanfail" element={<ScanFailPage />} />
            <Route path="/buy" element={<BuyPage />} />
            <Route path="/pay" element={<PayPage />} />
            <Route path="/payfail" element={<PayFailPage />} />
            <Route path="/nowpaying" element={<NowPayingPage />} />
          </Routes>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
