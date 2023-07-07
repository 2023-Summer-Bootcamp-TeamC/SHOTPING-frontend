import React from "react";
import { SearchBox } from "../components/list/SearchBox";

export default function ListPage() {
  return (
    <div className="flex flex-col border mx-32 my-20">
      <SearchBox />
      <div className="my-20 border">hello</div>
    </div>
  );
}
