import React, { FC } from "react";
import { Link } from "react-router-dom";
import Avatar from "shared/Avatar/Avatar";
import NcImage from "shared/NcImage/NcImage";
import { nftsImgs } from "contains/fakeData";
import ItemTypeImageIcon from "./ItemTypeImageIcon";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import { ClockIcon } from "@heroicons/react/outline";
import ItemTypeVideoIcon from "./ItemTypeVideoIcon";

export interface CardNFTProps {
  className?: string;
  isLiked?: boolean;
  owner?: boolean;
  type?: string
  // TODO add better type
  nft?: {
    tokenId: string;
    image: string;
    title: string;
    company: string;
    location: string;
    price: string;
    metaData: any;
  }
}

const CardSkillBadge: FC<CardNFTProps> = ({ className = "", isLiked, type }) => {
  const renderAvatars = () => {
    return (
      <div className="flex -space-x-1 ">
        <Avatar
          containerClassName="ring-2 ring-white dark:ring-neutral-900"
          sizeClass="h-5 w-5 text-sm"
        />
        <Avatar
          containerClassName="ring-2 ring-white dark:ring-neutral-900"
          sizeClass="h-5 w-5 text-sm"
        />
        <Avatar
          containerClassName="ring-2 ring-white dark:ring-neutral-900"
          sizeClass="h-5 w-5 text-sm"
        />
        <Avatar
          containerClassName="ring-2 ring-white dark:ring-neutral-900"
          sizeClass="h-5 w-5 text-sm"
        />
      </div>
    );
  };


  return (
    <div
      className={`nc-CardNFT relative flex flex-col group !border-0 [ nc-box-has-hover nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="CardNFT"
    >
      <div className="relative flex-shrink-0 ">
        <div>
          {/* <NcImage
            containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0 rounded-3xl overflow-hidden z-0"
            src={nft&& nft.image || nftsImgs[Math.floor(Math.random() * nftsImgs.length)]}
            className="object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
          /> */}

            <NcImage
            containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0 rounded-3xl overflow-hidden z-0"
            src={nftsImgs[Math.floor(Math.random() * nftsImgs.length)]}
            className="object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
          />
          
        </div>
        {Math.random() > 0.5 ? (
          <ItemTypeVideoIcon className="absolute top-3 left-3 !w-9 !h-9" />
        ) : (
          <ItemTypeImageIcon className="absolute top-3 left-3 !w-9 !h-9" />
        )}
        <LikeButton
          liked={isLiked}
          className="absolute top-3 right-3 z-10 !h-9"
        />
        <div className="absolute top-3 inset-x-3 flex"></div>
      </div>

      <div className="p-4 py-5 space-y-3">
        <div className="flex justify-between">
          {renderAvatars()}
          {/* {nft && nft.metaData.company}  */}
          {/* {nft && nft.metaData.jobFamily} */}
          {/* <span className="text-neutral-700 dark:text-neutral-400 text-xs">
            {Math.floor(Math.random() * 90) + 10} in stock
          </span> */}
        </div>
        <h2 className={`text-lg font-medium`}>
        {/* Blockchain Engineer@Magic Eden Salary Data */}
        {/* {nft && nft.metaData.title} Salary Data  */}
        {/* { owned && nft?.metaData.base}
        { owned && nft?.metaData.equity} */}
        
        {/* #{Math.floor(Math.random() * 1000) + 1000} */}
        </h2>

        <div className="w-2d4 w-full border-b border-neutral-100 dark:border-neutral-700"></div>

        <div className="flex justify-between items-end ">
          {/* <Prices labelTextClassName="bg-white dark:bg-neutral-900 dark:group-hover:bg-neutral-800 group-hover:bg-neutral-50" 
            price={nft?.price || nft?.metaData.price}
          /> */}
          <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
            {/* <ClockIcon className="w-4 h-4" />
            <span className="ml-1 mt-0.5">
              {Math.floor(Math.random() * 20) + 1} hours left
            </span> */}
          </div>
        </div>
      </div>

      {/* <Link to={`/nft-detail/${nft?.tokenId}`} state={nft} className="absolute inset-0"></Link> */}
    </div>
  );
};

export default CardSkillBadge;
