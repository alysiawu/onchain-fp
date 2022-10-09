import React, { FC, Fragment, useState, useEffect } from "react";
import Confetti from 'react-confetti'
// import { ethers } from 'ethers'
// import Web3Modal from 'web3modal'
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useLocation, useParams } from 'react-router-dom'
// import axios from 'axios';
import { Helmet } from "react-helmet";
import useWindowSize from 'react-use/lib/useWindowSize'
import { TwitterIcon, TwitterShareButton } from "react-share";

// import { marketplace as marketplaceAddress } from '../../utils/constants'
// import marketplaceAbi from '../../artifacts/marketplace.json'

// import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import NcImage from "shared/NcImage/NcImage";
import CardNFT from "components/CardNFT";
import Pagination from "shared/Pagination/Pagination";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import authorBanner from "images/nfts/authorBanner.png";
// import { nftsImgs } from "contains/fakeData";
// import NftMoreDropdown from "components/NftMoreDropdown";
// import ButtonDropDownShare from "components/ButtonDropDownShare";
// import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
// import SocialsList from "shared/SocialsList/SocialsList";
// import FollowButton from "components/FollowButton";
// import VerifyIcon from "components/VerifyIcon";
import { Tab } from "@headlessui/react";
import CardAuthorBox3 from "components/CardAuthorBox3/CardAuthorBox3";
// import ArchiveFilterListBox from "components/ArchiveFilterListBox";
// import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
// import { getNft } from "utils/getNFT";
// import { useAccountContext } from "contexts/accountContext";
// import CardNFT2 from "components/CardNFT2";
import CardSkillBadge from "components/CardSkillBage";
// import FormItem from "components/FormItem";
// import Input from "shared/Input/Input";
import { useFirebaseContext } from "contexts/firebaseContext";
import { trackEvent } from "utils/tracking";
import { getNFTs } from 'utils/alchemy'
import CardNFTDisplay from "components/CardNFTDisplay";
import { useWeb3React } from "@web3-react/core";
import { Network } from "alchemy-sdk";
import { BeatLoader } from "react-spinners";
import { checkOwnerOfNFT } from "containers/PageHome/helpers";
import CommunitiesPage from "containers/NftDetailPage/CommunitiesPage";
import JobsSearch from "containers/JobsSearch";
import Why from "containers/Why";
import HiringManagersPage from "containers/HiringManagersPage";

export interface AuthorPageProps {
  className?: string;
}

// const placeholderAvatar = 'https://api.multiavatar.com/eeeeee.svg'

const GatedTestPage: FC<AuthorPageProps> = ({ className = "" }) => {
  
  const { state } = useLocation()
 const _nftDataETH = (state as any)?.nftDataETH
 const _nftDataPOLYGON = (state as any)?.nftDataPOLYGON
 const [nftDataETH, setNFTDataETH] = useState<any>(_nftDataETH)
 const [nftDataPOLYGON, setNFTDataPOLYGON] = useState<any>(_nftDataPOLYGON)
   const [mintSuccess, setMintSuccess] = useState(false)
   const { width, height } = useWindowSize()
   const [walletAddress, setWalletAddress] = useState('')

   

 const [loading, setLoading] = useState(false)

  var Airtable = require('airtable');

  var base = new Airtable({apiKey: 'keyDr90Ny9XSuy819'}).base('appfZedSta1s4n06f');
  const { pageSlug } = useParams()
  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active
  } = useWeb3React();

  trackEvent('UserNamePage_Visited', {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active
  })


  const [gatedContent, setGatedContent] = useState()
  // const [nftData, setNFTData] = useState<any>()


    const db = getDatabase()
    const {avatarString} = useParams()
    const {
        email, 
        photoUrl,
        displayName,
        uid,
        signInWithGoogle
      } = useFirebaseContext()

      //  trackEvent('TalentProfileGatedSpace_Visited', {
      //       email, 
      //       uid,
      //   })
  const [hasAccess, setHasAssess] = useState(false)

  trackEvent('Gated_Content_Accessed', {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active
  })

  const [tokenGates, setTokenGates] = useState();

