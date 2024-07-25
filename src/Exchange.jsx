import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { ExchangeForm } from "./components/exchangeform";

import { useUser, RedirectToSignIn } from '@clerk/clerk-react';


const Exchange = () => {
    const { isSignedIn, user } = useUser();

    if (!isSignedIn) {
        return <RedirectToSignIn />;
    }

    return (
        <div>
            <Navigation />
            <ExchangeForm />
        </div>
    );
};

export default Exchange;
