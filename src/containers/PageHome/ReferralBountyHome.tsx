
// import SectionSliderCategories from "components/SectionSliderCategories/SectionSliderCategories";
// import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
// import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
// import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
// import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
// import SectionVideos from "./SectionVideos";
import { Helmet } from "react-helmet";
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
// import SectionLargeSlider from "./SectionLargeSlider";
// import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
// import SectionHero2 from "components/SectionHero/SectionHero2";
// import dedicated from 'images/dedicated.gif'
// import building_future from 'images/building_future.gif'
// import SectionLargeSlider from "./SectionLargeSlider";
// import SectionSliderCardNftVideo from "components/SectionSliderCardNftVideo";
// import SectionSliderCollections2 from "components/SectionSliderCollections2";
import SectionHero2 from "components/SectionHero/SectionHero2";
// import SectionGridFeatureNFT2 from "./SectionGridFeatureNFT2";
// import SectionMagazine8 from "components/SectionMagazine8";
// import SectionSliderCardNftVideo from "components/SectionSliderCardNftVideo";
// import SectionSliderCollections2 from "components/SectionSliderCollections2";
// import loading from 'images/loading.gif'
import React, { FC, useState, useEffect } from "react";
// import ButtonPrimary from "shared/Button/ButtonPrimary";
// import imagePng from "images/hero3.png";
// import HeroSearchForm from "components/HeroSearchForm/HeroSearchForm";
import Input from "shared/Input/Input";
import { getNFTs } from "utils/alchemy";
import { Network } from "alchemy-sdk";
import { useWeb3React } from "@web3-react/core";
import { Tab } from "@headlessui/react";
import CardNFTDisplay from "components/CardNFTDisplay";
// import ButtonDropDownShare from "components/ButtonDropDownShare";
import NcModal from "shared/NcModal/NcModal";
import { useNavigate } from "react-router-dom";
import { BeatLoader, DotLoader } from "react-spinners"

import { trackEvent } from "utils/tracking";
// import SectionSliderCardNftVideo from "components/SectionSliderCardNftVideo";
import SectionVideos from "./SectionVideos";
import { saveCustomerUrltoFirebase, saveNFTDataFirebase, saveWalletToAirtable } from "./helpers";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
// import BackgroundSection from "components/BackgroundSection/BackgroundSection";
// import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
// import SectionSliderCardNftVideo from "components/SectionSliderCardNftVideo";
// import SectionSliderCollections2 from "components/SectionSliderCollections2";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import TopWallets from "components/SectionGridAuthorBox/TopWallets";
import DiscoverWallets from "components/SectionGridAuthorBox/DiscoverWallets";
import DiscoverDao from "components/SectionGridAuthorBox/DiscoverDao";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import Heading from "components/Heading/Heading";
import CurateVideo from "./CurateVideo";
import ExploreCommunities from "components/SectionGridAuthorBox/ExploreCommunities";
import CommunityOverNFTHero from "components/SectionSubscribe2/CommunityOverNFTHero";
import SubscribeForm from "components/SectionSubscribe2/SubscribeForm";
import HeroHeader from "components/SectionSubscribe2/Header";
import SectionVideosDemo from "./SectionVideoDemo";
// import DiscoverCommunities from "components/SectionGridAuthorBox/DiscoverCommunities";
// import Heading from "components/Heading/Heading";



export interface SectionHero3Props {
  className?: string;
}

