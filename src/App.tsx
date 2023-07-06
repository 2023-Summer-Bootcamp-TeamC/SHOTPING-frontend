import React from "react";
import MainPage from "./pages/mainPage";
import ListPage from "./pages/listPage";
import ScanPage from "./pages/scanPage";
import ScanFailPage from "./pages/scanFailPage";
import BuyPage from "./pages/buyPage";
import PayPage from "./pages/payPage";
import PayFailPage from "./pages/payFailPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
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
