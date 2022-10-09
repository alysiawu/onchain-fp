import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import Avatar from "shared/Avatar/Avatar";
import NcImage from "shared/NcImage/NcImage";
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
  nft: any;
  unit: string;
  chain?: string;
  contractAddress?: string;
  tokenId?: string
  // TODO add better type
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

const CardNFTCuration: FC<CardNFTProps> = ({ chain, contractAddress, tokenId, className = "", isLiked, nft, owner, unit }) => {
  // console.log('--nft', nft)
  // const renderAvatars = () => {
  //   return (
  //     <div className="flex -space-x-1 ">
  //       <Avatar
  //         containerClassName="ring-2 ring-white dark:ring-neutral-900"
  //         sizeClass="h-5 w-5 text-sm"
  //       />
  //       <Avatar
  //         containerClassName="ring-2 ring-white dark:ring-neutral-900"
  //         sizeClass="h-5 w-5 text-sm"
  //       />
  //       <Avatar
  //         containerClassName="ring-2 ring-white dark:ring-neutral-900"
  //         sizeClass="h-5 w-5 text-sm"
  //       />
  //       <Avatar
  //         containerClassName="ring-2 ring-white dark:ring-neutral-900"
  //         sizeClass="h-5 w-5 text-sm"
  //       />
  //     </div>
  //   );
  // };

//   {
//     "contract": {
//         "address": "0xf553ed185e1a6766a4df9437cc0f470787c4d3cf"
//     },
//     "tokenId": "0",
//     "tokenType": "ERC1155",
//     "title": "FOUNDR DROP",
//     "description": "This is the clarion call for awakened Founders (Web3, Web4 & Web5) across the Earth. The on-chain fellowship of awakened Founders has begun, the advent of conscious and mindful foundership. We are extending an awakening invitation to the [Foundr Quest](https://foundr.quest). \n\n*Fellowship access with Alpha Pass (Challenge Edition).\n",
//     "timeLastUpdated": "2022-09-11T07:26:59.688Z",
//     "rawMetadata": {
//         "image": "ipfs://QmYXvw2sVfUCQHrBVpfMXdpbSbu5AnpzdPZPzwYo3Ls7Le/0.jpg",
//         "external_url": "https://foundr.quest",
//         "animation_url": "ipfs://QmYXvw2sVfUCQHrBVpfMXdpbSbu5AnpzdPZPzwYo3Ls7Le/1.mp4",
//         "background_color": "",
//         "name": "FOUNDR DROP",
//         "description": "This is the clarion call for awakened Founders (Web3, Web4 & Web5) across the Earth. The on-chain fellowship of awakened Founders has begun, the advent of conscious and mindful foundership. We are extending an awakening invitation to the [Foundr Quest](https://foundr.quest). \n\n*Fellowship access with Alpha Pass (Challenge Edition).\n",
//         "attributes": [
//             {
//                 "value": "1x Access Token",
//                 "trait_type": "EKOPHILIC-LOBBY"
//             },
//             {
//                 "value": "1x Allowlist Spot",
//                 "trait_type": "ALPHA PASS {CE}"
//             }
//         ],
//         "supply": "126000"
//     },
//     "tokenUri": {
//         "raw": "ipfs://QmYgphz19z96Qcb34jNuvWsxCRtcM4NYAU9ybewzavoEBq/0",
//         "gateway": "https://ipfs.io/ipfs/QmYgphz19z96Qcb34jNuvWsxCRtcM4NYAU9ybewzavoEBq/0"
//     },
//     "media": [
//         {
//             "raw": "ipfs://QmYXvw2sVfUCQHrBVpfMXdpbSbu5AnpzdPZPzwYo3Ls7Le/0.jpg",
//             "gateway": "https://ipfs.io/ipfs/QmYXvw2sVfUCQHrBVpfMXdpbSbu5AnpzdPZPzwYo3Ls7Le/0.jpg"
//         }
//     ]
// }
// console.log('nft', nft)
const navigate = useNavigate()
  return (
    <div
      className={`nc-CardNFT relative flex flex-col group !border-0 [ nc-box-has-hover nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="CardNFT"
    >
      <div className="relative flex-shrink-0 ">
        <div
         style={{
            cursor: 'pointer'
        }}
            onClick={
                () => {
                    const to=`/${chain}/${contractAddress}/${tokenId}`
                    navigate(to , {
                        state: {
                            nft,
                       
                        }
                    })
                }
            }

        >
          <NcImage
            containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0 rounded-3xl overflow-hidden z-0"
            src={nft?.media[0]?.gateway}
            className="object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
          />
          
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

  
      {<div className="flex justify-between">
          {/* {renderAvatars()} */}
          {nft.tokenType} 

          {/* {nft.rawMetadata?.description.slice(10)}...  */}
          {/* {nft && nft.metaData.jobFamily} */}
          {/* <span className="text-neutral-700 dark:text-neutral-400 text-xs">
            {Math.floor(Math.random() * 90) + 10} in stock
          </span> */}
        </div> }
       
        {<div className="flex justify-between">
          {/* {renderAvatars()} */}
          {nft.title} 

          {/* Contract {nft.contract.address.slice(0, 10)}...  */}
          {/* {nft.rawMetadata?.description.slice(10)}...  */}
          {/* {nft && nft.metaData.jobFamily} */}
          {/* <span className="text-neutral-700 dark:text-neutral-400 text-xs">
            {Math.floor(Math.random() * 90) + 10} in stock
          </span> */}
        </div> }
  
        {<div className="justify-between">
          {/* {renderAvatars()} */}

         
          {/* {nft?.rawMetadata?.attributes?.map((t: { trait_type: any; value: any; }) => {
            return <div className="flex justify-between">
              {t.trait_type} - {t.value}
            </div>
          })} */}
          {/* Contract {nft.contract.address.slice(0, 10)}...  */}
          {/* {nft.rawMetadata?.description.slice(10)}...  */}
          {/* {nft && nft.metaData.jobFamily} */}
          {/* <span className="text-neutral-700 dark:text-neutral-400 text-xs">
            {Math.floor(Math.random() * 90) + 10} in stock
          </span> */}
        </div> }
  

    
    

        {/* <div className="w-2d4 w-full border-b border-neutral-100 dark:border-neutral-700"></div> */}

        <div className="flex justify-between items-end ">
          {/* <Prices labelTextClassName="bg-white dark:bg-neutral-900 dark:group-hover:bg-neutral-800 group-hover:bg-neutral-50" 
            price={nft?.rawMetadata?.price}
            // unit={}
            unit={unit}
          /> */}
           {/* <a style={{ padding: '10px 15px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#19FDA6'}} href={`/${chain}/${contractAddress}/${tokenId}`} >View Details</a>
            <div></div> */}

          
            {/* <a style={{ padding: '10px 15px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#19FDA6'}} href={`https://opensea.io/assets/${chain}/${contractAddress}/${tokenId}`} >View on OpenSea</a> */}
            <div></div>

         
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

export default CardNFTCuration;
