import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../models/Product';
import { ProductType } from '../models/ProductType';

const Products = ({productType} : {productType: ProductType}) => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3002';
  const [listOfproducts, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(`${BACKEND_URL}/get-products-by-category?productType=${productType}`);
        const products = response.data.map(item => new Product(item.productType, item.title, item.imageUrl, item.basePrice));
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [productType]);

  return (
    <div className="content-container">
      <h2>{productType}</h2>
      <div className='product-item-container'>
        {listOfproducts.map((product, index) => (
          <div className='product-item' key={index}>
            <img src={product.imageUrl} alt={product.title} style={{ width: '100px', height: '100px' }} />
            <h3>{product.title}</h3>
            <p>Price: ${product.getPrice()}</p>
          </div>
        ))}
      </div>
    </div>
  );

};

export default Products;