const getPageInfo =  (slug: string) => {
  const db = getDatabase();
  const path = 'customDomain/' + slug
  const curation = ref(db, path);

  onValue(curation, (snapshot) => {
      // console.log('--snapshot', snapshot, snapshot.exists())

      // if (snapshot.exists()) {
      var data = snapshot.val();
      console.log('===data', data)
      setTokenGates(data)

      account && _getNFTs(account, data)
      console.log('===pagegggggdata', data)

  })

}


  const getGatedContent =  (slug: string) => {
    const db = getDatabase();
    const path = 'GatedContent/' + slug
  
    const curation = ref(db, path);
  
    onValue(curation, (snapshot) => {
        // console.log('--snapshot', snapshot, snapshot.exists())
  
        // if (snapshot.exists()) {
        var data = snapshot.val();
        console.log('===GatedContent', data)
        setGatedContent(data)
        return data
    })
  
  }
 
  

  const [profileData, setProfileData] = useState<
  {
      email: string;
      linkToResume: string;
      name: string;
      phone: string;
      hourlyRate: string;
      primarySkill: string;

      skillsets: string;
      industryInterest: string;
      superpower: string;
      twoTruthOnelie: string;
      zoomLink: string;
  }>()

  const getWalletAddress = () => {

      base('NametoWallets').select({
        // Selecting the first 3 records in Grid view:
        // maxRecords: 3,
        view: "Grid view",
        // filterByFormula: `Name%3Dalysia`
    }).eachPage(function page(records: any[], fetchNextPage: () => void) {
        // This function (`page`) will get called for each page of records.
    
        records.forEach(function(record) {
            // console.log('Retrieved', record.get('Name'), '--', record.get('Wallets'));
            if (record.get('Name') === avatarString) {
                // setExisted(true)
                // setExistedWallets(record.get('Wallets'))
                const wallets = record.get('Wallets')
                setWalletAddress(wallets)
                // console.log('lllll', wallets)
               

            }
        });

    // @ts-ignore
    }, function done(err) {
        if (err) { console.error(err); return; }
    });


  }


const _getNFTs = async (wallet: string, data?: any) => {
  console.log('---gates', JSON.parse(data.video.tokenGates))
  // if (_nftDataPOLYGON && _nftDataPOLYGON) return
  setLoading(true)
  setHasAssess(false)
  const _nftData = await getNFTs(wallet, Network.ETH_MAINNET)
  const gatingContract = JSON.parse(data.video.tokenGates).contractAddress
  console.log('---gatingContract',gatingContract)
  _nftData.forEach(nft => {
    if (nft.contract.address == gatingContract) {
      console.log('--has access Eth')
      
      setHasAssess(true)

     }
  })
  const _nftDataPolygon = await getNFTs(wallet, Network.MATIC_MAINNET)
 
  _nftDataPolygon.forEach(_nft => {
    // console.log('--forEach', _nft.contract.address)
    if (_nft.contract.address == gatingContract) {
      console.log('--has access Polygon')
      setHasAssess(true)
     }
  })

  // console.log('nftData', _nftData)


 
    hasAccess && pageSlug && getGatedContent(pageSlug)



  // @ts-ignore
  // setNFTData(_nftData)
  setNFTDataPOLYGON(_nftDataPolygon)
  setNFTDataETH(_nftData)

  setLoading(false)

}




// fist get the page info
useEffect(() => {
  account && pageSlug && getPageInfo(pageSlug)
}, [pageSlug, account])

const reservedDomains = [
  'alysia',
  'alysiawu',
  'elon',
  'elonmust'
]

