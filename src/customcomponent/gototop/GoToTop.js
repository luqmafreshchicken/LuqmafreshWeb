import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./gototop.css";
import { FaArrowUp } from "react-icons/fa";


const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const gotobtn = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const listenToScroll = () => {
    let heightToHidden = 200;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll > heightToHidden) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);
  return (
    <Wrapper>
      {isVisible && (
        <div className="top-btn" onClick={() => gotobtn()}>
          <FaArrowUp className="top-btn--icon" />
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display:'flex';
  justify-content:"center";
  align-items:"center";
`;
export default GoToTop;
