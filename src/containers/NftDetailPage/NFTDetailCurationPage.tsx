import React, { FC, useEffect, useState } from "react";
import { useLocation, useParams } from 'react-router-dom'
// import { ethers } from 'ethers'
// import Web3Modal from 'web3modal'
// import { marketplace as marketplaceAddress } from '../../utils/constants'
// import marketplaceAbi from '../../artifacts/marketplace.json'

// import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";
// import ButtonPrimary from "shared/Button/ButtonPrimary";
// import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcImage from "shared/NcImage/NcImage";
// import LikeSaveBtns from "./LikeSaveBtns";
// import BackgroundSection from "components/BackgroundSection/BackgroundSection";
// import SectionSliderCategories from "components/SectionSliderCategories/SectionSliderCategories";
// import VerifyIcon from "components/VerifyIcon";
// import { nftsLargeImgs, personNames } from "contains/fakeData";
// import TimeCountDown from "./TimeCountDown";
// import TabDetail from "./TabDetail";
// import collectionPng from "images/nfts/collection.png";
// import ItemTypeVideoIcon from "components/ItemTypeVideoIcon";
// import LikeButton from "components/LikeButton";

// import AccordionInfo from "./AccordionInfo";
// import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import { getNFTMetadata } from "utils/alchemy";
import NcModal from "shared/NcModal/NcModal";

// import Input from "shared/Input/Input";
import { Textarea } from "@chakra-ui/react";
// import FormItem from "components/FormItem";
import { ButtonGreen } from "components/ButtoGreen";
import { useWeb3React } from "@web3-react/core";
import { getCurationNotesForNFT, saveCuratedNFTPerWalletFirebase, savenftCurationPerNFTFirebase } from "containers/PageHome/helpers";
import { TwitterIcon, TwitterShareButton } from "react-share";
import { trackEvent } from "utils/tracking";
import { db } from "contexts/firebase";
import { onValue, ref } from "firebase/database";
import { SlackSelector } from "@charkour/react-reactions";
import { PokemonSelector } from "@charkour/react-reactions";
// import "./index.css"

export interface NftDetailPageProps {
  className?: string;
  isPreviewMode?: boolean;
}

const NftDetailCurationPage: FC<NftDetailPageProps> = ({
  className = "",
  isPreviewMode,
}) => {
const {
    tokenId, 
    contractAddress,
    chain
} = useParams()
const {
    state
} = useLocation()

const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active
  } = useWeb3React();

//   console.log('state', state)
  const { nft } = state as { nft: any}

  const [nftMetadata, setNftMetaData] = useState<any>()

  const _getNFTMetadata = async (contractAddress: string, tokenId: string) => {
      const response =  await getNFTMetadata(contractAddress, tokenId, chain as  'ethereum' | 'polygon')
    //   console.log('---response', response)
      setNftMetaData(response)

  }


  const [showCurationModal, setShowCurationModal] = useState(false)
    const [curationNote, addCurationNote] = useState('')
    const [reaction, setReaction] = useState('')
const [curationNotesForNFT, setCurationNotesForNFT] = useState()
const [rating, setRating] = useState()
const [emojiSelector, setEmojiSelector] = useState(false);
const [overflow, setOverflow] = useState("hidden");

