import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../Actions/productAction";
import ProductCard from "../Home/ProductCard";
import Loader from "../layout/Loader/Loader";
import "./Products.css";
import Pagination from "react-js-pagination";
import { Slider } from "@mui/material";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import Metadata from "../layout/Metadata";


const categories=[
  "Laptop",
  "tv",
  "smartphone",
  "home"
]

const Products = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const {
    products,
    loading,
    error,
    productCount,
    resultPerPage,
    filteredProductCount,
  } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 50000]);
  const [category, setCategory] = useState("")
  const [rating, setRating] = useState(0)
  const alert = useAlert()

  const setCurrentPageNo = (e) => setCurrentPage(e);
  const priceHandler = (event, newprice) => {
    setPrice(newprice);
  };

  useEffect(() => {
    if(error){
      alert.error(error)
    }
    dispatch(getProduct(params.keyword, currentPage, price,category,rating));
  }, [dispatch, params.keyword, currentPage, price,category,rating,alert,error]);

  let count = filteredProductCount;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title= "products"/>
          <h2 className="productsHeading">Products</h2>

          <div className="Products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <div className="filterBox">
            <Typography> price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={50000}
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend" >Ratings above</Typography>
              <Slider
              value={rating}
              onChange={(e,newRating)=>{
                setRating(newRating)
              }}
              aria-labelledby="continuous-slider"
              min={0}
              max={5}
              valueLabelDisplay="auto"
              />
            </fieldset>
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
