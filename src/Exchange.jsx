import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { ExchangeForm } from "./components/exchangeform";
import Raining from './components/raining';
import { useUser, RedirectToSignIn } from '@clerk/clerk-react';
import RotatingImage from './components/rotatingimage';
import MovingDots from './components/movingdots';


const Exchange = (props) => {
    const { isSignedIn, user } = useUser();

    if (!isSignedIn) {
        return <RedirectToSignIn />;
    }

    return (
        <div>
            <MovingDots />
            <RotatingImage />
            <Navigation />
            <ExchangeForm />
        </div>
    );
};

export default Exchange;