const Reaction = ({
    // @ts-ignore
    emoji
}) => {
    const [scale, setScale] = useState(false)
    return (
        <span className="m-3"
        onMouseEnter={() => {
            setScale(true)
        }}
        onMouseLeave={() => {
            setScale(false)
        }}
        onClick={
            () => {
                setReaction(emoji)
            }
        }

        style={{
            cursor: 'pointer',
            transform: `${scale ? 'scale(2)' : 'scale(0.5}'}`
        }}
        >{emoji}</span>
    )
}
  const  renderContent = () => {
      
      return (
  
          <form action="#">
             
          <h3 className="text-lg mb-5 font-semibold text-neutral-900 dark:text-neutral-200">
         
          {account &&  '✨🔮 Add your reaction & curation note 🔮✨' }
          {!account &&  '😢  Sign in with wallet to curate and react 😢 ' }

          </h3>

          {/* <SlackSelector /> */}
        <div
        style={{
            // background: 'white',
            borderRadius: '10px',
            padding: '5px',
            display: 'flex'
        }}>
        
        <Reaction emoji={'👍'} />
          
        <Reaction emoji={'❤️'} />
          
        <Reaction emoji={'🚀'} />
          
        <Reaction emoji={'🎉'} />
        <Reaction emoji={'👎'} />
        <Reaction emoji={'😡'} />

        </div>
          <span className="text-l flex mt-10">
          {/* https://codesandbox.io/s/affectionate-oskar-clb216?file=/src/App.js */}
       
              <Textarea 
                defaultValue="" 
                // className={errorInput.name ? 'error' : ''}
                onChange={
                  (e) => {
                    addCurationNote(
   
                       e.target.value,
                  )
                  }
                }
              />
  
          </span>
          <div className="mt-8 space-x-3 text-right">
            {/* <ButtonPrimary onClick={handleClickSubmitForm} type="submit">
              Delete
            </ButtonPrimary> */}
                   <a style={{background: '#19FDA6', padding: '10px 20px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111',
                   cursor: 'pointer'
                   }} onClick={
                       async () => {
// save to db 

                        account && await saveCuratedNFTPerWalletFirebase(account, {
                            nft,
                            curationNote: curationNote,
                            reaction,
                        })
                        chain && contractAddress && tokenId && account && await savenftCurationPerNFTFirebase(
                            chain, 
                            contractAddress,
                            tokenId,
                            curationNote,
                            account,
                            reaction
                        )
                        // setShowCurationModal(false)
                       }


                   } >Add</a>


            
          </div>
        </form>
      )
    }

    const _getCurationNotesForNFT = async (chain: string, contractAddress: string, tokenId: string) => {
        //   const _curationNotesForNFT = await getCurationNotesForNFT(chain, contractAddress, tokenId)
    
          const path = 'CurationsPerNFT/' + chain + '/' + contractAddress + '/' + tokenId
    
          const curation = ref(db, path);
      
          onValue(curation, (snapshot: { val: () => any; }) => {
              // console.log('--snapshot', snapshot, snapshot.exists())
      
              // if (snapshot.exists()) {
              var data = snapshot.val();
            //   console.log('===data', data)
                //   @ts-ignore
                // const flatternCurationData = (curationNotesForNFT) => {
                //     const curationNotesForNFTWallets = curationNotesForNFT && Object.values(curationNotesForNFT)
                //     // @ts-ignore
                //     const data = Object.values(curationNotesForNFTWallets).map(curationNoteData => {
                //         return curationNoteData
                //    })
                // //    console.log('eeeeedata', data)
                //   }
                //  const flattened =  data && flatternCurationData(data)
                setCurationNotesForNFT(data)
          })
    }

  useEffect(() => {

    contractAddress && tokenId &&  _getNFTMetadata(contractAddress, tokenId)
    chain && contractAddress &&  tokenId && _getCurationNotesForNFT(chain, contractAddress, tokenId)
  }, [contractAddress, tokenId, chain])




//   useEffect(() => {
//     chain && contractAddress &&  tokenId && _getCurationNotesForNFT(chain, contractAddress, tokenId)

