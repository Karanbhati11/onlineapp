import React, { useEffect, useState } from "react";
import axios from "axios";
import { debounce, uniq } from "lodash";
import Compo2 from "./Compo2";
function Compo1() {
  const [Data, setData] = useState("");
  const [Data2, setData2] = useState("");
  const [URL, setURL] = useState("");
  const [VideoID, setVideoID] = useState("");
  const [Image, setImage] = useState([]);
  const [VideoURL, setVideoURL] = useState([]);
  const [param, setParam] = useState("");
  const [Page2URL, setPage2URL] = useState([]);
  const sitechanger = "wine";
  var debounced = debounce((g) => {
    setURL(g);
    console.log(URL);
    Fetcher2();
  }, 500);

  const Fetcher = async () => {
    const response = await axios
      .get(`http://localhost:4000/page1/${sitechanger}/${param}`)
      .then((response) => {
        setData(response.data);
        // console.log(response.data);
      });
  };

  const Fetcher2 = async () => {
    console.log(URL);
    const response = await axios
      .get(`http://localhost:4000/page2/s=${URL}`)
      .then((response) => {
        setData2(response.data);
      });
  };

  const Fetcher3 = async () => {
    console.log(VideoID);
    const response = await axios
      .get(`http://localhost:4000/page3/url=${VideoID}`)
      .then((response) => {
        console.log(response.data);
        setVideoURL(response.data.data);
      });
  };
  // HREF 1__________________________________________________________________________________________________
  const HrefFetcher1 = () => {
    // const a = Data.split(" ");

    const b = Data.split(" ").map((item) => {
      if (item.includes("href")) {
        return item.slice(6, item.length - 1);
      }
    });
    const Images1 = Data.split(" ").map((item) => {
      if (
        item.includes("src") &&
        (item.includes("jpg") ||
          item.includes("jpeg") ||
          item.includes("img") ||
          item.includes("200")) &&
        item.includes("https")
      ) {
        return item.slice(5, item.length - 1);
      }
    });
    const Image2 = Images1.filter((items) => items !== undefined);
    // console.log(uniq(Image2));
    const c = b.filter((item) => {
      return item !== undefined;
    });

    const d = c.map((item) => {
      return item.slice(0, item.length - 1);
    });
    const e = d.filter((item) => {
      return item.includes("http");
    });
    const splitter = param.split("+");

    const f = e.filter((item) => {
      if (
        item.includes(param) ||
        item.includes(splitter[1]) ||
        item.includes(splitter[2]) ||
        item.includes(splitter[3]) ||
        item.includes(splitter[4])
      ) {
        return item;
      }
    });
    const h = uniq(f).filter((item) => {
      if (!item.includes("feed")) {
        if (!item.includes("redirect")) {
          if (!item.includes("php")) {
            if (!item.includes("%")) {
              if (!item.includes("page")) {
                return item;
              }
            }
          }
        }
      }
    });
    console.log(h);
    // const g = encodeURIComponent(f[0].toString());

    setImage(uniq(Image2));
    setPage2URL(uniq(h));
  };

  ////////////HREFF 2__________________________________________________________________________

  const HrefFetcher2 = () => {
    // const a = Data2.split(" ");
    const b = Data2.split(" ").map((item) => {
      if (item.includes("href")) {
        return item.slice(6, item.length - 1);
      }
    });
    const c = b.filter((item) => {
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
    Fetcher3();
    // console.log(VideoID);
  };

  const URLGENERATOR = (item) => {
    console.log("CLICKED", item);
    const g = encodeURIComponent(item.toString());
    debounced(g);
  };

  useEffect(() => {
    Fetcher();
  }, [param]);

  // useEffect(() => {
  //   HrefFetcher1()
  // } ,[param]);
  const ChangeHandler = (e) => {
    // console.log(e.target.value);
    const a = e.target.value.split(" ").join("+");
    setParam(a);
  };
  return (
    <React.Fragment>
      {/* <form>
        <input onChange={(e) => ChangeHandler(e)} />
      </form> */}
      {/* <button onClick={() => HrefFetcher1()}>Click</button> */}
      <button onClick={() => HrefFetcher2()}>Click2</button>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ flex: "0.5" }}>
          {Image.map((item) => {
            return (
              <div>
                <img src={item} alt="IMA" />
              </div>
            );
          })}
        </div>
        <div style={{ flex: "0.5" }}>
          {Page2URL.map((item) => {
            return (
              <div style={{ height: "100px", margin: "10px" }}>
                <button onClick={() => URLGENERATOR(item)}>{item}</button>
              </div>
            );
          })}
        </div>
      </div>

      {VideoURL.map((item) => {
        return (
          <div>
            <h2>{item.label}</h2>
            <video width="320" src={item.file} height="240" controls />
          </div>
        );
      })}
    </React.Fragment>
  );
}

export default Compo1;
