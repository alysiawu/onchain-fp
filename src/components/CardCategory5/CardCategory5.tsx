import React, { FC } from "react";
import NcImage from "shared/NcImage/NcImage";
import { Link, useNavigate } from "react-router-dom";
import images1 from "images/nfts/cat1.webp";
import VerifyIcon from "components/VerifyIcon";

export interface CardCategory5Props {
  className?: string;
  featuredImage?: string;
  name: string;
  index: number;
  benefits?: string;
  link?: string;
  communityId? :string;
  communityData? : any
}

const COLORS = [
  "bg-pink-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-red-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-gray-500",
];

const CardCategory5: FC<CardCategory5Props> = ({
  className = "",
  featuredImage = images1,
  name,
  index,
  benefits,
  link,
  communityId,
  communityData
}) => {
  console.log('---link', link)
  const nagivate = useNavigate()
  return (
    <>
    
  
    <div
      // to={"/page-collection"}
      // to={link || '/page-collection'}
     
      className={`nc-CardCategory5 flex flex-col ${className}`}
      data-nc-id="CardCategory5"
    >
      <div
        className={`flex-shrink-0 relative w-full aspect-w-4 aspect-h-3 h-0 rounded-2xl overflow-hidden group`}
        onClick={() => {
          nagivate(`/community/${communityId}`, {
            state: communityData,
          })
        }}
        style={{
          cursor: 'pointer'
        }}
      >
        <NcImage
          src={featuredImage}
          className="object-cover w-full h-full rounded-2xl"
        />

          <video className="w-full h-full" playsInline autoPlay muted loop  >
            <source src={featuredImage} type="video/mp4" />
            our browser does not support the video tag.
          </video>


        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
      </div>
      <div className="mt-4 flex items-center">
        
        {/* <div className={`w-10 h-10 rounded-full ${COLORS[index]}`}></div> */}
        <div className="ml-3">
          <span
            className={`block mt-1 text-sm text-neutral-6000 dark:text-neutral-400 flex`}
          >
            {/* {Math.floor(Math.random() * 1000 + 1000)} NFTs */}
            <VerifyIcon iconClass="w-4 h-4" /> <span
             className={`block mt-1 text-sm text-neutral-6000 dark:text-neutral-400 flex pl-2`}
             >Your chance of approval is excellent</span>
          
          </span>

          <h2
            className={`text-base mt-5 sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate`}
          >
            {name}
          </h2>
       
          <span
            className={`block mt-3 text-sm text-neutral-6000 dark:text-neutral-400`}
          >
            {/* {Math.floor(Math.random() * 1000 + 1000)} NFTs */}
            <b>Benefit: </b>{benefits?.slice(0, 50)}...
          </span>
          <span
            className={`block mt-3 text-sm text-neutral-6000 dark:text-neutral-400`}
          >
            {/* {Math.floor(Math.random() * 1000 + 1000)} NFTs */}
            <b>Membership fee: </b>{'7SOL'} +
          </span>
        </div>

        
        
      </div>
      <div className="flex items-center py-3 justify-between px-5 mt-10 text-center"
     onClick={() => {
      window.location.href = link || ''
    }}
    >
        <a style={{ padding: '10px', 

        // 'boxShadow': '0 0 50px #19FDA6',
        background: '#000',
        width: '100%', borderRadius: '20px', color: '#19FDA6'}} href={link} > Apply Now</a>
    </div>
    </div>
 

    </>
  );
};

export default CardCategory5;
