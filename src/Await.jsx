import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { AwaitForm } from "./components/awaitform";

import { useUser, RedirectToSignIn } from '@clerk/clerk-react';


const Await = (props) => {
    const { isSignedIn, user } = useUser();

    if (!isSignedIn) {
        return <RedirectToSignIn />;
    }

    return (
        <div>
            <Navigation />
            <AwaitForm />
        </div>
    );
};

export default Await;
