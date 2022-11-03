import React, { FC, Fragment, useState, useEffect } from "react";
import Confetti from 'react-confetti'
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useLocation, useParams } from 'react-router-dom'
// import axios from 'axios';
import { Helmet } from "react-helmet";
import useWindowSize from 'react-use/lib/useWindowSize'
import { TwitterIcon, TwitterShareButton } from "react-share";
import NcImage from "shared/NcImage/NcImage";
import CardNFT from "components/CardNFT";
import Pagination from "shared/Pagination/Pagination";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Tab } from "@headlessui/react";
import CardAuthorBox3 from "components/CardAuthorBox3/CardAuthorBox3";
import CardSkillBadge from "components/CardSkillBage";

import { useFirebaseContext } from "contexts/firebaseContext";
import { trackEvent } from "utils/tracking";
import { getNFTs } from 'utils/alchemy'

import { useWeb3React } from "@web3-react/core";
import { Network } from "alchemy-sdk";
import { BeatLoader } from "react-spinners";
import CardGatedLink from "components/CardGatedLink";
import { useAccountContext } from "contexts/accountContext";


export interface AuthorPageProps {
  className?: string;
}

// const placeholderAvatar = 'https://api.multiavatar.com/eeeeee.svg'

const GatedLinks: FC<AuthorPageProps> = ({ className = "" }) => {
    // console.log('ppppp')
    const { connectWallet } = useAccountContext()
    const [currentAccount, setCurrentAccount] = useState('')
  const { state } = useLocation()
 const _nftDataETH = (state as any)?.nftDataETH
 const _nftDataPOLYGON = (state as any)?.nftDataPOLYGON
 const [nftDataETH, setNFTDataETH] = useState<any>(_nftDataETH)
 const [nftDataPOLYGON, setNFTDataPOLYGON] = useState<any>(_nftDataPOLYGON)
   const [mintSuccess, setMintSuccess] = useState(false)
   const { width, height } = useWindowSize()
   const [walletAddress, setWalletAddress] = useState('')

   const { pageSlug } = useParams()
  //  console.log('---pageSlug', pageSlug)

 const [loading, setLoading] = useState(false)  

  // var Airtable = require('airtable');

  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active
  } = useWeb3React();

  trackEvent('Gated_Content_Accessed', {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active
  })
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
      const [gatedContent, setGatedContent] = useState<
      {
          content:string
      }>()
      const [tokenGatesData, setTokenGates] = useState<any>();
      // const [profileData, setProfileData] = useState<
      // {
      //     email: string;
      //     linkToResume: string;
      //     name: string;
      //     phone: string;
      //     hourlyRate: string;
      //     primarySkill: string;

      //     skillsets: string;
      //     industryInterest: string;
      //     superpower: string;
      //     twoTruthOnelie: string;
      //     zoomLink: string;
      // }>()


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


const hasToken = (requirementToken: any, tokensInWallet: any[]) => {
  const has = tokensInWallet.find(({

    contract: { address}
  }) => {
    console.log('--address,', address, requirementToken?.contractAddress)
    return  address.toLowerCase() == requirementToken?.contractAddress.toLowerCase()
  })

return !!has


} 



const _getNFTs = async (wallet: string, _tokenGates: any) => {
    console.log('===_tokenGates', _tokenGates)
  setLoading(true)
  setHasAssess(false)
  if (!_tokenGates) {
    setLoading(false)
    setHasAssess(true)
    pageSlug && getGatedContent(pageSlug)
    return
  }

  if (_tokenGates && _tokenGates.gatingWallets && _tokenGates.gatingWallets.indexOf(account) == -1) {
    setHasAssess(false)
    return
  }

  if (_tokenGates && _tokenGates.gatingWallets && _tokenGates.gatingWallets.indexOf(account) > -1) {
    setHasAssess(true)
    return
  }

  if (_tokenGates && _tokenGates.chain) {
    const _nftData = await getNFTs(wallet, Network.ETH_MAINNET)

    const _nftDataPolygon = await getNFTs(wallet, Network.MATIC_MAINNET)
  

    let hasAccess = false
    if (_tokenGates && _tokenGates.chain &&  _tokenGates.chain.toLowerCase() === 'polygon') {
      hasAccess = hasToken(_tokenGates,  _nftDataPolygon)
      
    } else if ( _tokenGates && _tokenGates.chain && _tokenGates.chain.toLowerCase() === 'eth') {
      hasAccess = hasToken(_tokenGates, _nftData)
    }

      setHasAssess(hasAccess)
      hasAccess && pageSlug && getGatedContent(pageSlug)


    // @ts-ignore
    // setNFTData(_nftData)
    setNFTDataPOLYGON(_nftDataPolygon)
    setNFTDataETH(_nftData)

  } else {

  }
  

  setLoading(false)

}

  const checkEligibility = async (wallet: string, _tokenGates: any) => {
    if (!_tokenGates) {
     
      setHasAssess(true)
      pageSlug && getGatedContent(pageSlug)
      return
    } else {
       // only wallet 
      if (!_tokenGates.chain) {
        console.log('ppppp', account)
        if (_tokenGates.gatingWallets.indexOf(account) > -1) {
          console.log('ppppp', account)
          setHasAssess(true)
           pageSlug && getGatedContent(pageSlug)

          return
        }
        setHasAssess(false)
        return
      } else {
        // chain gating 
        let hasAccess = false
        if (_tokenGates.chain.toLowerCase() === 'eth') {
          setLoading(true)
          const _nftData = await getNFTs(wallet, Network.ETH_MAINNET)

       
          hasAccess = hasToken(_tokenGates, _nftData)
          setLoading(false)
        } else if (_tokenGates.chain.toLowerCase() === 'polygon') {
          setLoading(true)
          const _nftDataPolygon = await getNFTs(wallet, Network.MATIC_MAINNET)
          setLoading(false)
          hasAccess = hasToken(_tokenGates,  _nftDataPolygon)
        }

          // only chain 
        if (!_tokenGates.gatingWallets) {
          setHasAssess(hasAccess)
          hasAccess && pageSlug && getGatedContent(pageSlug)
        } else {
          // chain and wallets 
          setHasAssess(hasAccess && _tokenGates.gatingWallets.indexOf(account) > -1)
          hasAccess && pageSlug && getGatedContent(pageSlug)

        }


      }

    
     


      // chain && wallet
    }
  }