//   }, [chain, contractAddress, tokenId])
  

  const renderSection1 = () => {



    return (
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
        {/* ---------- 1 ----------  */}
        <div className="pb-9 space-y-5">
          <div className="flex justify-between items-center">
            <Badge name={nft.tokenType} color="green" />
            {/* <LikeSaveBtns /> */}

            <span style={{paddingTop: '10px'}}>
               
               <div style={{
                 marginTop: '0px'
               }}> ✨ Share</div>
               <TwitterShareButton
               onClick={() => {
          

                 trackEvent('ShareCurationPageTwitter_Clicked', {
                   library,
                   chainId,
                   account,
                   activate,
                   deactivate,
                   active
                 })


               }}
               style={{background: 'none', margin: '1rem', marginTop: '10px'}}
                 title={`I just curated this NFT here. ${curationNote}`}
                 url={window.location.href}
                 hashtags={["lewk", "nfts",  "web3", "web3community", "blockchain"]}
               >
                 <TwitterIcon size={32} round />
           
               </TwitterShareButton>
           </span>

          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {nft.title}
            
     

          </h2>

          {/* ---------- 4 ----------  */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm">
            <div className="flex items-center ">
              {/* <Avatar sizeClass="h-9 w-9" radius="rounded-full" /> */}
              <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
                <span className="text-sm">Last updated {
                    nft.timeLastUpdated
                }</span>
                <span className="text-neutral-900 mt-5 dark:text-neutral-200 font-medium flex items-center">
                  <span>{nft.description}</span>
                  
                  {/* <VerifyIcon iconClass="w-4 h-4" /> */}
                </span>

                <span className="text-neutral-900 mt-5 dark:text-neutral-200 font-medium flex items-center">
                  <a href={nft.rawMetadata.external_url}
                    style={{
                        color: '#19FDA6',
                        borderBottom: '1px solid #19FDA6'
                    }}
                  >External Url</a>
                  
                  {/* <VerifyIcon iconClass="w-4 h-4" /> */}
                </span>

                <span className="text-neutral-900 mt-5  dark:text-neutral-200 font-medium flex items-center">
                  <a href={nft.tokenUri.gateway}
                    style={{
                        color: '#19FDA6',
                        borderBottom: '1px solid #19FDA6'
                    }}
                  >Token Url Gateway</a>
                  
                  {/* <VerifyIcon iconClass="w-4 h-4" /> */}
                </span>

              </span>
            </div>
            {/* <div className="hidden sm:block h-6 border-l border-neutral-200 dark:border-neutral-700"></div> */}
            {/* <div className="flex items-center">
              <Avatar
                imgUrl={ collectionPng}
                sizeClass="h-9 w-9"
                radius="rounded-full"
              />
              <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
                <span className="text-sm">Collection</span>
                <span className="text-neutral-900 dark:text-neutral-200 font-medium flex items-center">
                  <span>{"The Moon Ape"}</span>
                  <VerifyIcon iconClass="w-4 h-4" />
                </span>
              </span>
            </div> */}
          </div>
        </div>

        {/* ---------- 6 ----------  */}
        {/* <div className="py-9">
          <TimeCountDown />
        </div> */}

        {/* ---------- 7 ----------  */}
        {/* PRICE */}
        <div className="pb-9 pt-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
            {/* <div className="flex-1 flex flex-col sm:flex-row items-baseline p-6 border-2 border-green-500 rounded-xl relative">
              <span className="absolute bottom-full translate-y-1 py-1 px-1.5 bg-white dark:bg-neutral-900 text-sm text-neutral-500 dark:text-neutral-400">
                Current Price
              </span>
              <span className="text-3xl xl:text-4xl font-semibold text-green-500">
                1000 MATIC
              </span>
              <span className="text-lg text-neutral-400 sm:ml-5">
                ( ≈ $3,221.22)
              </span>
            </div> */}

            {/* <span className="text-sm text-neutral-500 dark:text-neutral-400 ml-5 mt-2 sm:mt-0 sm:ml-10">
              [96 in stock]
            </span> */}
          </div>
         
          <div className="mt-8 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                {/* <a style={{background: '#19FDA6', padding: '10px 20px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} onClick={() => {
                    setShowCurationModal(true)
                }} >Curate</a> */}

