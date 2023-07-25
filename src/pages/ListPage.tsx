import { SearchBox } from "../components/list/SearchBox";
import ProductKey from "../components/list/ProductKey";

/* 상품 리스트 페이지  */

export default function ListPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center h-full">
      <div className="pb-6 w-3/4">
        <SearchBox />
      </div>
      <div className="h-3/4 w-3/4 overflow-y-auto scrollbar-hide">
        <ProductKey />
      </div>
    </div>
  );
}
