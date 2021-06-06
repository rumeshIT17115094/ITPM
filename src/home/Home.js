import React from "react";
import "./home.css";
import { gif1, gif10, gif6, gif7, gif8, gif9 } from "image_imports/ImageImport";
import HomeList from "./HomeList";
const Home = () => {
  return (
    <React.Fragment>
      <div className="container-fluid mt-4 pt-1" id="homeContainer">
        <div className="row">
          <div className="col-md-3">
            <HomeList />
          </div>
          <div className="col-md-5">
            <div className="gifContainers">
              <img className=" img-thumbnail" src={gif1} alt="gif1" />
              <img className=" img-thumbnail" src={gif10} alt="gif1" />
              <img className=" img-thumbnail" src={gif8} alt="gif1" />
              <img className=" img-thumbnail" src={gif6} alt="gif1" />
              <img className=" img-thumbnail" src={gif7} alt="gif1" />
              <img className=" img-thumbnail" src={gif9} alt="gif1" />
            </div>
          </div>
        </div>
        <div className="row"></div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(Home);
