import React from "react";
import { FaStar } from "react-icons/fa";


const ProductCard = ({ product }) => {
  // Convert to Bangladesh time and format
  const bangladeshTime = new Date(product.createdAt).toLocaleString("en-US", {
    timeZone: "Asia/Dhaka",
    hour12: true, // Use 12-hour format with AM/PM
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });

  return (
    <>
      <div>
        <div className="card bg-base-100 md:w-full lg:w-96 sm:w-full p-1 h-[28rem] border-y-2 border-gray-400 shadow-lg hover:shadow-2xl">
          <figure>
            <img
              className="w-full h-96 object-contain"
              src={product.productImage}
              alt={product.productName}
            />
          </figure>
          <div className="card-body ">
            <h2 className="card-title justify-between">
              {product.productName}
              <div className="badge badge-neutral w-1/2">Brand: {product.brand}</div>
            </h2>
            <div className="card-actions justify-between">
              <div className="font-normal  italic" >Created Time: <span className="badge badge-outline">{bangladeshTime}</span></div>
              <div className=" italic" >Ratings: <span className="badge"><span>{product.ratings.toFixed(1)}</span> <FaStar  className="text-yellow-400 mx-2" /></span></div>
            </div>
            <p className=" italic" >Category: {product.category}</p>
            <p className="btn btn-sm btn-primary">Price: ${product.price.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