const [hasAccess, setHasAssess] = useState(false)
const [gatedData, setGatedData] = useState<{
    description: string;
    imageUrl: string;
    title: string
}>()

const getPageInfo =  (slug: string) => {
  const db = getDatabase();
  console.log('===slug', slug)
  const path = 'customDomain/' + slug
  const curation = ref(db, path);

  onValue(curation, (snapshot) => {
      // console.log('--snapshot', snapshot, snapshot.exists())

      // if (snapshot.exists()) {
      var data = snapshot.val();
      console.log('===data', data)
      setTokenGates(data.tokenGates)

      account && checkEligibility(account, data.tokenGates)
      console.log('===pagegggggdata', data)
      setGatedData(data?.gatedData)
      console.log('===gatedData', data?.gatedData)

  })

}

// fist get the page info
useEffect(() => {
  console.log('--pageSlug', pageSlug, account)
  account && pageSlug && getPageInfo(pageSlug)
}, [pageSlug, account])

useEffect(() => {
  // if (!currentAccount) {
    // connectWallet && connectWallet() 
    // localStorage.getItem('currentWallet')
  // }
  if (!localStorage.getItem('currentWallet')) {
    // reconnect
    connectWallet && connectWallet() 
  } else {
    const w = localStorage.getItem('currentWallet') || ''
    // ts-ignore
    setCurrentAccount(w)
  }


  // if connected with wallet


}, [currentAccount])


