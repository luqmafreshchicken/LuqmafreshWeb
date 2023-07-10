import React, { useEffect, useState } from "react";
import "./searchproduct.css";
import CategorieCard from "../categoriecard/CategorieCard";
import { productCategorie, searchProduct } from "../../serverRequest/Index";
import SearchProductList from "../../customcomponent/searchproductlist/SearchProductList";
import Header from "../header/Header";

const SearchProduct = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [show, setShow] = useState(false);

  // categorie api

  useEffect(() => {
    async function getData() {
      const newData = await productCategorie();
      setData(newData.data);
    }
    window.scrollTo(0, 0)
    getData();
  }, []);

  // search api
  const handleSearch = async (e) => {
    setSearchItem(e);
    if (e.length >= 3) {
      const requestData = { search: e };
      searchProduct(requestData).then((res) => {
        if (res.status == true) {
          setData1(res.data);
          setShow(true);
        } else {
          setShow(false);
        }
      });
    }
  };

  const handleView = (id) =>{
  }
  return (
    <>
      <Header
        onchange={(e) => handleSearch(e.target.value)}
        value={searchItem}
      />
      <div className="search_container">
        <div className="search_content">
          {show == false ? (
            <div className="search_text">
              <h5>Shop by Categories</h5>
              <p>Freshest meats just for you</p>
            </div>
          ) : null}
          {show == false ? (
            <div className="search_categoriecard">
              {data.map((cat) => (
                <CategorieCard
                  text={cat.categoryName}
                  img={cat.categoryImage}
                  today="/todaydeals"
                  height="160px"
                  width="160px"
                  id={{ id: cat._id }}
                  // onclick={() => handleNav(cat._id)}
                  style={{ backgroundColor: "red" }}
                />
              ))}
            </div>
          ) : null}
          {data1.length >= 1 ? (
            <>
              <div className="searchsroductlist_container">
                {data1.map((search) => (
                  <SearchProductList
                    name={search.description}
                    qty={search.qty}
                    // offername={search.name}
                    price={search.price}
                    originprice={search.originalPrice}
                    img={search.image}
                    to='/carddetail'
                    id={{id:search._id}}
                    onclick={()=>handleView(search._id)}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default SearchProduct;
