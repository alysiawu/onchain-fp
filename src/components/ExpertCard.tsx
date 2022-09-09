import { useFirebaseContext } from "contexts/firebaseContext";
import React, { FC } from "react";
import {  Link, useNavigate } from "react-router-dom";
import { trackEvent } from "utils/tracking";
// import { Link } from "react-router-dom";
// import Avatar from "shared/Avatar/Avatar";
// import NcImage from "shared/NcImage/NcImage";
// import { nftsImgs } from "contains/fakeData";
// import ItemTypeImageIcon from "./ItemTypeImageIcon";
// import LikeButton from "./LikeButton";
// import Prices from "./Prices";
// import { ClockIcon } from "@heroicons/react/outline";
// import ItemTypeVideoIcon from "./ItemTypeVideoIcon";

export interface CardNFTProps {
  className?: string;
  isLiked?: boolean;
  owner?: boolean;
  type?: string
  // TODO add better type
  oppo: {
    uuid: string,
    title: string,
    company: string,
    location?: string,
    h1b?: string,
    email?: string,
    name?: string
    bountyAmount? :string
    role?: string;
    jobDescriptionLink?: string;
    companyLink?: string;
    profileImage?: string;
  },
  index: number;
//   nft?: {
//     tokenId: string;
//     image: string;
//     title: string;
//     company: string;
//     location: string;
//     price: string;
//     metaData: any;
//   }
}



