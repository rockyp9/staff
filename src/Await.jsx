import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { AwaitForm } from "./components/awaitform";
import { useUser, RedirectToSignIn } from '@clerk/clerk-react';
import RotatingImage from './components/rotatingimage';
import MovingDots from './components/movingdots';
import Raining from './components/raining';


const Await = (props) => {
    const { isSignedIn, user } = useUser();

    if (!isSignedIn) {
        return <RedirectToSignIn />;
    }

    return (
        <div>
            <Raining />
            {/* <RotatingImage /> */}
            <Navigation />
            <AwaitForm />
        </div>
    );
};

export default Await;
