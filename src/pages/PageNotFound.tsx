import React from "react";
import { ReactComponent as WaitingForYou } from "../images/undraw_Waiting__for_you_ldha.svg";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className='PageNotFound'>
      <div className='message'>
        <h1>Error 404</h1>
        <h2>Hummm...Something went wrong...</h2>
      </div>
      <WaitingForYou />

      <Link className='back-to-home-link' to='/'>
        Back To Home
      </Link>
    </div>
  );
};

export default PageNotFound;