const ExpertCard: FC<CardNFTProps> = ({ className = "", isLiked, oppo, index }) => {
    const expertId = index
    const navigate  = useNavigate()
//   const renderAvatars = () => {
//     return (
//       <div className="flex -space-x-1 ">
//         <Avatar
//           containerClassName="ring-2 ring-white dark:ring-neutral-900"
//           sizeClass="h-5 w-5 text-sm"
//         />
//         <Avatar
//           containerClassName="ring-2 ring-white dark:ring-neutral-900"
//           sizeClass="h-5 w-5 text-sm"
//         />
//         <Avatar
//           containerClassName="ring-2 ring-white dark:ring-neutral-900"
//           sizeClass="h-5 w-5 text-sm"
//         />
//         <Avatar
//           containerClassName="ring-2 ring-white dark:ring-neutral-900"
//           sizeClass="h-5 w-5 text-sm"
//         />
//       </div>
//     );
//   };
const {
    email, 
    photoUrl,
    displayName,
    uid,
    signInWithGoogle
  } = useFirebaseContext()

const clickQuickApply = () => {


     
    trackEvent('ReferralCard_ClickRequest', {
        email, 
        uid,
    })

    navigate('/referral-req', {
        state: {
            oppo
        }
    })
    
}

  return (
    <div
      className={`nc-CardNFT relative flex flex-col group !border-0 [ nc-box-has-hover nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="CardNFT"
      style={{background: 'grey', boxShadow: '0 0 50px #39f889', padding: '1.5rem'}}
    >
      <div className="relative flex-shrink-0  justify-center items-center text-center">
        <div className={`text-lg font-medium py-5`} style={{height: '100px'}}>
        {oppo?.role}
          {/* <NcImage
            containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0 rounded-3xl overflow-hidden z-0"
            src={nft&& nft.image || nftsImgs[Math.floor(Math.random() * nftsImgs.length)]}
            className="object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
          /> */}

            {/* {oppo?.company} */}
          
          
           

            {/* <NcImage
            containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0 rounded-3xl overflow-hidden z-0"
            src={nftsImgs[Math.floor(Math.random() * nftsImgs.length)]}
            className="object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
          /> */}
            {/* {oppo?.company} */}
          
        </div>
     
        <div>


        <div className={`flex-grow flex justify-center`}>
            
        </div>
     
        {/* <div className="w-11/12 max-w-[360px] transform -mt-32 relative z-10"> */}
        <div className={`px-5 flex items-center space-x-4 relative `}>
            
          <div className={`flex-grow flex justify-center`}>
              
            <img src={`https://api.multiavatar.com/fepr${index}.svg`} alt="Hiring Manager Image"  style={{borderRadius: '200px'}} />
          </div>
          
          {/* <ButtonPlayMusicRunningContainer
            className="relative z-10"
            nftId={DEMO_NFT_ID}
            renderDefaultBtn={() => renderListenButtonDefault()}
            renderPlayingBtn={() => renderListenButtonDefault("playing")}
            renderLoadingBtn={() => renderListenButtonDefault("loading")}
          /> */}
        {/* </div> */}

        {/* <Link
          to={"/nft-detail"}
          className="block p-5 mt-5 bg-white dark:bg-neutral-800 shadow-xl dark:shadow-2xl rounded-3xl rounded-tl-none"
        >
          <div className="flex items-center justify-between">
            <h2 className={`text-lg font-semibold`}>NFT music #1132</h2>
            {renderAvatars()}
          </div>

          <div className="w-full mt-1.5 flex justify-between items-end ">
            <Prices
              labelText="Price"
              labelTextClassName="bg-white dark:bg-neutral-800 "
            />
            <span className="block text-neutral-500 dark:text-neutral-400 text-xs">
              {Math.floor(Math.random() * 90) + 10} in stock
            </span>
          </div>
        </Link> */}
      </div>
      
  

      <div className={`flex-grow flex justify-center`}>
        
      {oppo?.name}

 
        </div>
        <div className="relative  justify-center items-center text-center">
      {oppo?.company}

      </div>


      <div className="relative justify-center items-center text-center">
      {/* <a style={{background: '#39f889', padding: '12px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}} onClick={clickQuickApply} > Request to talk</a> */}

      </div>

      
     

        </div>
        <div>

        {/* {oppo?.jobDescriptionLink} */}


</div>
        <div>

        {/* Bounty ${oppo?.bountyAmount} */}


</div>
         <div>

          

            {/* H1B: {oppo?.h1b === 'yes'?  '👍': '👀'} */}
 

        </div>
        <div>



            {/* Remote: {oppo?.location == 'remote' ?  '👍': '👀'} */}

        </div>
<div>



{/* {oppo?.email} */}


</div>

        {/* {Math.random() > 0.5 ? (
          <ItemTypeVideoIcon className="absolute top-3 left-3 !w-9 !h-9" />
        ) : (
          <ItemTypeImageIcon className="absolute top-3 left-3 !w-9 !h-9" />
        )}
        <LikeButton
          liked={isLiked}
          className="absolute top-3 right-3 z-10 !h-9"
        /> */}
        <div className="absolute top-3 inset-x-3 flex">

    

        </div>
        
      </div>

      <div className="p-4 py-5 space-y-3">
        <div className="flex justify-between">
            
          {/* {renderAvatars()} */}
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

 

        {/* <div className="w-2d4 w-full border-b border-neutral-100 dark:border-neutral-700"></div> */}

        {/* <div className="flex justify-between items-end "> */}
          {/* <Prices labelTextClassName="bg-white dark:bg-neutral-900 dark:group-hover:bg-neutral-800 group-hover:bg-neutral-50" 
            price={nft?.price || nft?.metaData.price}
          /> */}
          {/* <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400"> */}
            {/* <h3 className="text-lg sm:text-2xl font-semibold"> */}
           
            {/* <div className={`flex-grow flex absolute bottom-5 left-55`}>
               
              <a style={{background: '#39f889', padding: '12px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}} onClick={clickQuickApply} > Request to talk</a>

             </div> */}

             <div className="relative justify-center items-center text-center">
      <a style={{background: '#39f889', padding: '12px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}} href={`/expert/${oppo.uuid}/${index}`} > Request to talk</a>

      {/* <Link
            to={{
                pathname: `/expert/${oppo.uuid}`,
                // @ts-ignore
                state: {
                    image: `https://api.multiavatar.com/fepr${index}.svg`,
                
                },
            }}
            >
Request to talk
</Link> */}



      </div>

           


       
            {/* <ClockIcon className="w-4 h-4" />
            <span className="ml-1 mt-0.5">
              {Math.floor(Math.random() * 20) + 1} hours left
            </span> */}
          {/* </div> */}
        {/* </div> */}
      </div>

      {/* <Link to={`/nft-detail/${nft?.tokenId}`} state={nft} className="absolute inset-0"></Link> */}
    </div>
  );
};

export default ExpertCard;
