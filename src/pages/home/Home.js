import React, { useEffect, useState } from "react";
import BannerCard from "../../component/bannercard/BannerCard";
import CategorieCard from "../../component/categoriecard/CategorieCard";
import Text from "../../component/text/Text";
import CardSlider from "../../component/newarrival/CardSlider";
import "./home.css";
import Twobanner from "../../component/twobanner/Twobanner";
import DiscountSection from "../../component/discountsection/DiscountSection";
import Offer from "../../component/offer/Offer";
import CardSliderOne from "../../component/cardsliderone/CardSliderOne";
import CountDown from "../../component/countdown/CountDown";
import { productCategorie } from "../../serverRequest/Index";
import TopSeverWeek from "../../component/topseverweek/TopSeverWeek";
import Bestseller from "../../component/bestseller/BestSeller";
import Header from "../../component/header/Header";
import Loader from "../../component/loder/Loader";

const Home = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0)

    setLoad(true)
    async function getData(res) {
      const newData = await productCategorie();
      setData(newData.data);
    }
    getData();
    const timer = setTimeout(() => {
      setLoad(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  const handleNav = (id) => {
    //  console.log(id);
  };

  return (
    <>
      <Header />
      <BannerCard />
      {/*<Twobanner />*/}
      <Text heading1="New Arrivals" text1="Most popular products near you!" />
      <CardSlider />
      <CountDown />
      <TopSeverWeek />
      <Text
        heading1="Shop by Categories"
        text1="Most popular products near you!"
      />

      <div className="main_categorie_container">
        <div className="categoriecard_content">
          {data.map((cat) => (
            <CategorieCard
              text={cat.categoryName}
              img={cat.categoryImage}
              today="/todaydeals"
              height="160px"
              width="160px"
              id={{ id: cat._id }}
              onclick={() => handleNav(cat._id)}
            />
          ))}
        </div>
      </div>
      <Text heading1="Today’s deals" text1="Offers curated only for you!" />
      <DiscountSection />
      <Offer />
      <Text heading1="Bestsellers" text1="Most popular products near you!" />

      <Bestseller />
      <Text heading1="Combos for you" text1="Savour the savings!" />
      <CardSliderOne />
      <Loader loading={load}/>

    </>
  );
};

export default Home;
