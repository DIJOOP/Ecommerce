import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./search.css"


const Search = ({history}) => {
  const [keyword, setKeyword] = useState("");
  const navigate=useNavigate()
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if(keyword.trim()){
        navigate(`/products/${keyword}`)
    }else{
        navigate("/products")
    }

  };
  return (
    <Fragment>
      <form onSubmit={searchSubmitHandler} className="searchBox">
        <input
          type="text"
          placeholder="search your products here"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="search" />
      </form>
    </Fragment>
  );
};

export default Search;
