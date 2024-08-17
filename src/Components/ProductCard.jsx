import React from "react";

const ProductCard = ({ product }) => {
  return (
    <>
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-bold">{product.productName}</h2>
      <img src={product.productImage} alt="" />
      <p className="text-gray-600">Brand: {product.brand}</p>
      <p className="text-gray-600">Category: {product.category}</p>
      <p className="text-gray-800 font-semibold">Price: ${product.price}</p>
      <p className="text-gray-500 text-sm">Added on: {product.createdAt }</p>
    </div>
    <div>
      <div className="card bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      Shoes!
      <div className="badge badge-secondary">NEW</div>
    </h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <div className="badge badge-outline">Fashion</div>
      <div className="badge badge-outline">Products</div>
    </div>
  </div>
</div>
    </div>
    </>
  );
};

export default ProductCard;
