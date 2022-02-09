/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { uniq } from "lodash";
import Compo4 from "./Compo4";
import Download from "./Download";
import Loader from "react-js-loader";

function Compo3({ Url }) {
  const [IsDownloadBtn, setIsDownloadBtn] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [IsPlayBtn, setIsPlayBtn] = useState(false);
  const [Ismain, setIsmain] = useState(true);
  const [URLtosend, setURLtosend] = useState("");
  const [VideoID, setVideoID] = useState("");
  const [DownloadBtn, setDownloadBtn] = useState([]);
  const Fetcher2 = async () => {
    await axios
      .get(
        `   https://www.project1.ga/.netlify/functions/api/page2/s=${URLtosend}`
        // `http://localhost:4000/page2/s=${URLtosend}`
      )
      .then((response) => {
        HREFFETCHER(response.data);
      });
  };

  const Page2 = async (Url, e) => {
    e.preventDefault();
    setIsLoading(true);

    await setURLtosend(encodeURIComponent(Url));
  };

  const HREFFETCHER = async (mydata) => {
    const a = mydata.split(" ").map((item) => {
      if (item.includes("href")) {
        return item.slice(6, item.length - 1);
      }
    });
    const download1 = mydata.split(" ").map((item) => {
      if (
        item.includes("casa/archives") ||
        item.includes("torrent.php") ||
        item.includes("download.php")
      ) {
        return item;
      }
    });
    const download2 = download1.filter((item) => {
      if (item !== undefined) {
        if (item.includes("href")) {
          return item;
        }
      }
    });
    const downloadmain = download2.map((item) => {
      if (item !== undefined) {
        return item
          .split("href=")[1]
          .replace(/["]/, "https://extramovies.wine")
          .replace(/["]/g, "");
      }
    });
    setIsLoading(false);

    setDownloadBtn(uniq(downloadmain));
    const c = a.filter((item) => {
      return item !== undefined;
    });
    const d = c.filter((item) => {
      if (
        item.includes("extrastream") ||
        item.includes("uptostream") ||
        item.includes("waaw") ||
        item.includes("doodstream")
      ) {
        return item;
      }
    });
    const e = d.join("").split("=");
    if (e[1].includes("/extrastream.php?url")) {
      setVideoID(e[1].replace("/extrastream.php?url", ""));
    } else if (e[1].includes("/uptostream.php?url")) {
      setVideoID(e[1].replace("/uptostream.php?url", ""));
    } else if (e[1].includes("/waaw.php?url")) {
      setVideoID(e[1].replace("/waaw.php?url", ""));
    } else if (e[1].includes("/doodstream.php?url")) {
      setVideoID(e[1].replace("/doodstream.php?url", ""));
    } else {
      setVideoID(e[1]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    Fetcher2();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [URLtosend, IsDownloadBtn, IsPlayBtn]);

  if (Ismain) {
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
              setIsmain(false);
              setIsPlayBtn(true);
              Page2(Url, e);
            }}
          >
            Play
          </button>
          <button
            className="btn btn-dark"
            style={{
              height: "50px",
              width: "200px",
              margin: "10px",
              textAlign: "center",
              border: "none",
            }}
            href={Url}
            onClick={(e) => {
              setIsmain(false);
              setIsDownloadBtn(true);
              Page2(Url, e);
            }}
          >
            Download
          </button>
        </div>
        <div></div>
      </React.Fragment>
    );
  } else if (IsPlayBtn) {
    if (IsLoading) {
      return (
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
          <Loader type="hourglass" bgColor={"#000000"} size={100} />
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <Compo4 VideoID={VideoID} DownloadBtn={DownloadBtn} />
        </React.Fragment>
      );
    }
  } else if (IsDownloadBtn) {
    if (IsLoading) {
      return (
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
          <Loader type="hourglass" bgColor={"#000000"} size={100} />
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <div
            className="overflow-auto"
            style={{
              height: "200px",
              width: "600px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              padding: "10px",
              margin: "10px",
            }}
          >
            {DownloadBtn.map((item) => {
              return <Download item={item} />;
            })}
          </div>
        </React.Fragment>
      );
    }
  }
}
export default Compo3;
