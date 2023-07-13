import React from "react";
import ProductBox from "../list/ProductBox";

interface ProductCardProps {
  id: string;
  image: string;
  productName: string;
  price: string;
  stock: any;
}

export default function SearchProductList({
  ProductList,
}: {
  ProductList: ProductCardProps[];
}) {
  return (
    <div className="grid grid-cols-4 gap-10 mt-10">
      {ProductList &&
        ProductList.map((v, index) => (
          <ProductBox
            key={index}
            id={v.id}
            image={v.image}
            productName={v.productName}
            price={v.price}
            stock={v.stock}
          />
        ))}
    </div>
  );
}
