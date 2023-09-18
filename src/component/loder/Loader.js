import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useMediaQuery } from "react-responsive";

const Loader = ({ loading, color }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const loaderStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 9999,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
  };

  return (
    <div style={loading ? loaderStyle : {}}>
      {isMobile <= 768 ? (
        <ClipLoader
          color="#C42118"
          loading={loading}
          size={25}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <ClipLoader
          color="#C42118"
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </div>
  );
};

export default Loader;
