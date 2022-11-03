import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "shared/Avatar/Avatar";
import NcImage from "shared/NcImage/NcImage";
import { nftsImgs } from "contains/fakeData";
import ItemTypeImageIcon from "./ItemTypeImageIcon";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import { ClockIcon } from "@heroicons/react/outline";
import ItemTypeVideoIcon from "./ItemTypeVideoIcon";
import { useWeb3React } from "@web3-react/core";
import { getNFTs } from "utils/alchemy";
import { Network } from "alchemy-sdk";
import { getDatabase, onValue, ref } from "firebase/database";

export interface CardNFTProps {
  className?: string;
  // isLiked?: boolean;
  // owner?: boolean;
  // TODO add better type
  gatedContent?: string;
  data: {
    description: string;
    imageUrl: string;
    title: string;
  
  }
}

const CardGatedLink: FC<CardNFTProps> = ({ className = "", data , gatedContent}) => {
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
  const [nftDataETH, setNFTDataETH] = useState<any>()
  const [nftDataPOLYGON, setNFTDataPOLYGON] = useState<any>()
  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active
  } = useWeb3React();
  
  // const [gatedContent, setGatedContent] = useState()
  // const [loading, setLoading] = useState(false)
  // const [hasAccess, setHasAssess] = useState(false)

//   const getGatedContent =  (slug: string) => {
//     const db = getDatabase();
//     const path = 'GatedContent/' + slug
  
//     const curation = ref(db, path);
  
//     onValue(curation, (snapshot) => {
//         // console.log('--snapshot', snapshot, snapshot.exists())
  
//         // if (snapshot.exists()) {
//         var data = snapshot.val();
//         console.log('===GatedContent', data)
//         setGatedContent(data)
//         return data
//     })
  
//   }

  
//   const _getNFTs = async (wallet: string, _tokenGates: any) => {
//     setLoading(true)
//     setHasAssess(false)
//     const _nftData = await getNFTs(wallet, Network.ETH_MAINNET)
  
//     const _nftDataPolygon = await getNFTs(wallet, Network.MATIC_MAINNET)
  
//     let hasAccess = false
//     if ( _tokenGates[0].chain === 'Polygon') {
//       hasAccess = hasToken(_tokenGates[0],  _nftDataPolygon)
      
//     } else if ( _tokenGates[0].chain === 'Ethereum') {
//       hasAccess = hasToken(_tokenGates[0], _nftData)
//     }
  
//       setHasAssess(hasAccess)
//       hasAccess && getGatedContent(pageSlug)
  
  
//     // @ts-ignore
//     // setNFTData(_nftData)
//     setNFTDataPOLYGON(_nftDataPolygon)
//     setNFTDataETH(_nftData)
  
//     setLoading(false)
  
//   }

//   useEffect(() => {  

 
//     account && _getNFTs(account)

// }, [account])


  return (
    <div
      className={`nc-CardNFT relative flex flex-col group !border-0 [ nc-box-has-hover nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="CardNFT"
    >
      <NcImage
          containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0 rounded-3xl overflow-hidden z-0"
          src={data.imageUrl}
          className="object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
          />
          
      <div className="relative flex-shrink-0 ">
        <div>
          
         
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
        <div className="absolute top-3 inset-x-3 flex"></div>
      </div>

      <div className="p-4 py-5 space-y-3">
      {/* {data.gatedUrl} */}
      {data.title}

  
       
      

        <div className="w-2d4 w-full border-b border-neutral-100 dark:border-neutral-700"></div>

        <div className="flex justify-between items-end ">
         
          <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
          {data.description}
            {/* <ClockIcon className="w-4 h-4" />
            <span className="ml-1 mt-0.5">
              {Math.floor(Math.random() * 20) + 1} hours left
            </span> */}
          </div>
        </div>
      </div>
      {/* <div>{gatedContent}</div> */}
      
{/* 
      <Link to={`/nft-detail/${nft?.tokenId}`} state={nft} className="absolute inset-0"></Link> */}
    </div>
  );
};

export default CardGatedLink;
