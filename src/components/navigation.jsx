import React, { useEffect } from "react";
import { useUser, SignedIn, SignedOut, SignInButton, UserButton, SignUpButton } from "@clerk/clerk-react";
import axios from 'axios';
import { FaDiscord } from "react-icons/fa6";

export const Navigation = (props) => {
  const { user, isSignedIn } = useUser();
  useEffect(() => {
    if (isSignedIn && user) {
      console.log('User signed up:', user);
      const userDetails = {
        id: user.id,
        fullName: user.fullName,
        emailAddress: user.primaryEmailAddress.emailAddress
      };

      try {

        axios.post(`${process.env.REACT_APP_API_URL}/add-user`, {
          userDetails
        }).then(() => {
          console.log('success');

        }).catch(function (error) {
          console.log(error)
        });
        console.log('User saved to database');
      } catch (error) {
        console.error('Error saving user to database:', error);
      }
    }
  }, [isSignedIn, user]);

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top navbar-custom">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll site-logo" href="/">
            PlusExchanges
            <img src="img/logo.png" className="img-responsive" alt="" />
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="https://discord.gg/FUdHngcGwS" className="page-scroll" target="_blank">
                <FaDiscord />
              </a>
            </li>
            <li>
              <a href="#about" className="page-scroll">
                About
              </a>
            </li>

            <li>
              <a href="#contact" className="page-scroll">
                Contact
              </a>
            </li>
            <li>
              <a href="/terms" className="page-scroll">
                Terms Of Services
              </a>
            </li>
            <li>

              <SignedOut>
                <a className="page-scroll">
                  <SignInButton />
                </a>
              </SignedOut>
            </li>
            <li>
              <a href="#platforms" className="page-scroll">
                <SignedOut>
                  <SignUpButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
