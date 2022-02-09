import React, { useState } from "react";
import axios from "axios";
function Compo4({ VideoID }) {
  const [VideoURL, setVideoURL] = useState([]);
  const [Toggler, setToggler] = useState(true);
  const [Error, setError] = useState(false);
  const Fetcher3 = async () => {
    console.log(VideoID);
    await axios
      .get(
        `  http://localhost:8888/.netlify/functions/api/page3/url=${VideoID}`
        // `http://localhost:4000/page3/url=${VideoID}`
      )
      .then((response) => {
        console.log(response.data.data);
        setVideoURL(response.data.data);
        if (response.data.success === false) {
          setError(true);
          setToggler(false);
        } else {
          setToggler(false);
          setError(false);
        }
      });
  };

  if (Toggler) {
    return (
      <React.Fragment>
        <div
          className="container card"
          style={{
            height: "200px",
            width: "600px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            // border: "2px solid black",
          }}
        >
          <h1>{VideoID}</h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              Fetcher3();
            }}
          >
            Play
          </button>
        </div>
      </React.Fragment>
    );
  } else if (Error === true || VideoID === null) {
    return (
      <React.Fragment>
        <h3
          style={{
            height: "200px",
            width: "600px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid black",
          }}
        >
          no video
        </h3>
      </React.Fragment>
    );
  } else if (!Toggler && !Error) {
    return (
      <React.Fragment>
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: "0",
            width: "600px",
            margin: "0",
          }}
        >
          {VideoURL.map((item) => {
            return (
              <div
                className="card"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <video
                  className="card"
                  style={{ margin: "0px", padding: "0px" }}
                  width="280"
                  src={item.file}
                  height="170"
                  controls
                />
                <h5> {item.label}</h5>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default Compo4;
