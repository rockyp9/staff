import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiCheckDoubleLine } from "react-icons/ri";

export const Services = (props) => {
  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Your Best Crypto to Fiat Exchange</h2>
          <a href="/exchange">Learn more {">"} </a>
        </div>
        <div className="row">
          <div className="col-md-4 exchange-steps">
            <div className="exchange-step">
              <h2 className="step-index">1
              </h2>
              <FaArrowRightLong style={{ color: 'white', width: '80px', height: '60px', strokeWidth: '1px' }} />
            </div>
            <h3>Choose curreny</h3>
            <p>Pick one of the supported currency pairs to send</p>
          </div>
          <div className="col-md-4 exchange-steps">
            <div className="exchange-step">
              <h2 className="step-index">2</h2>
              <FaArrowRightLong style={{ color: 'white', width: '80px', height: '60px', strokeWidth: '1px' }} />
            </div>
            <h3>Make deposit</h3>
            <p>Pick one of the supported currency pairs to send</p>
          </div>
          <div className="col-md-4 exchange-steps">
            <div className="exchange-step">
              <h2 className="step-index">3</h2>
              <RiCheckDoubleLine style={{ color: 'green', width: '80px', height: '60px', strokeWidth: '1px' }} />
            </div>
            <h3>Recieve Your Funds</h3>
            <p>Pick one of the supported currency pairs to send</p>
          </div>
        </div>
      </div>
    </div>
  );
};
