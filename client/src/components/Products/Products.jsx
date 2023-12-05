import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import "./Product.css";

const categories = [
    "Personal",
    "cloth",
    "Ladies Cloth",
    "Gift",
    "Food",
    "Electronics",
    "Sports",
    "Others"
]

const Products = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const [category,setCategory] = useState("");

  const { products, loading } = useSelector((state) => state.products);


  return (
    <>
      {loading ? (
        ''
      ) : (
        <>
          <div>
           {products?.length === 0 ?
            ""
            :
            <h2
            style={{
              textAlign: "center",
              borderBottom: "1px solid rgba(21,21,21,0.5)",
              width: "20vmax",
              fontSize: "1.4vmax",
              fontFamily: "Poppins,sans-serif",
              margin: "3vmax auto",
              color: "rgb(0, 0, 0, 0.7)",
            }}
          >
            Featured Products
          </h2>
           }
            <div className="sidebar__product" style={{
                display:"flex",
                flex:1,
            }}>
                <div className="sidebar__products" style={{
                  border: "1px solid #999",
                  margin:"1vmax",
                  flex:".177"
              }}>
                  <p style={{fontSize:"1.2vmax",padding:"5px"}}>CHOOSE CATEGORIES</p>
                  <ul className="categoryBox">
                      {categories.map((category) =>(
                          <li
                          className="category-link"
                          key={category}
                          onClick={() =>setCategory(category)}
                          type="checkbox">
                          {category}
                          </li>
                      ))}
                  </ul>
                  <p style={{fontSize:"1.2vmax",padding:"5px"}}>QUICK LINKS</p>
                  <li className="category-link">
                    Home
                  </li>
                  <li className="category-link">
                    My Cart
                  </li>
                  <li className="category-link">
                    Go to Checkout
                  </li>
              </div>

             {products?.length === 0 ?
             <span style={{
               display:"block",
               padding:"30px 0",
               fontSize:"1.5rem",
               flex:".9",
               textAlign:"center"
             }}>No Product Found ....</span>
             :
             <div
             className="">
             {products &&
               products?.map((product) => (
                 <ProductCard key={product.id} product={product} />
               ))}
           </div>
              }
             </div>
          </div>
        </>
      )}
    </>
  );
};

export default Products;
