import React from "react";

export const Services = (props) => {
  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Make a transaction.</h2>
          <p>
            Just 3 simple steps
          </p>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
              <div key={`${d.name}-${i}`} className="col-md-6">
                {" "}
                <div className="service-desc">
                  <h5>step {d.id}</h5>
                  <h3>{d.name}</h3>
                  <p>{d.text}</p>
                  {(i == 1 || i == 0) && <a
                    href="#"
                    className="btn btn-custom btn-lg page-scroll"
                  >
                    Add Connections
                  </a>}
                  {i == 2 && <div>
                    email
                  </div>}
                </div>
              </div>
            ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
