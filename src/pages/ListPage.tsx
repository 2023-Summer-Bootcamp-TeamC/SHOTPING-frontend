import React, { useState } from "react";
import { SearchBox } from "../components/list/SearchBox";
import ProductBox from "../components/list/ProductBox";
import ProductKey from "../components/list/ProductKey";
import ProductList from "../components/list/ProductList";

export default function ListPage() {
  return (
    <div className="w-full px-20 mt-12">
      <div className="ml-5">
        <SearchBox />
      </div>
      <div className="h-3/4 overflow-y-auto scrollbar-hide">
        <ProductKey ProductList={ProductList} />
      </div>
    </div>
  );
}
