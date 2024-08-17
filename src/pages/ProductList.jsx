import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import Pagination from "../Components/Pagination";
import ProductCard from "../Components/ProductCard";

const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]); // Store all products fetched from the backend
  const [filteredProducts, setFilteredProducts] = useState([]); // Store the filtered products based on search and filters
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

  const PRODUCTS_PER_PAGE = 9; // Set the number of products per page to 9

  // Fetch all products once when the component mounts
  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:5000/products?limit=1000`)
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

  // Debounced function to handle search term changes
  const debouncedSetSearchTerm = useCallback(
    debounce((newSearchTerm) => {
      setSearchTerm(newSearchTerm);
      setCurrentPage(1); // Reset to page 1 for new search
    }, 300),
    []
  );

  const handleSearchChange = (event) => {
    debouncedSetSearchTerm(event.target.value);
  };

  // Filter products based on search term, category, brand, and price range
  const filterProducts = useCallback(() => {
    let filtered = allProducts;

    if (searchTerm) {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter((product) =>
        product.productName?.toLowerCase().includes(lowercasedSearchTerm)
      );
    }

    if (selectedBrand) {
      filtered = filtered.filter((product) => product.brand === selectedBrand);
    }

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    if (minPrice) {
      filtered = filtered.filter((product) => product.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter((product) => product.price <= parseFloat(maxPrice));
    }

    if (sortBy === "price_asc") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "dateAdded_desc") {
      filtered = filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    }

    setTotalProducts(filtered.length);
    setTotalPages(Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
    setFilteredProducts(filtered);
  }, [searchTerm, selectedBrand, selectedCategory, minPrice, maxPrice, sortBy, allProducts]);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedBrand, selectedCategory, minPrice, maxPrice, sortBy, filterProducts]);

  // Paginate filtered products
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by product name"
          onChange={handleSearchChange}
          className="p-2 border rounded w-full"
        />
      </div>

      <div className="mb-4 flex space-x-4">
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Brands</option>
          <option value="Logitech">Logitech</option>
          <option value="Sony">Sony</option>
          <option value="Samsung">Samsung</option>
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded"
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
          className="p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="p-2 border rounded"
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
        <p>Total Products: {totalProducts}</p>
      </div>

      <div className="grid grid-cols-1  lg:grid-cols-3  lg:gap-10">
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
