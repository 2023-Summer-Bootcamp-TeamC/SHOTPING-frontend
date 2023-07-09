import React, { useState } from "react";
import { SearchBox } from "../components/list/SearchBox";
import ProductBox from "../components/list/ProductBox";

export default function ListPage() {
  return (
    <div className="w-full px-20 mt-12 ml-4">
      <div>
        <SearchBox />
      </div>
      <div className="grid grid-cols-4 gap-y-10 mt-14 mb-20">
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
      </div>
    </div>
  );
}
