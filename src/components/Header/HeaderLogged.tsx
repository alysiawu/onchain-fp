import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import MainNav2Logged from "./MainNav2Logged";

export interface HeaderLoggedProps {}

const HeaderLogged: FC<HeaderLoggedProps> = () => {

  const location = useLocation()
  // console.log('--location', location.pathname == "/register")
  return (
    <div className="nc-HeaderLogged relative w-full z-40 " >
      {/* NAV */}
     
     {<div
      style={{
        textAlign: 'center',
        background: '#000',
        color: '#19FDA6',
        padding: '10px'
      }}
     > 
     {/* lewk.app is open to everyone for a limited time only! */}
     
     </div>}
      <MainNav2Logged />
    </div>
  );
};

export default HeaderLogged;
