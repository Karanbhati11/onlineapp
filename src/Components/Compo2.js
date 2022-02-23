/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "react-js-loader";
import { debounce, uniq } from "lodash";
import Compo3 from "./Compo3";

function Compo2() {
  const [Data, setData] = useState("");
  const [param, setParam] = useState("");
  const [URL, setURL] = useState([]);
  const [Image, setImage] = useState([]);
  const [Title, setTitle] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const sitechanger = "wine";
  const Fetcher = async () => {
    await axios
      .get(
        `https://www.project1.ga/.netlify/functions/api/page1/${sitechanger}/${param}`
        // `http://localhost:4000/page1/${sitechanger}/${param}`
      )
      .then((response) => {
        setData(response.data);
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
    // console.log(image1.filter((item) => item !== undefined));
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
    // console.log(image2);
    const imagemain = image2.map((item) => {
      if (item !== undefined) {
        return item.split("src=")[1].replace(/"/g, "");
      }
    });
    console.log(imagemain);
    setImage(imagemain);
    // eslint-disable-next-line array-callback-return
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
    setIsLoading(false);
  };
  const ChangeHandler = (e) => {
    setIsLoading(true);
    setParam(e.target.value);
    Fetcher();
  };
  if (IsLoading) {
    return (
      <React.Fragment>
        <div className="container">
          <h1 style={{ color: "red" }}>wait 2 seconds before you hit enter</h1>
          <form>
            <div className="form-group">
              <input
                style={{ margin: "20px" }}
                onChange={(e) => ChangeHandler(e)}
              />
              <button
                className="btn btn-primary"
                type="submit"
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
          <Loader type="hourglass" bgColor={"#000000"} size={100} />
        </div>
      </React.Fragment>
    );
  } else if (!IsLoading) {
    return (
      <React.Fragment>
        <div className="container ">
          <h1 style={{ color: "red" }}>wait 2 seconds before you hit enter</h1>
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
            <div
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
            </div>
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
}

export default Compo2;
