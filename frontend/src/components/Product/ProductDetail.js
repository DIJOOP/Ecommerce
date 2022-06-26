import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetail, newReview } from "../../Actions/productAction";
import "./ProductDetail.css";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import Metadata from "../layout/Metadata";
import { addItemstoCart } from "../../Actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Rating,
} from "@mui/material";

const ProductDetail = () => {
  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );
  const {success,error:reviewError}=useSelector(state=>state.newReview)

  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0)
  const [open, setOpen] = useState(false)
  const [comment, setComment] = useState("")

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    setQuantity(quantity - 1);
  };

  const addToCartHandler = () => {
    dispatch(addItemstoCart(params.id, quantity));
    alert.success("item added to cart");
  };

  const submitReviewToggle=()=>{
    open? setOpen(false):setOpen(true)
  }

  const reviewSubmitHandler=()=>{
    const myform= new FormData()
    myform.set("rating",rating)
    myform.set("comment",comment)
    myform.set("productId",params.id)
    dispatch(newReview(myform))
    setOpen(false)
  }

  useEffect(() => {
    if (error) {
      return alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      return alert.error(reviewError);
      dispatch(clearErrors());
    }
    if(success){
      alert.success("review submitted successfully")
      dispatch({type:"newReviewReset"})
    }
    dispatch(getProductDetail(params.id));
  }, [dispatch, params.id,success,reviewError]);

  
  const options = {
    edit: false,
    color: "rgba(20,20,20,.1 )",
    activeColor: "tomato",
    
    isHalf: true,
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {product && (
            <div>
              <Metadata title={product.name} />
              <div className="productDetail">
                <div className="inner">
                  <Carousel>
                    {product &&
                      product.images.map((item, i) => (
                        <img
                          className="CarousalImage"
                          key={item.url}
                          src={item.url}
                          alt={`${i} Slide`}
                        />
                      ))}
                  </Carousel>
                </div>
                <div>
                  <div className="detailsBlock-1">
                    <h2>{product.name}</h2>
                    <p>Product # {product._id}</p>
                  </div>
                  <div className="detailsBlock-2">
                    <Rating 
                    value={product.ratings}
                    readOnly
                  
                    />
                    <span className="detailsBlock-2-span">
                      {" "}
                      ({product.numOfReviews} Reviews)
                    </span>
                  </div>
                  <div className="detailsBlock-3">
                    <h1>{`₹${product.price}`}</h1>
                    <h4>{product.stock}</h4>
                    <div className="detailsBlock-3-1">
                      <div className="detailsBlock-3-1-1">
                        <button onClick={decreaseQuantity}>-</button>
                        <input readOnly type="number" value={quantity} />
                        <button onClick={increaseQuantity}>+</button>
                      </div>
                      <button
                        disabled={product.stock < 1 ? true : false}
                        onClick={addToCartHandler}
                      >
                        Add to Cart
                      </button>
                    </div>

                    {product && (
                      <p>
                        Status:
                        <b
                          className={
                            product.stock < 1 ? "redColor" : "greenColor"
                          }
                        >
                          {product.stock < 1 ? "OutOfStock" : "InStock"}
                        </b>
                      </p>
                    )}
                  </div>

                  <div className="detailsBlock-4">
                    Description : <p>{product.description}</p>
                  </div>

                  <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
                </div>
              </div>
              <h3 className="reviewsHeading">REVIEWS</h3>
              <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={submitReviewToggle}
              >
                <DialogTitle>Submit</DialogTitle>
                <DialogContent className="submitDialog">
                  <Rating
                    onChange={(e) => setRating(e.target.value)}
                    value={rating}
                    size="large"
                  />

                  <textarea
                    className="submitDialogeTextArea"
                    cols="30"
                    rows="5"
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)}
                  ></textarea>
                </DialogContent>
                <DialogActions>
                  <Button onClick={reviewSubmitHandler} color="primary" >submit</Button>
                  <Button onClick={submitReviewToggle} color="secondary">Cancel</Button>
                </DialogActions>
              </Dialog>

              {product.reviews && product.reviews[0] ? (
                <div className="reviews">
                  {product.reviews &&
                    product.reviews.map((review) => (
                      <ReviewCard review={review} />
                    ))}
                </div>
              ) : (
                <p className="noReviews">NO REVIEWS YET</p>
              )}
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetail;
