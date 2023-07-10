import React from "react";
import FadeLoader from "react-spinners/FadeLoader";

const Loader = ({ loading, color }) => {
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
      <FadeLoader
        color="#C42118"
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