const hasGatingToken = () => {

}

  return (
    <div className={`nc-AuthorPage  ${className}`} data-nc-id="AuthorPage">
      <Helmet>
        <title>All your NFTs all in one place</title>
      </Helmet>


      {/* HEADER */}
      <div className="w-full">
        <div className="relative w-full h-40 md:h-60 2xl:h-72">
          <NcImage
            containerClassName="absolute inset-0"
            src={authorBanner}
            className="object-cover w-full h-full"
          />
        </div>
        
        <div className="container -mt-10 lg:-mt-16">
       
          <div className="relative bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-8 rounded-3xl md:rounded-[40px] shadow-xl flex flex-col md:flex-row">
            <div className="w-32 lg:w-44 flex-shrink-0 mt-12 sm:mt-0">
             
              <NcImage
                src={`https://api.multiavatar.com/${avatarString}.svg`}
                containerClassName="aspect-w-1 aspect-h-1 rounded-3xl overflow-hidden"
              />
              
            </div>

            
         
            <div className="pt-5 md:pt-1 md:ml-6 xl:ml-14 flex-grow">
              <div className="max-w-screen-sm ">
                <h2 className="inline-flex items-center text-2xl sm:text-3xl lg:text-4xl font-semibold">
                  {/* <span>{currentAccount?.slice(0, 6)}</span> */}
                  
                  {/* <VerifyIcon
                    className="ml-2"
                    iconClass="w-6 h-6 sm:w-7 sm:h-7 xl:w-8 xl:h-8"
                  /> */}
                </h2>
                <div className="flex items-center text-sm font-medium space-x-2.5 mt-2.5 text-green-600 cursor-pointer">
                  <span className="text-neutral-700 dark:text-neutral-300">
                  Avatar randomly generated based on your user name  🥳
                    {/* Email {profileData && profileData?.email} */}
                    {/* 4.0xc4c16ac453sa645a...b21a{" "} */}
                    {/* {currentAccount} */}    
                    
                  </span>
                  <span className="text-neutral-700 dark:text-neutral-300">
                    {/* Name: {profileData && profileData?.name} */}
                  
                  </span>
                  <span className="text-neutral-700 dark:text-neutral-300">   
                    {/* Phone: {profileData && profileData?.phone} */}
                    </span>

                 
                  {/* <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
                    <path
                      d="M18.05 9.19992L17.2333 12.6833C16.5333 15.6916 15.15 16.9083 12.55 16.6583C12.1333 16.6249 11.6833 16.5499 11.2 16.4333L9.79999 16.0999C6.32499 15.2749 5.24999 13.5583 6.06665 10.0749L6.88332 6.58326C7.04999 5.87492 7.24999 5.25826 7.49999 4.74992C8.47499 2.73326 10.1333 2.19159 12.9167 2.84993L14.3083 3.17493C17.8 3.99159 18.8667 5.71659 18.05 9.19992Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.5498 16.6583C12.0331 17.0083 11.3831 17.3 10.5915 17.5583L9.2748 17.9917C5.96646 19.0583 4.2248 18.1667 3.1498 14.8583L2.08313 11.5667C1.01646 8.25833 1.8998 6.50833 5.20813 5.44167L6.5248 5.00833C6.86646 4.9 7.19146 4.80833 7.4998 4.75C7.2498 5.25833 7.0498 5.875 6.88313 6.58333L6.06646 10.075C5.2498 13.5583 6.3248 15.275 9.7998 16.1L11.1998 16.4333C11.6831 16.55 12.1331 16.625 12.5498 16.6583Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg> */}
                </div>

                <a className="block mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                
                {/* Resume: {profileData && profileData?.linkToResume} */}
                  {/* Punk #4786 / An OG Cryptopunk Collector, hoarder of NFTs.
                  Contributing to @ether_cards, an NFT Monetization Platform. */}
                </a>

               { avatarString && reservedDomains.indexOf(avatarString) > -1 && <a className="mt-10" style={{ padding: '10px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#19FDA6'}} href="/" 
                
                  
              
                >domain name reserved </a> }


{ avatarString && reservedDomains.indexOf(avatarString) === -1 && <a className="mt-10" style={{background: '#19FDA6', padding: '10px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href="https://buy.stripe.com/9AQaIwaTneCe9Z68wA" 
                
                  
                onClick={() => {
                  trackEvent('ReseveDomain_Clicked', {
                    url: window.location.href,
                    library,
                    chainId,
                    account,
                    activate,
                    deactivate,
                    active
                  })
                }}
                >reserve domain name</a> }
              </div>
              <div className="mt-4 ">
                {/* <SocialsList itemClass="block w-7 h-7" /> */}
              </div>
            </div>

          
          
            <div className="absolute md:static left-5 top-4 sm:left-auto sm:top-5 sm:right-5 flex flex-row-reverse justify-end">
              {/* <NftMoreDropdown
                actions={[
                  {
                    id: "report",
                    name: "Report abuse",
                    icon: "las la-flag",
                  },
                ]}
                containerClassName="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:bg-neutral-800 cursor-pointer"
              /> */}
              {/* <ButtonDropDownShare
                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:bg-neutral-800 cursor-pointer mx-2"
                panelMenusClass="origin-top-right !-right-5 !w-40 sm:!w-52"
              /> */}
        


                <span style={{paddingTop: '10px'}}>
               
                    <div style={{
                      marginTop: '0px'
                    }}> ✨ Share</div>
                    <TwitterShareButton
                    onClick={() => {
               

                      trackEvent('SharePageTwitter_Clicked', {
                        library,
                        chainId,
                        account,
                        activate,
                        deactivate,
                        active
                      })


                    }}
                    style={{background: 'none', margin: '1rem', marginTop: '10px'}}
                      title={`${avatarString}'s Signature Lewk NFTs collections here`}
                      url={`https://www.lewk.app/${avatarString}`}
                      hashtags={["lewk", "nfts", "airdrops", "web3", "web3community", "blockchain"]}
                    >
                      <TwitterIcon size={32} round />
                
                    </TwitterShareButton>
                </span>

              {/* <FollowButton
                isFollowing={false}
                fontSize="text-sm md:text-base font-medium"
                sizeClass="px-4 py-1 md:py-2.5 h-8 md:!h-10 sm:px-6 lg:px-8"
              /> */}
            </div>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">

      {!hasAccess && <h2 className="text-3xl sm:text-4xl font-semibold">
                You don't have acccess, please to go our<a href='/marketplace'
               style={{background: '#19FDA6', padding: '20px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '40px', fontSize: '2rem', color: '#111'}} 
                > marketplace </a>  to buy an access token
                  {/* ({nftDataETH.length}) */}
                </h2>}

      {hasAccess && <h2 className="text-3xl sm:text-4xl font-semibold">
                 {/* Congrats Lewk Founder Pass Holder, we have a gift for you!! */}
                  {/* ({nftDataETH.length}) */}
                </h2>}
        {hasAccess && <div className="flex items-center py-3 justify-between px-5">
       
        <a style={{background: '#19FDA6', padding: '20px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '40px', fontSize: '2rem', color: '#111'}} onClick={() => {
          setMintSuccess(true)
        }} >
        Connect wallet to unlock exclusive content

        </a>

      </div>}

      {gatedContent && JSON.stringify(gatedContent)}
      {mintSuccess && <>
        <h2 className="text-5xl sm:text-4xl font-semibold text-center">Secret List</h2>
            <CommunitiesPage />
        <h2 className="text-5xl sm:text-4xl font-semibold text-center">Our secret ID</h2>
            <HiringManagersPage />
        <h2 className="text-5xl sm:text-4xl font-semibold text-center">Our secret content</h2>
            <Why />

      </>}
      {loading &&<>
           
           
           <div className="sm:text-lg mb-10 md:text-xl font-semibold text-neutral-300 text-center">
                {/* Create, Explore, & Collect Digital Art NFTs. */}
                Reading from the block <BeatLoader
              cssOverride={{
                display: "block",
                margin: "0 auto",
                borderColor: "#19FDA6",
              }}
              size={50}
              color={"#19FDA6"}
              loading={loading}
              speedMultiplier={1.5}
            />
              </div>
           </>}
       


      {!mintSuccess &&  <main>
          <Tab.Group>
            <div className="flex flex-col lg:flex-row justify-between ">
              <Tab.List className="flex space-x-0 sm:space-x-2 overflow-x-auto ">
                
{/* 
                {categories.map((item) => (
                  <Tab key={item} as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={`flex-shrink-0 block font-medium px-4 py-2 text-sm sm:px-6 sm:py-2.5 capitalize rounded-full focus:outline-none ${
                          selected
                            ? "bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900"
                            : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100/70 dark:hover:bg-neutral-800"
                        } `}
                      >
                        {item}
                      </button>
                    )}
                  </Tab>
                ))} */}
              </Tab.List>
              {/* <div className="mt-5 lg:mt-0 flex items-end justify-end">
                <ArchiveFilterListBox />
              </div> */}
            </div>
            <Tab.Panels>
             
              <Tab.Panel className="">
                {/* LOOP ITEMS */}
                {nftDataETH && nftDataETH.length  > 0&& <h2 className="text-3xl sm:text-4xl font-semibold">
                  {/* Ethereum  */}
                  {/* ({nftDataETH.length}) */}
                </h2>}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
              
{/* 
                     {nftDataETH && nftDataETH.map((nft: any, index: string) => {
                     
                      return (<CardNFTDisplay key={index} nft={nft} unit='ETH'
                      chain={'ethereum'}
                      contractAddress={nft?.contract?.address}
                      tokenId={nft?.tokenId}
                      
                      />)
                     
                  
                    })} */}


                </div>
                <h2 className="text-3xl mt-10 sm:text-4xl font-semibold">
                  
                </h2>
                <h2 className="text-3xl sm:text-4xl font-semibold">
                  
                </h2>

                {nftDataPOLYGON && nftDataPOLYGON.length > 0 && <h2 className="text-3xl sm:text-4xl font-semibold">
                  {/* Polygon  */}
                  {/* ({nftDataPOLYGON.length}) */}
                </h2>}

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
              
                    {/* {nftDataPOLYGON && nftDataPOLYGON.map((nft: any, index: string) => {

                    return (<CardNFTDisplay key={index} nft={nft} unit='MATIC' 
                    chain={'ploygon'}
                    contractAddress={nft?.contract?.address}
                    tokenId={nft?.tokenId}
                    />)
                    
                
                  })} */}


              </div>



                <div className="mt-10 md:mt-10 space-y-5 sm:space-y-6 md:sm:space-y-8">
              
            

         </div>



            {/* <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div> */}
            <div className="mt-10 md:mt-10 space-y-5 sm:space-y-6 md:sm:space-y-8">

            <h2 className="text-3xl sm:text-4xl font-semibold">
              {/* Turn your Salary info NFT, and earn passive income selling it */}
              {/* Do you have what it takes to join Talent Nation? */}
              {/* primarySkill  ${profileData?.primarySkill}

              skillsets
              industryInterest

              primarySkill: "datas science "
skillsets: "career coaching, resume review, interview prep, storytelling"
superpower: "Experimentation with a Systems Thinking"
twoTruthOnelie: "1. */}


              {/* Build your first skill NFT */}
            </h2>
            <h2 className="text-3xl sm:text-4xl font-semibold">
              {/* Turn your Salary info NFT, and earn passive income selling it */}
              {/* Do you have what it takes to join Talent Nation? */}
                {/* Primary Skill */}

                {/* I will help you  */}
              
              {/* Build your first skill NFT */}
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
                {/* * are required */}
                {/* {profileData?.skillsets} */}
                {/* Land your dream job in datascience */}
                {/* {} */}
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold">
              {/* Turn your Salary info NFT, and earn passive income selling it */}
              {/* Do you have what it takes to join Talent Nation? */}
          {/* Skillsets */}
         {/* Super Powers */}
              {/* Build your first skill NFT */}
            </h2>
            <div className="text-3xl sm:text-4xl font-semibold mt-10 mb-10" style={{margin: '20px'}}>
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
                {/* * are required */}
             
            </div>

            <h2 className="text-3xl sm:text-4xl font-semibold">
              {/* Turn your Salary info NFT, and earn passive income selling it */}
              {/* Do you have what it takes to join Talent Nation? */}
            {/* Super Power */}
              
              {/* Build your first skill NFT */}
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
                {/* * are required */}
                {/* {profileData?.superpower} */}
            </span>

            <h2 className="text-3xl sm:text-4xl font-semibold">
              {/* Turn your Salary info NFT, and earn passive income selling it */}
              {/* Do you have what it takes to join Talent Nation? */}
             {/* Two Truths and One Lie */}
              
              {/* Build your first skill NFT */}
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
                {/* * are required */}
                {/* {profileData?.twoTruthOnelie} */}
            </span>

            <h2 className="text-3xl sm:text-4xl font-semibold">
              {/* Turn your Salary info NFT, and earn passive income selling it */}
              {/* Do you have what it takes to join Talent Nation? */}

              {/* skillsets */}
             
              
              {/* Build your first skill NFT */}
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
                {/* * are required */}
                {/* {profileData?.skillsets} */}
            </span>


            <div className="card">
              {/* <img src="https://i.postimg.cc/VN195gMn/Screen-Shot-2022-08-28-at-7-37-12-PM.png" className="avatar" /> */}
              
          
            </div>
      
                {/* <FormItem label="Describe what value you offer, what you can consult on  *">
                    <Input 
                        className={errorInput.consultOn ? 'error' : ''}
                        type='text'
                            defaultValue="" 
                            onChange={
                            (e) => {
                            //     checkIsAvarAvail(e.target.value)

                                updateFormInput({
                                ...formInput,
                                consultOn: e.target.value,
                            })
                            }
                        }
                    />
                    <span style={{color: 'red'}}>
                        {errorInput.consultOn}
                    </span>
                    </FormItem>
                <FormItem label="Hour Rate(USD) *">
                    <Input 
                        className={errorInput.hourRate ? 'error' : ''}
                        type='number'
                            defaultValue="" 
                            onChange={
                            (e) => {
                            //     checkIsAvarAvail(e.target.value)  

                                updateFormInput({
                                ...formInput,
                                hourRate: e.target.value,
                            })
                            }
                        }
                    />
                    <span style={{color: 'red'}}>
                        {errorInput.hourRate}
                    </span>
                </FormItem>

                <FormItem label="Zoom Link *">
                    <Input 
                        className={errorInput.zoomLink ? 'error' : ''}
                        type='text'
                            defaultValue="" 
                            onChange={
                            (e) => {
                            //     checkIsAvarAvail(e.target.value)

                                updateFormInput({
                                ...formInput,
                                zoomLink: e.target.value,
                            })
                            }
                        }
                    />
                    <span style={{color: 'red'}}>
                        {errorInput.zoomLink}
                    </span>
                </FormItem> */}

                <div className="pt-2 flex flex-col sm:flex-row space-y-3 sm:space-y-0 space-x-0 sm:space-x-3 ">

                {/* <a style={{background: '#19FDA6', padding: '10px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href="https://book.stripe.com/28obMA7Hbbq22wEeUU" >Request to talk to me</a> */}
                {/* <a style={{background: '#19FDA6', padding: '10px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href="https://buy.stripe.com/eVa4k80eJeCe0ow5kl" >Book Now</a> */}

               
                </div>

                  {/* <div className="pt-2 flex flex-col sm:flex-row space-y-3 sm:space-y-0 space-x-0 sm:space-x-3 ">

                  <a style={{background: '#19FDA6', padding: '10px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} onClick={() => {
                    avatarString && gatedSpaceSumbit(avatarString)
                    }} >Submit</a>

                  </div> */}

             
                {/* gatedSpaceSumbit */}
                    </div>

                {/* PAGINATION */}
                <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">

                {/* {nftDataPOLYGON && nftDataPOLYGON.map((nft: { description: any; title: any; media: any; rawMetadata: any; }, index: string) => {

                    return (<CardNFTDisplay key={index} nft={nft}/>)


                    })} */}
                  {/* <Pagination /> */}
                  {/* <ButtonPrimary loading>Show me more</ButtonPrimary> */}
                </div>
              </Tab.Panel>

              <Tab.Panel className="">
                {/* LOOP ITEMS */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                  {/* {nftsCollected.map((nft, index) => (
                    <CardNFT key={index} nft={nft} owner />
                  ))} */}
                    {/* <CardSkillBadge type='Linkedin' />
                    <CardSkillBadge  />
                    <CardSkillBadge  />
                    <CardSkillBadge  /> */}


                </div>

                {/* PAGINATION */}
                <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                  {/* <Pagination /> */}
                  {/* <ButtonPrimary loading>Show me more</ButtonPrimary> */}
                </div>
                
              </Tab.Panel>

              <Tab.Panel className="">
                {/* LOOP ITEMS */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                  {Array.from("11111111").map((_, index) => (
                    <CardNFT isLiked key={index} />
                  ))}
                </div>

                {/* PAGINATION */}
                <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                  <Pagination />
                  <ButtonPrimary loading>Show me more</ButtonPrimary>
                </div>
              </Tab.Panel>

              
              <Tab.Panel className="">
                {/* LOOP ITEMS */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8 lg:mt-10">
                  {Array.from("11111111").map((_, index) => (
                    <CardAuthorBox3 following key={index} />
                  ))}
                </div>

                {/* PAGINATION */}
                <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                  <Pagination />
                  <ButtonPrimary loading>Show me more</ButtonPrimary>
                </div>
              </Tab.Panel>
              <Tab.Panel className="">
                {/* LOOP ITEMS */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
                  {Array.from("11111111").map((_, index) => (
                    <CardAuthorBox3 following={false} key={index} />
                  ))}
                </div>

                {/* PAGINATION */}
                <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                  {/* <Pagination /> */}
                  {/* <ButtonPrimary loading>Show me more</ButtonPrimary> */}
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </main>}

        {/* === SECTION 5 === */}
        {/* <div className="relative py-16 lg:py-28">
          <BackgroundSection />
          <SectionGridAuthorBox data={Array.from("11111111")} boxCard="box4" />
        </div> */}

        {/* SUBCRIBES */}
       {/* {!mintSuccess && <SectionBecomeAnAuthor />   } */}
      </div>

   

      {
        mintSuccess && <>

<div className="container">
        <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl" style={{height: '1500px'}}>
            <h2 className="text-3xl sm:text-4xl font-semibold">
              {/* Turn your Salary info NFT, and earn passive income selling it */}
              {/* Do you have what it takes to join Talent Nation? */}

             Congrats 🚀

              {/* Build your first skill NFT */}
            </h2>

          
    

<div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8">
  

<h3 className="text-lg sm:text-2xl font-semibold">
                {/* Company & Title Information */}
              </h3>

              <h3 className="text-lg sm:text-2xl font-semibold">
                {/* Thanks for contacting us! YOU DID(decentralized idenity) IT! We will get in touch with you shortly. */}
                {/* Scroll Down we have curated Web3 Learning Communities just for you! */}
              </h3>

              <h3 className="text-lg sm:text-2xl font-semibold">

              </h3>

              <h3 className="text-lg sm:text-2xl font-semibold">
              <a style={{background: '#19FDA6', padding: '12px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'https://discord.gg/bGq3zG7t77'} >Join our Discord Community</a>
              </h3>



              ✨ Share on twitter  here
                <span style={{paddingTop: '10px'}}>

                    <TwitterShareButton
                    style={{background: 'none', margin: '1rem', marginTop: '10px'}}
                      title={"I created a gated space for web3 learning community here https://lewk.app"}
                      url={`https://www.lewk.app/${avatarString}`}
                      hashtags={["lewk.app", "futureprotocol", "talentnation", "buildereconomy", "buildereconomy", "creatoreconomy", "individualsovereignty", "talenteconomy", "passioneconomy", "ownershipeconomy", "futureofwork",  "DAO", "DID"]}
                    >
                      <TwitterIcon size={32} round />
                
                    </TwitterShareButton>
                </span>


             
          </div>

          {/* <div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8" style={{marginTop: '200px'}}> */}
         
{/* 
         <h3 className="text-lg sm:text-2xl font-semibold">
           ✨ Proof-of-Human by adding a video intro
         </h3> */}

       {/* <h3 className="text-lg sm:text-2xl font-semibold">
           <a style={{background: '#19FDA6', padding: '12px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'/quick-apply'}> Start Here</a>
           </h3> */}
       {/* </div> */}

          
          {/* <div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8" style={{marginTop: '200px'}}> */}
         

            {/* <h3 className="text-lg sm:text-2xl font-semibold">
              ✨ Looking for engineering job?
            </h3> */}

          {/* <h3 className="text-lg sm:text-2xl font-semibold">
              <a style={{background: '#19FDA6', padding: '12px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'/talent-pitch'}> Complete your Proof-of-capability profile</a>
              </h3>
          </div> */}

       
            </div>
       

          
            </div>
            </div>
        {/* <JobsSearch /> */}


<Why />

<h2 className="text-5xl sm:text-4xl font-semibold text-center">Gated People</h2>

        </>
      }



      { mintSuccess && <Confetti
        width={width}
        height={height}
      >


      </Confetti> }

  
    </div>
  );
};

export default GatedTestPage;
