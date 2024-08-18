import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import Pagination from "../Components/Pagination";
import ProductCard from "../Components/ProductCard";

const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("dateAdded_desc");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const PRODUCTS_PER_PAGE = 9;

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://job-task-server-orpin.vercel.app/products?limit=1000`)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.products || []);
        setTotalProducts(data.products.length);
        setFilteredProducts(data.products || []);
        setTotalPages(Math.ceil(data.products.length / PRODUCTS_PER_PAGE));
      })
      .catch((error) => {
        setError("Failed to fetch products: " + error.message);
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const debouncedSetSearchTerm = useCallback(
    debounce((newSearchTerm) => {
      setSearchTerm(newSearchTerm);
      setCurrentPage(1);
    }, 300),
    []
  );

  const handleSearchChange = (event) => {
    debouncedSetSearchTerm(event.target.value);
  };

  const filterProducts = useCallback(() => {
    let filtered = allProducts.filter(product => 
      (!searchTerm || product.productName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedBrand || product.brand === selectedBrand) &&
      (!selectedCategory || product.category === selectedCategory) &&
      (!minPrice || product.price >= parseFloat(minPrice)) &&
      (!maxPrice || product.price <= parseFloat(maxPrice))
    );

    if (sortBy === "price_asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "dateAdded_desc") {
      filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    }

    setTotalProducts(filtered.length);
    setTotalPages(Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
    setFilteredProducts(filtered);
  }, [searchTerm, selectedBrand, selectedCategory, minPrice, maxPrice, sortBy, allProducts]);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedBrand, selectedCategory, minPrice, maxPrice, sortBy, filterProducts]);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-center  border-y p-2   my-4">Product List</h1>

      <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search by product name"
          onChange={handleSearchChange}
          className="p-2 border rounded w-full"
        />
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="">All Brands</option>
          <option value="Logitech">Logitech</option>
          <option value="Sony">Sony</option>
          <option value="Samsung">Samsung</option>
        </select>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Footwear">Footwear</option>
          <option value="Home Appliances">Home Appliances</option>
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>

      <div className="mb-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded w-full max-w-xs"
        >
          <option value="price_asc">Price Low to High</option>
          <option value="price_desc">Price High to Low</option>
          <option value="dateAdded_desc">Newest First</option>
        </select>
      </div>

      <div className="mb-4">
        <p className="btn ">Total Products: {totalProducts}</p>
      </div>
      <hr className="my-6 " />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : currentProducts.length > 0 ? (
          currentProducts.map((product, index) => (
            <ProductCard key={product._id || index} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProductList;
