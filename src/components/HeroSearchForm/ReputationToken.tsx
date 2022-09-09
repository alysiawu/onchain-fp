import React, { FC } from "react";
import { ArrowRightIcon } from "@heroicons/react/solid";
import { NavLink } from "react-router-dom";
import Avatar from "shared/Avatar/Avatar";
import NcImage from "shared/NcImage/NcImage";
import { nftsImgs, _getPersonNameRd } from "contains/fakeData";
import VerifyIcon from "components/VerifyIcon";

export interface CardAuthorBox2Props {
  className?: string;
  index : number;
}

const ReputationToken: FC<CardAuthorBox2Props> = ({ className = "", index }) => {

const copies = [
    'built a NFT marketplace',
    'built a react timer',
    'Host a Twitter Space for Learning DAO',
    'helped reviewed an resume',
    'host a web3 learning event',
    'created a recommendation engine',
    'designed a home buying app',
    'solved a graph search problem',
    'build a to do app'
]

  return (
    <NavLink
      to={"/"}
      className={`nc-CardAuthorBox2 flex flex-col overflow-hidden [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="CardAuthorBox2"
    >
      <div className="relative flex-shrink-0 ">
        <div>
          <NcImage
            containerClassName="flex aspect-w-7 aspect-h-5 sm:aspect-h-6 w-full h-0"
            src={nftsImgs[Math.floor(Math.random() * nftsImgs.length)]}
          />
        </div>
        <div className="absolute top-3 inset-x-3 flex">
          {/* <div className=" py-1 px-4 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center leading-none text-xs font-medium">
            1.45 ETH <ArrowRightIcon className="w-5 h-5 text-yellow-600 ml-3" />
          </div> */}
          
        </div>
      </div>

      <div className="-mt-8 m-8 text-center">
        {/* <Avatar
          containerClassName="ring-2 ring-white"
          sizeClass="w-16 h-16 text-2xl"
          radius="rounded-full"
        /> */}
         {/* {copies[index]} */}
        <div className="mt-10">
          {/* <h2
            className={`text-base font-medium flex items-center justify-center`}
          > */}
                
                   {/* {copies[index]} */}
            {/* {_getPersonNameRd()} */}
            {/* <VerifyIcon /> */}
          {/* </h2> */}
          <span
            className={`block mt-1 text-sm text-neutral-500 `}
            style={{color: 'white'}}
          >
            {/* @creator */}
     
            {copies[index]}
          </span>
        </div>
      </div>
    </NavLink>
  );
};

export default ReputationToken;
