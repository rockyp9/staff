import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { About } from "./components/about";
import { Contact } from "./components/contact";
import SmoothScroll from "smooth-scroll";
import MovingDots from './components/movingdots';
import RotatingImage from './components/rotatingimage';

import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {

  return (
    <div className="landing-page">
      <div className="white-section"></div>
      <RotatingImage />
      <MovingDots />
      <Navigation />
      <Header />
      <About />
      <Contact />
    </div>
  );
};

export default App;
