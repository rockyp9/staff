import React, { useEffect, useRef } from "react";

export const Header = (props) => {

  const videoRef = useRef(null);
  // useEffect(() => {
  //   const video = videoRef.current;

  //   // Set the video to loop continuously
  //   video.loop = true;

  //   // Remove the controls attribute to hide the progress bar
  //   video.controls = false;

  //   // Play the video as soon as it's ready
  //   video.play();
  // }, []);

  return (
    <header id="header">
      <div className="intro">
        <div className="container">
          <div className="row">
            {/* <div className="col-md-6 ">
              <div className="video-container">
                <video ref={videoRef} width="100%" height="auto">
                  <source src="video/intro.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div className="col-md-6"> */}
            <div className="intro-text">
              <h2>
                Supported Currencies
              </h2>
              <br></br>
              <br></br>
              <div className="col-md-3 currency-img ">
                <img src="img/cashapp.png" className="img-responsive" alt="" />
                <p>CashApp</p>
              </div>
              <div className="col-md-3 currency-img  ">
                <img src="img/paypal.jpeg" className="img-responsive" alt="" />
                <p>PayPal</p>
              </div>
              <div className="col-md-3 currency-img  ">
                <img src="img/zelle.png" className="img-responsive" alt="" />
                <p>Zelle</p>
              </div>
              <div className="col-md-3 currency-img  ">
                <img src="img/venmo.png" className="img-responsive" alt="" />
                <p>Venmo</p>
              </div>
              <div className="col-md-3 currency-img ">
                <img src="img/apple.png" className="img-responsive" alt="" />
                <p>Apple Pay</p>
              </div>
              <div className="col-md-3 currency-img  ">
                <img src="img/bitcoin.png" className="img-responsive" alt="" />
                <p>Bitcoin</p>
              </div>
              <div className="col-md-3 currency-img  ">
                <img src="img/litecoin.png" className="img-responsive" alt="" />
                <p>Litecoin</p>
              </div>
              <div className="col-md-3 currency-img  ">
                <img src="img/ethereum.png" className="img-responsive" alt="" />
                <p>Ethereum</p>
              </div>
              <br></br>
              <a
                href="/exchange"
                className="btn btn-custom btn-lg page-scroll"
              >
                Exchange Now!
              </a>
            </div>
            {/* </div> */}

          </div>
        </div>
      </div>
    </header>
  );
};
