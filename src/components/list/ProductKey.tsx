import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductBox from "./ProductBox";
import Loading from "../common/Loading";

export interface Product {
  id: number;
  product_name: string;
  product_price: number;
  product_stock: number;
  image_url: string;
}

interface ApiResponse {
  meta: {
    page: number;
    pages: number;
    prev_page: null | number;
    next_page: number | null;
    total_count: number;
    has_prev: boolean;
    has_next: boolean;
  };
  data: Product[];
}

export default function ProductKey() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (page > 0) {
      fetchData();
    }
  }, [page]);

  const fetchData = async () => {
    if (isLoading) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get<ApiResponse>(
        `/api/v1/products?page=${page}`,
      );
      const data = response.data.data;
      setProductList((prevList) => [...prevList, ...data]);
      setPage(response.data.meta.next_page || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMoreData = () => {
    fetchData();
  };

  return (
    <InfiniteScroll
      dataLength={productList.length}
      next={fetchMoreData}
      hasMore={page !== 0}
      loader={<Loading />}
      endMessage={<></>}
      className="grid grid-cols-4  lg:gap-10 gap-x-20 md:ml-0 ml-12  mt-10 transition-all duration-700 "
      style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
    >
      {productList.map((product, index) => (
        <ProductBox
          key={index}
          id={product.id}
          image={product.image_url}
          productName={product.product_name}
          price={product.product_price}
          stock={product.product_stock}
        />
      ))}
    </InfiniteScroll>
  );
}
