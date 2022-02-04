import React, { useEffect, useState } from "react";
// import {usehistory} from 'react-router-dom'
import { Route, useNavigate } from "react-router-dom";

import axios from "axios";
import { debounce, uniq } from "lodash";
import Compo4 from "./Compo4";
// import { history } from "react-router-dom";
function Compo3({ Url }) {
  const navigate = useNavigate();
  const [Data2, setData2] = useState("");
  const [URLtosend, setURLtosend] = useState("");
  const [VideoID, setVideoID] = useState("");

  const Fetcher2 = async () => {
    const response = await axios
      .get(
        `  https://elegant-kare-5ce082.netlify.app/.netlify/functions/api/page2/s=${URLtosend}`
      )
      .then((response) => {
        setData2(response.data);
        HREFFETCHER(response.data);
      });
  };

  const Page2 = async (Url, e) => {
    e.preventDefault();
    await setURLtosend(encodeURIComponent(Url));
  };

  const HREFFETCHER = async (mydata) => {
    const a = mydata.split(" ").map((item) => {
      if (item.includes("href")) {
        return item.slice(6, item.length - 1);
      }
    });
    const c = a.filter((item) => {
      return item !== undefined;
    });
    const d = c.filter((item) => {
      if (
        item.includes("extrastream") ||
        item.includes("uptostream") ||
        item.includes("waaw")
      ) {
        return item;
      }
    });
    // const e = d.map((item) => {
    //   if (item.includes("extrastream")) {
    //     setVideoID(item.split("=")[1]);
    //     return item.split("=")[1];
    //   }
    // });
    const e = d.join("").split("=");
    console.log(e);
    if (e[1].includes("/extrastream.php?url")) {
      setVideoID(e[1].replace("/extrastream.php?url", ""));
    } else if (e[1].includes("/uptostream.php?url")) {
      setVideoID(e[1].replace("/uptostream.php?url", ""));
    } else if (e[1].includes("/waaw.php?url")) {
      setVideoID(e[1].replace("/waaw.php?url", ""));
    } else {
      setVideoID(e[1]);
    }
  };

  useEffect(() => {
    Fetcher2();
  }, [URLtosend]);

  if (VideoID === "") {
    return (
      <React.Fragment>
        <div
          className="card"
          style={{
            margin: "0px",
            height: "200px",
            width: "600px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            className="btn btn-dark"
            style={{
              height: "50px",
              width: "200px",
              textAlign: "center",
              border: "none",
            }}
            href={Url}
            onClick={(e) => {
              Page2(Url, e);
            }}
          >
            Play
          </button>
        </div>
        <div></div>
      </React.Fragment>
    );
  } else if (VideoID !== "") {
    return (
      <React.Fragment>
        <Compo4 VideoID={VideoID} />
      </React.Fragment>
    );
  }
}

export default Compo3;
