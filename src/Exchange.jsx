import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { ExchangeForm } from "./components/exchangeform";
import Raining from './components/raining';
import { useUser, RedirectToSignIn } from '@clerk/clerk-react';


const Exchange = (props) => {
    const { isSignedIn, user } = useUser();

    if (!isSignedIn) {
        return <RedirectToSignIn />;
    }

    return (
        <div>
            <Raining />
            <Navigation />
            <ExchangeForm />
        </div>
    );
};

export default Exchange;