// useEffect(() => {
//     _getNFTs()
// }, [])
  return (
    <div className={`nc-AuthorPage  ${className}`} data-nc-id="AuthorPage">
      <Helmet>
        <title>Lewk.app</title>
      </Helmet>


      {/* HEADER */}
      <div className="w-full">
        <div className="relative w-full h-40 md:h-60 2xl:h-72">
          {/* <NcImage
            containerClassName="absolute inset-0"
            src={authorBanner}
            className="object-cover w-full h-full"
          /> */}
        </div>
        
        <div className="container -mt-10 lg:-mt-16">
       
          <div className="relative bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-8 rounded-3xl md:rounded-[40px] shadow-xl flex flex-col md:flex-row">    
            <div className="absolute md:static left-5 top-4 sm:left-auto sm:top-5 sm:right-5 flex flex-row-reverse justify-end">
                {/* {gatedData.} */}
                {/* {JSON.stringify(gatedData)} */}
                <div className="sm:text-lg ml-10 md:text-xl font-semibold text-neutral-300 text-center">
                {tokenGatesData?.gatingWallets && `Wallet Required ${tokenGatesData?.gatingWallets}` }
                </div>
                <div className="sm:text-lg ml-10 md:text-xl font-semibold text-neutral-300 text-center">
                {tokenGatesData?.chain && `Chain ${tokenGatesData?.chain}` }
             
                </div>
                <div className="sm:text-lg ml-10 md:text-xl font-semibold text-neutral-300 text-center">
             
                {tokenGatesData?.contractAddress && `Contract Address ${tokenGatesData?.contractAddress}` }
                </div>
              

                {gatedData && <CardGatedLink data={gatedData} gatedContent= {gatedContent?.content}/>}
                {/* {gatedContent && gatedContent?.content} */}
          
              
                {/* {gatedData && <NcImage
                    containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0 rounded-3xl overflow-hidden z-0"
                    src={gatedData?.imageUrl}
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
                />} */}
          

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
        
{/* 

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
                      title={`Check out my gated page`}
                      url={`https://www.lewk.app/${pageSlug}`}
                      hashtags={["lewk", "owntheweb", "ownershipeconomy"]}
                    >
                      <TwitterIcon size={32} round />
                
                    </TwitterShareButton>
                </span> */}

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
        <div className="sm:text-lg mb-10 md:text-xl font-semibold text-neutral-300 text-center">
            {hasAccess && account && gatedContent?.content && <div className="gap-x-8 gap-y-10 mt-8 lg:mt-10">
                <a style={{ padding: '10px 50px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '100px', color: '#19FDA6', cursor: 'pointer'}} 
               
                        onClick={() => {
                        // console.log('ppp')
                        trackEvent('GatedLink_Clicked', {
                            gatedLink:  gatedContent?.content
                        // library,
                        // chainId,
                        // account,
                        // activate,
                        // deactivate,
                        // active
                        })
                        if (gatedContent?.content) {

                            // window.location.href = gatedContent?.content
                            window.open(gatedContent?.content)
                        }
                       
                        }}
                        >{gatedContent?.content}</a> 

                  {/* @ts-ignore */}
                {/* {gatedContent && gatedContent?.content} */}
              </div>}
              </div>
              <div className="sm:text-lg mb-10 md:text-xl font-semibold text-neutral-300 text-center">
              {hasAccess && !account && <div className="gap-x-8 gap-y-10 mt-8 lg:mt-10">
                <a style={{ padding: '10px 50px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '100px', color: '#19FDA6'}} href={gatedContent?.content} 


                        onClick={() => {
                        // console.log('ppp')
                        trackEvent('GatedLink_Clicked', {
                            gatedLink:  gatedContent?.content
                        // library,
                        // chainId,
                        // account,
                        // activate,
                        // deactivate,
                        // active
                        })

                        }}
                        >Connect to view</a> 

                  {/* @ts-ignore */}
                {/* {gatedContent && gatedContent?.content} */}
              </div>}

              </div>
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
                

              </Tab.List>
              {/* <div className="mt-5 lg:mt-0 flex items-end justify-end">
                <ArchiveFilterListBox />
              </div> */}
            </div>
            <Tab.Panels>
             
            {/* <h2 className="text-3xl sm:text-4xl font-semibold mt-10">
                Gating Tokens
                </h2> */}
           <div className="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
       
           {/* Gating NFT contract
    */}
                {/* {tokenGatesData && tokenGatesData.video && JSON.parse(tokenGatesData?.tokenGates).map((tg: { chain: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; contractAddress: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined )=> {
                  return <div key={index}>
      
    
                    <div>
                    Chain {
                    tg.chain}
                  
                    
                    </div>
                    <div>
               
                    Gating Contract {
                    tg.contractAddress}


                    
                    </div>
                    <div>
                 

                    
                    </div>
                    </div>

                })} */}
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold mt-10">
                
                </h2>

            {hasAccess && <h2 className="text-3xl sm:text-4xl font-semibold">
              {/* Gated content */}
           

    
                </h2>}

                {hasAccess && <div className="gap-x-8 gap-y-10 mt-8 lg:mt-10">
                  {/* @ts-ignore */}
                {/* {gatedContent && gatedContent?.content} */}
              </div>}

                <h2 className="text-3xl sm:text-4xl font-semibold mt-10">
                
                </h2>

              

              <Tab.Panel className="">
                {/* LOOP ITEMS */}
              
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
              

                 


                </div>
                <h2 className="text-3xl mt-10 sm:text-4xl font-semibold">
                  
                </h2>
                <h2 className="text-3xl sm:text-4xl font-semibold">
                  
                </h2>

             

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
              


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
                    <CardSkillBadge type='Linkedin' />
                    <CardSkillBadge  />
                    <CardSkillBadge  />
                    <CardSkillBadge  />


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
                  {/* <Pagination /> */}
                  {/* <ButtonPrimary loading>Show me more</ButtonPrimary> */}
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

          
            <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          

<div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8">


<h3 className="text-lg sm:text-2xl font-semibold">

              </h3>
</div>
<div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8">
      
</div>
<div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8">
  

<h3 className="text-lg sm:text-2xl font-semibold">
                {/* Company & Title Information */}
              </h3>

              <h3 className="text-lg sm:text-2xl font-semibold">
                Thanks for contacting us! YOU DID(decentralized idenity) IT! We will get in touch with you shortly.
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
                      title={"I creacted a gated space for consulting work at https://www.futureprotocol.co"}
                      url={`https://www.futureprotocol.co/${avatarString}`}
                      hashtags={["futureprotocol", "talentnation", "buildereconomy", "buildereconomy", "creatoreconomy", "individualsovereignty", "talenteconomy", "passioneconomy", "ownershipeconomy", "futureofwork", "decentralized-identity", "DAO", "DID"]}
                    >
                      <TwitterIcon size={32} round />
                
                    </TwitterShareButton>
                </span>


             
          </div>

 

       
            </div>
       

          
            </div>
            </div>
        

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

export default GatedLinks;
