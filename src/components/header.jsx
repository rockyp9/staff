import React from "react";

export const Header = (props) => {
  return (
    <header id="header">
      <div className="header-title">
        <p>Limtited Time! No fees for your first 3 tranactions! <button className="bridge-button">Birdge Now -> </button></p>

      </div>
      <div className="intro">
        <div className="overlay">
          <div className="row">
            <div className="col-md-3 col-md-offset-2 intro-text">
              <h2>
                {props.data ? props.data.title : "Loading"}
                <span></span>
              </h2>
              <p>{props.data ? props.data.paragraph : "Loading"}</p>
              <a
                href="#"
                className="btn btn-custom btn-lg page-scroll"
              >
                Start Bridging!
              </a>{" "}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
