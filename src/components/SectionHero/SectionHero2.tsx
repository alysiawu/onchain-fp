import React, { FC, useState, useEffect, useRef, RefObject } from "react";
import { trackEvent } from "utils/tracking";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";
import ReactTooltip from 'react-tooltip'
// import imagePng from "images/hero-right-4.png";
// import devprofile from "images/dev_profile.png";
// import ButtonPrimary from "shared/Button/ButtonPrimary";
// import HeroSearchForm from "components/HeroSearchForm/HeroSearchForm";
// import { useNavigate } from "react-router-dom";
import { Network } from "alchemy-sdk";
import './index.css'
import Input from "shared/Input/Input";
import BeatLoader from "react-spinners/BeatLoader";
import CardNFTDisplay from "components/CardNFTDisplay";
import NcModal from "shared/NcModal/NcModal";
import { saveCustomerUrltoFirebase, saveCustomerUrltoFirebase2, saveNFTDataFirebase, saveWalletToAirtable } from "containers/PageHome/helpers";

export interface SectionHero2Props {
  children?: React.ReactNode;
  className?: string;
  getNFTs? : any;
  setNFTDataETH?: any;
  setLoading?: any;
  setNFTDataPOLYGON? : any;
}

const SectionHero2: FC<SectionHero2Props> = ({ className = "", children, getNFTs }) => {
  const [loading, setLoading] = useState(false)
  const [nftDataETH, setNFTDataETH] = useState<any>()
  const [nftDataPOLYGON, setNFTDataPOLYGON] = useState<any>()
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

  
const _getNFTs = async (wallet: string) => {
  setLoading(true)
  const _nftData = await getNFTs(wallet, Network.ETH_MAINNET)

  const _nftDataPolygon = await getNFTs(wallet, Network.MATIC_MAINNET)
  // console.log('nftData', _nftData)
  // @ts-ignore

  setNFTDataPOLYGON(_nftDataPolygon)
  setNFTDataETH(_nftData)
  saveNFTDataFirebase(wallet, _nftData, _nftDataPolygon)
  // localStorage.setItem(wallet, JSON.stringify(
  //   {
  //     nftDataETH: _nftData,
  //     nftDataPOLYGON: _nftDataPolygon,
  //     updatedAt: Date.now()
  //   }
  // ))
  setLoading(false)

}
const [showUserNameModal, setShowUserNameModal] = useState(false)

const [userName, setUserName] = useState('')
const [saveUserName, setSaveUserName] = useState(false)
const isMobile = width <= 768;
const [walletAddress, setWalletAddress] = useState('')
const [errorInput, updateErrorInput] = useState({ 
  useName: ''
})


const savePage = async (_userName: string, wallet: string) => {
  const userName = _userName.trim().toLowerCase()
  console.log('===userName', userName)
  const res = await saveWalletToAirtable(userName, wallet)
  // if (res == 'success') {
    // setSaveUserName(true)
    // records.forEach(function(record) {
    // console.log(record.get('Name'));
    // });
    
  await saveCustomerUrltoFirebase2(wallet, userName)

  // saveCustomerUrltoFirebase2
  // setSaveUserName(true)

    navigate(`/${userName}`, {
      state: {
          from: 'find_nfts',
          nftDataPOLYGON,
          nftDataETH
      }
     
  })


  // setTimeout(() => {
      // navigate(`/${userName}`)
  // }, 100)
  // check in airtable

  // update in airtable 

  // reserved this for $1.99 

  // 


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



const  renderContent = () => {
          
  return (

      <form action="#">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
      {/* ✨🔮 Magic in the works... 🔮✨  */}
      ✨🔮 Save a sharable link! 🔮✨
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
          console.log('--userName, walletAddress', userName, walletAddress)
          savePage(userName, walletAddress)
      }} > Save</button>

        {/* <ButtonPrimary onClick={handleClickSubmitForm} type="submit">
          Delete
        </ButtonPrimary> */}
        
      </div>
    </form>
  )
}

const toopTipRef = useRef<HTMLHeadingElement>()

