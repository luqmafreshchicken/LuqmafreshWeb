import React from "react";
import { Routes, Route } from "react-router-dom";
import TodayDeals from "../todaydeals/TodayDeals";
import Home from "../home/Home";
import PrivacyPolicy from "../privacypolicy/PrivacyPolicy";
import TermsConditions from "../termscondition/TermsCondition";
import FAQ from "../faq/FAQ";
import WhySection from "../whysection/WhySection";
import Blog from "../blog/Blog";
import UserContactDetail from "../usercontactdetail/UserContactDetail";
import SearchProduct from "../../component/searchproduct/SearchProduct";
import Account from "../../component/accountsection/Account";
import AddNewAddress from "../../component/addnewaddress/AddNewAddress";
import SelectDeliveryslot from "../../component/selectdeliveryslot/SelectDeliveryslot";
import ViewDetail from "../../component/orderhistory/orderviewDetail/ViewDetail";
import BestSeller from "../bestseller/BestSeller";
import TopSeverWeek from "../topseverweek/TopSeverWeek";
import EditAddress from "../../component/editaddress/EditAddress";
import Payment from "../../component/payment/Payment";
import MobileAccount from "../../mobilecomponent/mobileaccount/MobileAccount";
import MobileCategorie from "../../mobilecomponent/mobilecategorie/MobileCategorie";
import CardFullDetail1 from "../../customcomponent/cardfulldetail/CardfullDetail1";
import Notification from "../../component/notification/Notification";
import Career from "../career/Career";
import AffliateMarket from "../affliatemarket/AffliateMarket";
import Franchies from "../franchies/Franchies";
import Recipies from "../recipes/Recipies";
import Track from "../track/Track";
import CardDetail1 from "../carddetail1/CardDetail1";
import YouMayLikeDetail from "../youmaylikedetail/YouMayLikeDetail";
import CardFullDetail from "../../customcomponent/cardfulldetail/CardFullDetail";
import Orderhistory from "../../component/orderhistory/Orderhistory";
import WhistListDetail from "../../component/whistlistdetail/WhistListDetail";

const Routes1 = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/category/:id" element={<TodayDeals />} />
      <Route path="/product/:id" element={<CardFullDetail />} />
      <Route path="/carddetail1" element={<CardDetail1 />} />
      <Route path="/topseverweek" element={<TopSeverWeek />} />
      <Route path="/bestseller" element={<BestSeller />} />
      <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      <Route path="/termsconditions" element={<TermsConditions />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/usercontactdetail" element={<UserContactDetail />} />
      <Route path="/search" element={<SearchProduct />} />
      <Route path="/account" element={<Account />} />
      <Route path="/addnewaddress" element={<AddNewAddress />} />
      <Route path="/editaddress" element={<EditAddress />} />
      <Route path="/selectdeliveryslot" element={<SelectDeliveryslot />} />
      <Route path="/viewdetail" element={<ViewDetail />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/mobileaccount" element={<MobileAccount />} />
      <Route path="/mobilecategorie" element={<MobileCategorie />} />
      <Route path="/viewdetails" element={<ViewDetail />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/whyluqmafresh" element={<WhySection />} />
      <Route path="/affliatemarket" element={<AffliateMarket />} />
      <Route path="/franchies" element={<Franchies />} />
      <Route path="/recipies" element={<Recipies />} />
      <Route path="/track" element={<Track />} />
      <Route path="/youmaylike" element={<YouMayLikeDetail />} />
      <Route path="/orderhistory" element={<Orderhistory />} />
      <Route path="/whistlistdetail" element={<WhistListDetail />} />

    </Routes>
  );
};

export default Routes1;
