import React from 'react';
import ProductList from './ProductList';
import Banner from '../Components/Banner';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ProductList></ProductList>
        </div>
    );
};

export default Home;