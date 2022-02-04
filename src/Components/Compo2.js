import React, { useEffect, useState } from "react";
import axios from "axios";

import { debounce, uniq } from "lodash";
import Compo3 from "./Compo3";

function Compo2() {
  const [Data, setData] = useState("");
  const [param, setParam] = useState("");
  const [URL, setURL] = useState([]);
  const [Image, setImage] = useState([]);
  const [Title, setTitle] = useState([]);
  const sitechanger = "wine";

  const Fetcher = async () => {
    const response = await axios
      .get(`http://localhost:4000/page1/${sitechanger}/${param}`)
      .then((response) => {
        setData(response.data);
        //   console.log(response.data);
      });
  };
  const Page1 = (e) => {
    e.preventDefault();
    const a = Data.split("article");
    const b = a.filter(
      (item) =>
        item.includes("category") &&
        !item.includes("DOCTYPE ") &&
        !item.includes("pagenavi")
    );
    const image1 = Data.split(" ").map((item) => {
      if (
        item.includes("jpg") ||
        item.includes("png") ||
        item.includes("gif") ||
        item.includes("jpeg") ||
        item.includes("img")
      ) {
        return item;
      }
    });
    const image2 = image1.filter((item) => {
      if (item !== undefined) {
        if (
          item.includes("src") &&
          item.includes("https") &&
          !item.includes("extra") &&
          !item.includes("download")
        ) {
          return item;
        }
      }
    });
    const imagemain = image2.map((item) => {
      if (item !== undefined) {
        return item.split("src=")[1].replace(/"/g, "");
      }
    });
    setImage(uniq(imagemain));

    const title = b.map((item) => {
      if (item.includes("title")) {
        return item.split("title=")[1].split('"')[1];
      }
    });
    setTitle(uniq(title));

    const urls = b.map((item) => {
      if (item.includes("href")) {
        return item.split("href=")[1].split(" ")[0].replace(/"/g, "");
      }
    });
    setURL(urls);
  };
  const ChangeHandler = debounce((e) => {
    setParam(e.target.value);
    Fetcher();
  }, 100);
  return (
    <React.Fragment>
      <div className="container ">
        <form>
          <div className="form-group">
            <input
              style={{ margin: "20px" }}
              onChange={(e) => ChangeHandler(e)}
            />
            <button
              className="btn btn-primary"
              onClick={(e) => Page1(e)}
              style={{ margin: "20px" }}
            >
              Submit
            </button>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                setImage([]);
                setTitle([]);
                setURL([]);
                setParam("");
              }}
              style={{ margin: "20px" }}
            >
              clear
            </button>
          </div>
        </form>
        <div
          className="container card"
          style={{ display: "flex", flexDirection: "row" }}
        >
          {/* <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "flex-start",
            }}
          >
            {Image.map((item) => (
              <img
                style={{
                  border: "2px solid black",
                  height: "200px",
                  width: "150px",
                  margin: "0",
                  textAlign: "justify",
                }}
                src={item}
                alt="image123"
              ></img>
            ))}
          </div> */}
          <div>
            {Title.map((item) => (
              <h3
                className="text-center"
                style={{
                  // border: "2px solid black",
                  height: "200px",
                  margin: "0",
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                {item}
              </h3>
            ))}
          </div>
          <div style={{}}>
            {URL.map((item) => (
              <Compo3 Url={item} />
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Compo2;