// const inputRef = useRef<HTMLInputElement>(null);

  // const navigate = useNavigate()
  return (
    <div
      className={`nc-SectionHero2 flex flex-col-reverse lg:flex-col relative ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 sm:space-y-10 pb-14 lg:pb-36 xl:pb-60 xl:pr-14 lg:mr-10 xl:mr-0">
          <h1 className="font-semibold text-6xl md:text-5xl xl:text-6xl !leading-[114%] ">
            {/* Turn your priced information on chain into capital 💰, pseudonymously ㊙️ */}

            {/* Future Protocol  */}
           
            
            {/* about to put your jobs, professional identity, and reputation on-chain */}
            {/* A wallet identity based pseudonymous compensation data marketplace to empower fair compensation and equity for decentralized future of work.  */}
            {/* Mint help */}
          </h1>
           <h2 className="font-semibold text-4xl md:text-5xl xl:text-6xl !leading-[114%] ">
            {/* Turn your priced information on chain into capital 💰, pseudonymously ㊙️ */}

            {/* Build your professional reputation economy */}
            {/* Build your professional identity & builder economy */}
            {/* The first P2P marketplace to combat information asymmetry  */}
            {/* Mint <span style={{color: '#19FDA6'}}>help</span> */}

            {/* Manage Every NFTs you own, all in one place */}
            {/* in people and jobs */}
            
            {/* about to put your jobs, professional identity, and reputation on-chain */}
            {/* A wallet identity based pseudonymous compensation data marketplace to empower fair compensation and equity for decentralized future of work.  */}

          </h2>
          <h2 className="font-semibold text-4xl md:text-5xl xl:text-6xl !leading-[114%] " style={{
            fontSize: '2rem'
          }
          
          }
           // @ts-ignore
          ref={toopTipRef} data-tip
          data-for='lewk-info'
          >
            {/* Turn your priced information on chain into capital 💰, pseudonymously ㊙️ */}

            {/* Build your professional reputation economy */}
            {/* Build your professional identity & builder economy */}
            {/* The first P2P marketplace to combat information asymmetry  */}
           {/* Win together */}
            {/* in people and jobs */}
            
            {/* about to put your jobs, professional identity, and reputation on-chain */}
            {/* A wallet identity based pseudonymous compensation data marketplace to empower fair compensation and equity for decentralized future of work.  */}
            Claim your  <span 
          // @ts-ignore
        
          >
            Lewk
          

          </span> ID
          </h2>
    
         
          {/* <button onClick={() => { 
            // @ts-ignore
            ReactTooltip.show(toopTipRef) 
            
            
            }}> </button> */}
          <ReactTooltip 
            id='lewk-info'
            effect="solid"
            type='light'
            place="top"

          >
              <p
                className="font-semibold"
              
              >
              {/* This word was added to Merriam Webster in September 2022.  */}
                    
              </p>
              <p
               className="font-semibold"
               >
              A lewk is how your are different from the norm and other people.
                    
              </p>
              <p
               className="font-semibold"
               >
              {/* A lewk is a personal style signature so individual it's almost indivisible from you */}
                    
              </p>
        
        

          </ReactTooltip>



          <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            {/* Starting with compensation data */}
            {/* Upload your W2 and we will pay you $100 */}
            {/* Get by giving */}
            {/* a lewk is a personal style signature so individual it’s almost indivisible from you */}
            {/* A lewk refers to someone’s fashion or style, in particular how someone is different from the norm and other people */}
          
            The top 10000 users on the Web3 Lewk Ranking are now entitled to mint the Web3 Lewk ID.  &nbsp;
            <a href='/ethereum' style={{
              borderBottom: '1px soldi grey',
              color: '#19FDA6'
            }}>lewk.app/ethereum</a> 

            {/* Create a custom url like 
            
            <a href='/alysia' style={{
              borderBottom: '1px soldi grey',
              color: '#19FDA6'
            }}>lewk.app/alysia</a> 
            
            
            as your lewk as NFT taste  */}

  
             <br />{" "}
             
            {/* Creative your NTFs and sell them */}
          </span>
          <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            {/* Starting with compensation data */}
            {/* Upload your W2 and we will pay you $100 */}
            {/* Get by giving */}
            {/* a lewk is a personal style signature so individual it’s almost indivisible from you */}
            {/* A lewk refers to someone’s fashion or style, in particular how someone is different from the norm and other people */}
         
  
             <br />{" "}
             
            {/* Creative your NTFs and sell them */}
          </span>
       
          <Input
                    style={{
                      padding: '10px',
                      width: '250px',
                      margin: '50px 0px',
                    //   paddingLeft: '90px',
                    paddingTop: '10px',
                    // padding: '10px',
                    }}
                    // autoFocus
                          // ref={inputRef}
                    type='text'
                    placeholder="0x7de9DBahH9FG0237c8302"
                    onChange={
                      (e) => {
                        setWalletAddress(e.target.value)
                      }
                    }
                  />
                    <div style={{
                         marginTop: `${isMobile ? '150px' : '0px'}`,
                         position: 'relative',
                       }}>
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
                       className="p-5 sm:space-y-0 "
                     
                    //    href={userName ?  `/register?username=${userName}`: 'javascript:void(0)'} 
                       onClick={() => {

                        trackEvent('QueryTheBlockCTAbtnSecondHero_Clicked', {
                          library,
                          chainId,
                          account,
                          activate,
                          deactivate,
                          active
                        })
                      
                        _getNFTs(walletAddress)
                       }}
        
                        >Query the block</a>
    
                       </div>

          {/* <ButtonPrimary 
          onClick={() => {
            navigate('/connect-wallet')
          }}>
            <span>Join Community</span> */}
            {/* <span> */}
              {/* <svg className="w-5 h-5 ml-2.5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 22L20 20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg> */}
            {/* </span> */}
          {/* </ButtonPrimary> */}
        </div>
        <div className="flex-grow">
          <img className="w-full"
           src={'https://i.postimg.cc/mkSgJWHz/Screen-Shot-2022-09-11-at-9-11-38-PM.png'} 
           alt="hero" 
           />

          {/* <a href="https://imgbb.com/"><img src=" alt="Screen-Shot-2022-09-08-at-4-34-43-PM" /></a> */}


        </div>
      </div>
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

      {(nftDataETH || nftDataPOLYGON) && <div className="mb-10 mt-10 text-right">
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
              className="p-5 sm:space-y-0 "
            
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

           
      {/* <div className="z-10 mb-12 lg:mb-0 lg:-mt-20 xl:-mt-48 w-full"> */}
        {/* <HeroSearchForm /> */}
      {/* </div> */}
    </div>
  );
};

export default SectionHero2;
