import React, { useState } from "react";
import { SearchBox } from "../components/list/SearchBox";
import ProductBox from "../components/list/ProductBox";
import ProductKey from "../components/list/ProductKey";
import ProductList from "../components/list/ProductList";

export default function ListPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center h-full">
      <div className="pb-5 w-3/4">
        <SearchBox />
      </div>
      <div className="h-3/4 w-3/4 overflow-y-auto scrollbar-hide">
        <ProductKey ProductList={ProductList} />
      </div>
    </div>
  );
}
