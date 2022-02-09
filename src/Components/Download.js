import React from "react";

function Download({ item }) {
  return (
    <React.Fragment>
      <button
        href={item}
        className="btn btn-dark"
        onClick={(e) => {
          e.preventDefault();
          window.open(item, "_blank");
        }}
        style={{
          margin: "5px",
          height: "50px",
          width: "100px",
          textAlign: "center",
          border: "none",
        }}
      >
        Download
      </button>
    </React.Fragment>
  );
}

export default Download;