{renderContent()}
                
                {/* <ButtonGreen 
                disabled={!account}
                copy="Add your curation note" onClick={
                    () => {
                        setShowCurationModal(true)
                    }
                }/> */}

            {/* <ButtonPrimary href={"/connect-wallet"} className="flex-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.5 12.4101V7.8401C2.5 6.6501 3.23 5.59006 4.34 5.17006L12.28 2.17006C13.52 1.70006 14.85 2.62009 14.85 3.95009V7.75008"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22.5588 13.9702V16.0302C22.5588 16.5802 22.1188 17.0302 21.5588 17.0502H19.5988C18.5188 17.0502 17.5288 16.2602 17.4388 15.1802C17.3788 14.5502 17.6188 13.9602 18.0388 13.5502C18.4088 13.1702 18.9188 12.9502 19.4788 12.9502H21.5588C22.1188 12.9702 22.5588 13.4202 22.5588 13.9702Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 12H14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="ml-2.5">Buy now</span>
            </ButtonPrimary> */}
            {/* <ButtonSecondary href={"/connect-wallet"} className="flex-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M8.57007 15.27L15.11 8.72998"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.98001 10.3699C9.65932 10.3699 10.21 9.81923 10.21 9.13992C10.21 8.46061 9.65932 7.90991 8.98001 7.90991C8.3007 7.90991 7.75 8.46061 7.75 9.13992C7.75 9.81923 8.3007 10.3699 8.98001 10.3699Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.52 16.0899C16.1993 16.0899 16.75 15.5392 16.75 14.8599C16.75 14.1806 16.1993 13.6299 15.52 13.6299C14.8407 13.6299 14.29 14.1806 14.29 14.8599C14.29 15.5392 14.8407 16.0899 15.52 16.0899Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg> */}

              {/* <span className="ml-2.5"> Make offer</span> */}
            {/* </ButtonSecondary> */}
          </div>
        </div>

        {/* ---------- 9 ----------  */}
        {/* <div className="pt-9">
          <TabDetail />
        </div> */}


      {
       showCurationModal && <NcModal
        isOpenProp={showCurationModal}
        onCloseModal={() => {
          setShowCurationModal(false)
        }}
        contentExtraClass="max-w-screen-sm"
        renderContent={renderContent}
        // renderTrigger={renderTrigger}
        modalTitle=""
      />
      }

      </div>
    );
  };


  return (
    <div
      className={`nc-NftDetailPage  ${className}`}
      data-nc-id="NftDetailPage"
    >
      {/* MAIn */}
      <main className="container mt-11 flex ">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
          {/* CONTENT */}
          <div className="space-y-8 lg:space-y-10">
            {/* HEADING */}
            <div className="relative">
              <NcImage
                src={nft.media[0].gateway}
                containerClassName="aspect-w-11 aspect-h-12 rounded-3xl overflow-hidden"
              />
              {/* META TYPE */}
              {/* <ItemTypeVideoIcon className="absolute left-3 top-3  w-8 h-8 md:w-10 md:h-10" /> */}

              {/* META FAVORITES */}
              {/* <LikeButton className="absolute right-3 top-3 " /> */}
            </div>
            {/* {JSON.stringify(curationNotesForNFT)} */}
                {curationNotesForNFT && Object.values(curationNotesForNFT).map(notePerWallets => {
                    return (
                        // @ts-ignore
                        Object.values(notePerWallets).map(note => {
                            return (
                                <div className="flex items-center space-bound"
                                
                                style={{
                                    color: '#19FDA6', 
                                    // padding: '10px 20px', 
                                    'boxShadow': '0 0 50px #19FDA6',
                                    //  borderRadius: '20px',
                                }}>
                                    {/* @ts-ignore */}
                                    <div className="m-3">Curator: {note?.wallet.slice(0, 6)} </div>
                                          {/* @ts-ignore */}
                                    <div className="m-3">  {note?.reaction} </div>
                                                   {/* @ts-ignore */}
                                    <div className="m-3">  {note?.curationNote} </div>
                                          {/* @ts-ignore */}
                                    
                                    <div className="m-3"> {new Date(note?.updatedAt).toDateString()}</div>
                                </div>
                            )
                        })
                    )
                 
                }) }
            {/* <AccordionInfo /> */}
          </div>

          {/* SIDEBAR */}
          <div className="pt-10 lg:pt-0 xl:pl-10 border-t-2 border-neutral-200 dark:border-neutral-700 lg:border-t-0">
            {renderSection1()}
          </div>
        </div>
      </main>

      
      {/* OTHER SECTION */}
      {!isPreviewMode && (
        <div className="container py-24 lg:py-32">
          {/* SECTION 1 */}
          {/* <div className="relative py-24 lg:py-28">
            <BackgroundSection />
            <SectionSliderCategories />
          </div> */}

          {/* SECTION */}
          {/* <SectionBecomeAnAuthor className="pt-24 lg:pt-32" /> */}
        </div>
      )}
    </div>
  );
};

export default NftDetailCurationPage;
