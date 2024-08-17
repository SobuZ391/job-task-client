import React from "react";
import { FaRegStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <>
    
    <div>
      <div className="card bg-base-100 md:w-full w-96 h-[28rem] shadow-xl">
  <figure>
    <img
    className="w-full h-96 object-contain "
      src={product.productImage}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
    {product.productName}
      <div className="badge badge-primary w-full">Brand: {product.brand}</div>
    </h2>
    <div className="card-actions justify-between ">
     
     <div >Created Time: <span className="badge badge-outline">{product.createdAt }</span></div>
     <div >Ratings: <span className="badge ">{product.ratings } <FaRegStar className="text-yellow-600 " /></span></div>
   </div>
    <p>Category:{product.category}</p>
    <p>Price: ${product.price}</p>
  
  </div>
</div>
    </div>
    </>
  );
};

export default ProductCard;
