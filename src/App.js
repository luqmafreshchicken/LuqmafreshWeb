import CenterFooter from "./component/centerfooter/CenterFooter";
import City from "./component/city/City";
import ContactFooter from "./component/contactfooter/ContactFooter";
import Header from "./component/header/Header";
import HeaderFooter from "./component/headerfooter/HeaderFooter";
import LowerFooter from "./component/lowerfooter/LowerFooter";
import NewsFooter from "./component/newsfooter/NewsFooter";
import SupportSection from "./component/supportsection/SupportSection";
import GoToTop from "./customcomponent/gototop/GoToTop";
import MobileBottomtab from "./mobilecomponent/mobilebottomtab/MobileBottomtab";
import Routes from "./pages/routes/Routes";
import "./App.css";
import { useMediaQuery } from "react-responsive";
import SplashPage from "./pages/splashpage/SplashPage";

function App() {
  const isMobile = useMediaQuery({ maxWidth: 900 });

  return (
    <div>
      {isMobile ? (
        <SplashPage />
      ) : (
        <>
          <Routes />
          <div className="mobile_news_footer">
            <NewsFooter />
          </div>
          <div className="mobile_support_section">
            <SupportSection />
          </div>
          <div className="mobile_header_footer">
            <HeaderFooter />
          </div>
          {/*<CenterFooter />*/}
          <div className="mobile_contact_footer">
            <ContactFooter />
          </div>
          {/* <City />*/}
          <div className="mobile_gototop">
            <GoToTop />
          </div>
          <div className="mobile_lower_footer">
            <LowerFooter />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
