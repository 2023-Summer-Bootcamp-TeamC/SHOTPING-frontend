import React from "react";
import { SearchBox } from "../components/list/SearchBox";
import SearchProductList from "../components/search/SearchProductList";
import ProductList from "../components/list/ProductList";

export default function SearchResultPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center h-full">
      <div className="pb-6 w-3/4">
        <SearchBox />
      </div>
      <div className="h-3/4 w-3/4 overflow-y-auto scrollbar-hide">
        <SearchProductList ProductList={ProductList} />
      </div>
    </div>
  );
}
