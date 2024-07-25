import React from "react";

export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="container">
          <div className="row">
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
          </div>
        </div>
      </div>
    </header>
  );
};