function ReferralBountyHome() {
  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active
  } = useWeb3React();

    trackEvent('Lewkhome_Visited', {
      library,
      chainId,
      account,
      activate,
      deactivate,
      active
    })


    const [saveUserName, setSaveUserName] = useState(false)
    const { width: _width, height } = useWindowSize()

    const SectionHero3: FC<SectionHero3Props> = ({ className = "" }) => {

    const [loading, setLoading] = useState(false)
    // const [color, setColor] = useState("#ffffff");
    const [errorInput, updateErrorInput] = useState({ 
        useName: ''
      })
      const [userName, setUserName] = useState('')
      const [existed, setExisted] = useState(false)
      const [showUserNameModal, setShowUserNameModal] = useState(false)
      const [nftDataETH, setNFTDataETH] = useState<any>()
      const [nftDataPOLYGON, setNFTDataPOLYGON] = useState<any>()
      const [walletAddress, setWalletAddress] = useState('')
      const [existedWallets, setExistedWallets] = useState()
      const navigate = useNavigate()
      
      const {
        library,
        chainId,
        account,
        activate,
        deactivate,
        active
      } = useWeb3React();
      
      const [width, setWidth] = useState<number>(window.innerWidth);
    
    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
    
    const isMobile = width <= 768;
    
    
    
    const _getNFTs = async (wallet: string) => {
        setLoading(true)
        const _nftData = await getNFTs(wallet, Network.ETH_MAINNET)
      
        const _nftDataPolygon = await getNFTs(wallet, Network.MATIC_MAINNET)
        console.log('nftData', _nftData)
        console.log('_nftDataPolygon', _nftDataPolygon)
        // @ts-ignore
    
        setNFTDataPOLYGON(_nftDataPolygon)
        setNFTDataETH(_nftData)
        saveNFTDataFirebase(wallet, _nftData, _nftDataPolygon)
        localStorage.setItem(wallet, JSON.stringify(
          {
            nftDataETH: _nftData,
            nftDataPOLYGON: _nftDataPolygon,
            updatedAt: Date.now()
          }
        ))
        setLoading(false)

      
      }
    
      
      useEffect(() => {  
        walletAddress && _getNFTs(walletAddress)
        // if (!walletAddress) {
        //   account && _getNFTs(account)
        // }
      }, [])
    
    const savePage = async (_userName: string, wallet: string) => {
        const userName = _userName.trim().toLowerCase()
        const res = await saveWalletToAirtable(userName, wallet)
        // if (res == 'success') {
          // setSaveUserName(true)
          // records.forEach(function(record) {
          // console.log(record.get('Name'));
        // });
          
        await saveCustomerUrltoFirebase(wallet, userName)
        // setSaveUserName(true)
        setTimeout(() => {
          navigate(`/${userName}`, {
            state: {
                from: 'find_nfts',
                nftDataPOLYGON,
                nftDataETH
            }
          })
        }, 100)
    }

    const saveWallet = async (_userName: string, wallet: string) => {
      const res = await saveWalletToAirtable(_userName, wallet)
        // if (res == 'success') {
          // setSaveUserName(true)
          // records.forEach(function(record) {
          // console.log(record.get('Name'));
          // });
          
          await saveCustomerUrltoFirebase(wallet, _userName)
          setSaveUserName(true)
          navigate(`/${_userName}`, {
              state: {
                  from: 'find_nfts',
                  nftDataPOLYGON,
                  nftDataETH
              }
             
          })
        // }
    }




      const associateWallet = async (_userName: string, wallet: string) => {
        var Airtable = require('airtable');
        var base = new Airtable({apiKey: 'keyDr90Ny9XSuy819'}).base('appfZedSta1s4n06f');
    
        console.log('--usename', _userName)
    
        const userName = _userName.trim().toLowerCase()

        base('NametoWallets').create([
            {
            "fields": {
                "Name": userName.trim().toLocaleLowerCase(),
                "Wallets": wallet
            }
            }
        ], function(err: any, records: any[]) {
            if (err) {
            console.error(err);
            return;
            }
            setSaveUserName(true)
            // records.forEach(function(record) {
            // console.log(record.get('Name'));
            // });
    
            // navigate(`/${userName}`)
        });
    
    
    
        return;
    
        base('NametoWallets').select({
            // Selecting the first 3 records in Grid view:
            // maxRecords: 3,
            view: "Grid view",
            // filterByFormula: `Name%3Dalysia`
        }).eachPage(function page(records: any[], fetchNextPage: () => void) {
            // This function (`page`) will get called for each page of records.
        
            records.forEach(function(record) {
                // console.log('Retrieved', record.get('Name'), '--', record.get('Wallets'));
                if (record.get('Name') === userName) {
                    setExisted(true)
                    setExistedWallets(record.get('Wallets'))
                    console.log('lllll', existed, existedWallets)
    
                }
            });
        
            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            // fetchNextPage();
    
            // console.log('existedWallets', existedWallets, existed)
            if (existed) {
                navigate(`/${userName}`, {
                    state: existed
                })
    
            } else {
                console.log('-oooo-currentAccount', wallet)
                 base('NametoWallets').create([
                    {
                    "fields": {
                        "Name": userName.trim().toLocaleLowerCase(),
                        "Wallets": wallet
                    }
                    }
                ], function(err: any, records: any[]) {
                    if (err) {
                    console.error(err);
                    return;
                    }
                    records.forEach(function(record) {
                    console.log(record.get('Name'));
                    });
    
                    navigate(`/${userName}`)
                });
            }
    
    
        // @ts-ignore
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    }
    
      const  renderContent = () => {
          
        return (
    
            <form action="#">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
            {/* ✨🔮 Magic in the works... 🔮✨  */}
            ✨🔮 Save as a custom url lewk/name before it's taken! 🔮✨
            </h3>
            <span className="text-l flex mt-10">
                <Input  
                className={errorInput.useName ? 'error' : ''}
                placeholder='chosoe a user name'
                onChange={
                    (e) => {
    
                        setUserName(e.target.value)
                        trackEvent('SaveUserName_Clicked', {
                          library,
                          chainId,
                          account,
                          activate,
                          deactivate,
                          active
                        })
                    }
    
                }/>
              {/* <img src={loading} width='50' className='mr-5'/> Save your personal NFT display page */}
            </span>
            <div className="mt-4 space-x-3">
            <button style={{ padding: '10px 15px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#19FDA6'}} onClick={() => {
                // associateWallet(userName, walletAddress)
                savePage(userName, walletAddress)
            }} > Save</button>
    
              {/* <ButtonPrimary onClick={handleClickSubmitForm} type="submit">
                Delete
              </ButtonPrimary> */}
              
            </div>
          </form>
        )
      }
    
    
      return (
        <>
        <div
          className={`nc-SectionHero3 relative ${className}`}
          data-nc-id="SectionHero3"
        >
          <div className="mt-10 lg:mt-0 lg:absolute lg:container z-10 inset-x-0 top-[10%] sm:top-[20%]">
            <div className="flex flex-col space-y-5 xl:space-y-8 text-center">
              
              <span className="sm:text-lg md:text-xl font-semibold text-neutral-300">
                {/* Create, Explore, & Collect Digital Art NFTs. */}
                {/* Own your identity as reputation tokens */}
              
                
                {/* Capture your achievements better than LinkedIn! */}
                {/* professional  */}
                {/* Mint your Web3 Lewk ID */}
                {/* View & share multi-chain NFTs with a custom domain */}
                {/* Web3 Social Lewk Ranking&#8482; */}
                {/* Capture community contributions as peer-verified non-transferable tokens. */}
                {/* Start your rabithole here */}
                {/* Down the Rabbit Hole */}
             
                {/* Demystifying NFTs */}
                {/* A way to engage with your community  */}
                {/* Supercharge your NFTs */}

                {/* Through the Lewking Glass */}
                {/* learn to earn */}
                {/* Build on chain reputation */}
              </span>
            
              <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl !leading-[115%] text-neutral-300">
                {/* Community Over NFTs */}

                {/* Multi-chain  */}
                {/* New infrastructure platform for smart contracts that  */}
                {/* Bridge Incentive NFTs with  */}
                {/* Where you join your first NFT community */}
                {/* A new way to engage */}
                {/* COMING SOON */}
                {/* Privacy first  */}
                {/* Buy, sell, and showcase NFTs
                 */}
                {/* Mint your achievements */}
                {/* Manage all your NFTs all in one place */}
            {/* Find your roof NFTs */}
                {/* All your NFTs */}
                {/* Create meaningful interactions with NFT */}


                {/* The First NFT Social &nbsp; */}

                {/* We make NFTs simple */}

                {/* Demystify NFTs */}
  
                

        
                {/* Through the  
                     <i
                
                style={{color: '#19FDA6', 
                // 'boxShadow': '0 0 50px #19FDA6', 
                // background: '#2D3748', 
                // borderRadius: '20px',
                borderBottom: '1px solid #19FDA6'
                // padding: '10px'
              }}
                
                >    Lewking   </i>

          
                Glass */}
                 {/* Bookmark   */}
                 {/* &nbsp; 
                 Connect  */}
                  {/* &nbsp; Swap &nbsp;Share */}
                  {/* Knowledge, Expertise and  */}
                  {/* Social network and marketplace  */}
                  {/* Become a Knowledge Influencer */}
                  {/* Create.  Impact.  Get paid. */}

                  {/* Lewk is here to profoundly change  */}
                  {/* LEWK IS HERE TO PROFOUNDLY CHANGE */}
                  Introducing Digital 
                  </h2>
              <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl !leading-[115%] text-neutral-300">
                   {/* How you access the right information  */}
                   {/* HOW YOU ACCESS THE RIGHT INFORMATION */}
                   Property Ownership
              </h2>
              <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl !leading-[115%] text-neutral-300">
                 {/* from the right people */}
                 {/* FROM THE RIGHT PEOPLE */}
              {/* with your community */}
      
              {/* Infrastructure */}
              {/* Learning and Participation */}
              {/* <i
                
                style={{color: '#19FDA6', 
                // 'boxShadow': '0 0 50px #19FDA6', 
                // background: '#2D3748', 
                // borderRadius: '20px',
                borderBottom: '1px solid #19FDA6'
                // padding: '10px'
              }}
                
                >Discovery  </i>
            &
                */}
                 
                {/* <i
                
                style={{color: '#19FDA6', 
                // 'boxShadow': '0 0 50px #19FDA6', 
                // background: '#2D3748', 
                // borderRadius: '20px',
                borderBottom: '1px solid #19FDA6'
              }}>
              Curation </i> &nbsp; */}
              </h2>
              <span className="font-semibold text-neutral-300 mb-20" style={{color: '#19FDA6'}}>
                {/* Create, Explore, & Collect Digital Art NFTs. */}
                Mint, buy, and re-sell polygon NFT keys and augment the utility in-house by creating NFT-gated digital properties
              </span>
              <span className="font-semibold text-neutral-300 mb-20" style={{color: '#19FDA6'}}>
                {/* Create, Explore, & Collect Digital Art NFTs. */}
               
              </span>

      

              <h2 className="font-bold mt-10 text-xl sm:text-xl md:text-xl lg:text-xl xl:text-xl !leading-[115%] text-neutral-300">
 
{/*                        
                    <a style={{ padding: '10px 50px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '100px', color: '#19FDA6'}} href={'https://airtable.com/shr8LtmwYtzXAELuQ'} 


                    onClick={() => {
                    // console.log('ppp')
                    trackEvent('JoinBeta_Clicked', {
                      library,
                      chainId,
                      account,
                      activate,
                      deactivate,
                      active
                    })

                    }}
                    >Join Beta</a> */}

                    {/* Learning and Participation */}
                    {/* <i

                    style={{color: '#19FDA6', 
                    // 'boxShadow': '0 0 50px #19FDA6', 
                    // background: '#2D3748', 
                    // borderRadius: '20px',
                    borderBottom: '1px solid #19FDA6'
                    // padding: '10px'
                    }}

                    >Discovery  </i>
                    &
                    */}

                    {/* <i

                    style={{color: '#19FDA6', 
                    // 'boxShadow': '0 0 50px #19FDA6', 
                    // background: '#2D3748', 
                    // borderRadius: '20px',
                    borderBottom: '1px solid #19FDA6'
                    }}>
                    Curation </i> &nbsp; */}
                    </h2>

              <span className="sm:text-lg md:text-xl font-semibold text-neutral-300">
             {/* Lewk uses your on chain activities to show you curated nft communities.  */}
             {/* Plus, with Karma Confidence, you can see your Approval Odds before you apply, without impacting your scores. */}
                {/* We make NFTs simple by discovery, curation & participation */}
                {/* We help you learn about NFTs */}
              {/* View & share multi-chain NFTs with a custom domain */}
                {/* Create, Explore, & Collect Digital Art NFTs. */}
               
                 {/* with a custom domain name */}
               
                  {/* Privacy and safety focused */}
              </span>
              <span className="sm:text-lg md:text-xl font-semibold text-neutral-300">
                {/* Create, Explore, & Collect Digital Art NFTs. */}
                {/* Turn your 'resume' to achievement tokens */}
               
               
              </span>
              <span className="font-semibold text-neutral-300 mb-10" style={{color: '#19FDA6'}}>
                {/* Create, Explore, & Collect Digital Art NFTs. */}
               
              </span>
              <SubscribeForm></SubscribeForm>
              <div className="container relative sm:mb-24 lg:mt-20 lg:mb-32">
        {/* SECTION HERO */}


        {/* SECTION 2 */}
        {/* <SectionHowItWork className="mt-24 lg:mt-40 xl:mt-48" /> */}
      </div>


                {/* <Heading
          className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50"
          fontClass="text-xl md:text-xl 2xl:text-5xl font-semibold"
          isCenter
          desc=""
        > */}
            {/* Query the blockchain */}
        {/* </Heading> */}
                
                
             
              {/* <ButtonPrimary
                sizeClass="px-6 py-3 lg:px-8 lg:py-4"
                fontSize="text-sm sm:text-base lg:text-lg font-medium"
              >
                Start your search
              </ButtonPrimary> */}
                    {/* <a style={{background: '#19FDA6', padding: '12px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'https://discord.gg/bGq3zG7t77'} >Join our Community</a> */}
    
                
                  <div></div>
               
    
                  {/* <a style={{background: '#19FDA6', padding: '20px 40px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '35px', color: '#111'}} href={'/connect-wallet'} >Sign in with wallet</a> */}
          
                
    
             
             
                <span className="sm:text-lg md:text-xl font-semibold text-neutral-300">
                {/* Create, Explore, & Collect Digital Art NFTs. */}
    
              
              </span>
                {/* <a className="sm:text-lg md:text-xl font-semibold text-neutral-300" href='/our-why'> */}
                {/* Create, Explore, & Collect Digital Art NFTs. */}
    
                 {/* Check out our WHY
              </a> */}
                {/* <div>   <a style={{padding: '20px 40px', borderRadius: '35px', color: 'white'}} href={'https://testnet.futureprototocol.co'} >Try me on testnet</a></div> */}
    
            </div>
            {/* <HeroSearchForm className="mt-5 lg:mt-24 2xl:mt-40" /> */}
            
          </div>
          <div className="relative aspect-w-4 aspect-h-3 sm:aspect-w-16 sm:aspect-h-9" style={{display: `${isMobile? 'none': 'block'}`}}>
            
            {/* <img
              className="absolute inset-0 object-cover rounded-[32px]"
              src={imagePng}
              alt="hero"
            /> */}


   
          </div>
    
      
    
        </div>

    
        {(nftDataETH || nftDataPOLYGON) && <div className="mb-10 mt-20 text-right" style={{
          
        }}>
            
           
    
            {/* <button style={{ padding: '10px 15px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#19FDA6'}} onClick={(e) => {
                e.preventDefault();
                setShowUserNameModal(true)
                
                } }> Save page</button> */}

                <a style={{
                       
                       //  background: `${userName ? '#19FDA6' : ''}`,  
                        animation: 'glow 1s infinite',
                        transition:'0.5s',
                        color: '#19FDA6',
                        backgroundColor:'rgba(156, 161, 160,0.3)',
                       //  'boxShadow': '0 0 50px #19FDA6',
                         borderRadius: '35px', 
                         // color: '#111',
                          padding: '15px 25px',
                          cursor: 'pointer'
                         }} 
                      className="p-5 sm:space-y-10 "
                    
                   //    href={userName ?  `/register?username=${userName}`: 'javascript:void(0)'} 
                      onClick={() => {
                        trackEvent('SavePage_Clicked', {
                          library,
                          chainId,
                          account,
                          activate,
                          deactivate,
                          active
                        })
                      
                        setShowUserNameModal(true)
                        
                        
                      }}
       
       >Save page</a>

            
        </div> }
    
    
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
                    {nftDataETH && <h2 className="text-3xl sm:text-4xl font-semibold">
                      Ethereum 
                      {/* ({nftDataETH.length}) */}
                    </h2>}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                  
    
                         {nftDataETH && nftDataETH.map((nft: { description: any; title: any; media: any; rawMetadata: any; }, index: string) => {
    
                          return (<CardNFTDisplay key={index} nft={nft} unit='ETH'/>)
                         
                      
                        })}
    
    
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-semibold">
                      
                    </h2>
    
                    {nftDataPOLYGON && <h2 className="text-3xl sm:text-4xl font-semibold">
                      Polygon 
                      {/* ({nftDataPOLYGON.length}) */}
                    </h2>}
    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                  
                        {nftDataPOLYGON && nftDataPOLYGON.map((nft: { description: any; title: any; media: any; rawMetadata: any; }, index: string) => {
    
                        return (<CardNFTDisplay key={index} nft={nft} unit='MATIC' />)
                        
                    
                      })}
    
    
                  </div>
                  </Tab.Panel>
                  </Tab.Panels>
    
                  </Tab.Group>
    
                  {
           showUserNameModal && <NcModal
            isOpenProp={showUserNameModal}
            onCloseModal={() => {
              setShowUserNameModal(false)
            }}
            contentExtraClass="max-w-screen-sm"
            renderContent={renderContent}
            // renderTrigger={renderTrigger}
            modalTitle=""
          />
          }
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
         
    
    </>
      );
    };
    


  return (
    <div className="nc-PageHome relative overflow-hidden">
      <Helmet>
        <title>Lewk</title>
      </Helmet>
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      <div className="container relative mt-5 mb-5 sm:mb-5 lg:mt-20 lg:mb-32">
        {/* <HeroHeader /> */}
        {/* SECTION HERO */}
        {/* <CommunityOverNFTHero className="py-24 lg:py-32" /> */}
        <SectionHero3 
      // setNFTDataETH={setNFTDataETH}
      // setLoading={setLoading}
      // setNFTDataPOLYGON={setNFTDataPOLYGON}
        // getNFTs = {getNFTs}
      
      />


   
        {/* SECTION 3 */}
        {/* <SectionMagazine8 /> */}

        {/* SECTION */}
        <div className="relative py-20 lg:py-28">
          {/* <BackgroundSection /> */}
          {/* <SectionGridAuthorBox
            sectionStyle="style2"
            data={Array.from("11111111")}
            boxCard="box4"
          /> */}

          

    {/* <SectionHero2 
      // setNFTDataETH={setNFTDataETH}
      // setLoading={setLoading}
      // setNFTDataPOLYGON={setNFTDataPOLYGON}
        getNFTs = {getNFTs}
      
      /> */}
        </div>




        <h2 className="font-semibold text-3xl md:text-4xl 2xl:text-5xl font-semibold xl:text-6xl  text-center !leading-[114%] mb-10" style={{
          fontSize: '2rem'
        }}>
          {/* Comment, React, and Curate NFTs */}
      </h2>

      <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 mb-10  text-center ">
            {/* Starting with compensation data */}
            {/* Upload your W2 and we will pay you $100 */}
            {/* Get by giving */}
            {/* a lewk is a personal style signature so individual it’s almost indivisible from you */}
            {/* A lewk refers to someone’s fashion or style, in particular how someone is different from the norm and other people */}

            {/* A lewk is how your are different from the norm and other people */}
            {/* Bring NFTs from blockchains to you! */}
            {/* ✨  You can ask any questions as well ✨ */}
            
            {/* , you and your communities. */}
      </span>

  

      <h2 className="font-semibold text-3xl md:text-4xl 2xl:text-5xl font-semibold xl:text-6xl  text-center !leading-[114%] mb-10" style={{
  fontSize: '2rem'
}}>
How it works
</h2>
      <div className="container relative mb-5 sm:mb-5 lg:mt-20 lg:mb-32">


        {/* SECTION HERO */}
        {/* <Heading
          className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50 "
          fontClass="text-xl md:text-xl 2xl:text-5xl font-semibold"
          isCenter
          desc=""

        > */}
        {/* Comment,  */}
        {/* Participate & Curate */}
        {/* </Heading> */}
        {/* <CurateVideo /> */}

        {/* SECTION 2 */}
        <SectionHowItWork className="mt-24 lg:mt-40 xl:mt-48" />
      </div>
     
      <div className="container relative mb-5 sm:mb-5 lg:mt-20 lg:mb-32">
      <SectionVideosDemo />
      </div>
      <div className="container relative sm:mb-24 lg:mt-20 lg:mb-32">
        </div>

        <SectionSubscribe2 className="py-24 lg:py-32" />
      <div className="relative py-20 lg:py-28">
          {/* <BackgroundSection /> */}
          {/* <SectionGridAuthorBox
            sectionStyle="style2"
            data={Array.from("11111111")}
            boxCard="box4"
          /> */}

          

      <SectionHero2 
      // setNFTDataETH={setNFTDataETH}
      // setLoading={setLoading}
      // setNFTDataPOLYGON={setNFTDataPOLYGON}
        getNFTs = {getNFTs}
      
      />

<div className="container relative sm:mb-24 lg:mt-20 lg:mb-32">

<h2 className="font-semibold text-3xl md:text-4xl 2xl:text-5xl font-semibold xl:text-6xl  text-center !leading-[114%] mb-10" style={{
  fontSize: '2rem'
}}>
  Discover Other Wallets
</h2>
</div>
  <DiscoverWallets
    sectionStyle="style2"
    data={Array.from("11111111")}
    boxCard="box4"
  />
<div className="container relative sm:mb-24 lg:mt-20 lg:mb-32">
</div>
        </div>
        

          {/* <TopWallets
            sectionStyle="style2"
            data={Array.from("11111111")}
            boxCard="box4"
          />
          */}

        {/* <ExploreCommunities
            sectionStyle="style2"
            data={Array.from("11111111")}
            boxCard="box4"
          /> */}
        {/* <Heading
          className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50"
          fontClass="text-3xl md:text-4xl 2xl:text-5xl font-semibold"
          isCenter
          desc=""
        > */}
         
    
      
            {/* How it works */}
        {/* </Heading> */}


         {/* <SectionHowItWork className="mt-24 lg:mt-40 xl:mt-48" /> */}


  
        {/* SECTION HERO */}

 

    
        {/* <div className="container relative sm:mb-24 lg:mt-20 lg:mb-32">
        </div>
          <DiscoverDao
            sectionStyle="style2"
            data={Array.from("11111111")}
            boxCard="box4"
          /> */}
         
         {/* <div className="container relative sm:mb-24 lg:mt-20 lg:mb-32">
        </div>
          <DiscoverCommunities
            sectionStyle="style2"
            data={Array.from("11111111")}
            boxCard="box4"
          /> */}
        {/* SECTION 2 */}

      
        {/* <SectionGridAuthorBox
            sectionStyle="style2"
            data={Array.from("11111111")}
            boxCard="box4"
          /> */}

      
        {/* SECTION 2 */}
        {/* <SectionHowItWork className="mt-24 lg:mt-40 xl:mt-48" /> */}
      </div>
   

  


      {/* <div className="relative py-20 lg:py-20"></div> */}
      <div className="container relative mt-5 mb-50 sm:mb-24 lg:mt-20 lg:mb-32">
      {/* <SectionHero2 
      // setNFTDataETH={setNFTDataETH}
      // setLoading={setLoading}
      // setNFTDataPOLYGON={setNFTDataPOLYGON}
        getNFTs = {getNFTs}
      
      /> */}
        {/* SECTION 3 */}
        {/* <SectionMagazine8 /> */}

        {/* SECTION */}
        {/* <div className="relative py-20 lg:py-28">
          <BackgroundSection />
          <SectionGridAuthorBox
            sectionStyle="style2"
            data={Array.from("11111111")}
            boxCard="box4"
          />
        </div> */}

          {/* <SectionGridAuthorBox
            sectionStyle="style2"
            data={Array.from("11111111")}
            boxCard="box4"
          /> */}
        {/* SECTION 4 */}
        {/* <SectionSliderCardNftVideo />
        <SectionSliderCollections2 cardStyle="style2" /> */}

        {/* SECTION */}
        {/* <div className="relative py-20 lg:py-28">
          <BackgroundSection />
          <SectionSliderCollections2 cardStyle="style2" />
        </div>  */}

        {/* SECTION */}
        {/* <SectionSubscribe2 /> */}

        {/* SECTION */}

        {/* <div className="relative py-20 lg:py-28">
          <BackgroundSection className="bg-neutral-100/70 dark:bg-black/20 " />
          <a style={{background: '#19FDA6', padding: '10px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'https://discord.gg/bGq3zG7t77'} >Join our Discord</a>
          <SectionGridFeatureNFT2 />
        </div> */}

        {/* SECTION 1 */}
        {/* <SectionSliderCategories /> */}

        {/* SECTION */}

        {/* <div className="flex-grow">
          <img className="w-full" src={building_future} alt="hero" />
     

        </div> */}


       
        {/* <div className="relative py-20 lg:py-28"> */}

    
          {/* <h2 className="font-semibold text-3xl sm:text-4xl xl:text-6xl mt-6 sm:mt-10 !leading-[1.112] tracking-tight"> */}
          {/* a protocol to help Talent building their first on chain professional identity with composable NFTs, or in a sense  */}
                  {/* WE’RE
          BUILDING
          THE
          FUTURE */}
      {/* Skip the interview by building your on-chain professional reputation? */}
          {/* Own your job search and your career */}

            {/* Talent Nation by Future Protocol */}
          {/* </h2> */}
          {/* <span className="block mt-6 text-neutral-800 dark:text-neutral-400 "> */}
            {/* Take control of your negotiation power */}
            {/* Interested in joining the team or want to reach out? */}
          {/* </span> */}
          {/* <h2 className="font-semibold text-3xl sm:text-4xl xl:text-6xl mt-6 sm:mt-10 !leading-[1.112] tracking-tight"> */}
          {/* a protocol to help Talent building their first on chain professional identity with composable NFTs, or in a sense  */}
          {/* </h2> */}
          {/* <a style={{background: '#19FDA6', padding: '12px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'https://discord.gg/bGq3zG7t77'}>Endorse Us</a> */}
        {/* </div> */}
     
      

    

        {/* SECTION */}
        {/* <SectionSubscribe2 className="py-24 lg:py-32" /> */}
      </div>
         

      {/* <div className="relative py-20 lg:py-20"></div> */}
      {/* <div className="container relative mt-5 mb- sm:mb-24 lg:mt-20 lg:mb-32"> */}
        {/* SECTION HERO */}

   

        {/* SECTION 2 */}
        {/* <SectionHowItWork className="mt-24 lg:mt-40 xl:mt-48" /> */}
      {/* </div> */}
          {/* <div className="relative py-20 lg:py-24">
          <BackgroundSection />
 
        </div> */}



      <div className="relative py-20 lg:py-28"></div>
      { saveUserName && <Confetti
        width={_width}
        height={height}
      >


      </Confetti> }
      
    </div>
  );
}

export default ReferralBountyHome;
