import React from "react";
import { Link } from "react-router-dom";
import logoImg from "images/lew_logo.png";
import logoLightImg from "images/lew_logo.png";

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  imgLight = logoLightImg,
  className = "",
}) => {
  return (
    <Link
      to="/"
      className={`ttnc-logo inline-block text-primary-6000 ${className}`}
    >
      {/* THIS USE FOR MY CLIENT */}
      {/* PLEASE UN COMMENT BELLOW CODE AND USE IT */}
      <img
        style={{
          height: '50px',
          borderRadius: '50px'
          // width: '100px'
          // border: '1px solid white',
          // background: 'red'
        }}
          className={`block max-h-100`}
          src={img}
          alt="Logo"
        />

      {/* {img ? (
        <img
        style={{
          height: '100px'
        }}
          // className={`block max-h-100 ${imgLight ? "dark:hidden" : ""}`}
          src={img}
          alt="Logo"
        />
      ) : (
        "Logo Here"
      )}
      {imgLight && (
        <img
          // className="hidden max-h-12 dark:block"
          src={imgLight}
          alt="Logo-Light"
        />

        // 🚀
      )} */}

{/* 🚀 */}
    </Link>
  );
};

export default Logo;
