import React, { FC, useEffect, useState } from "react";
import { TwitterShareButton, TwitterIcon } from "react-share";
import { useNavigate } from 'react-router-dom';
import { create as ipfsHttpClient, IPFSHTTPClient } from 'ipfs-http-client'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import {
  marketplace as marketplaceAddress, 
  authorization,
  // AchievementCategories,
  // Companies,
  // Locations,
  // PFPs,
  // SkillBadges
} from '../utils/constants'
// import twitter from "images/socials/twitter.svg";
import metamaskImg from "images/metamask.webp";
// import polygon from "images/polygon-matic-logo.png"
import loading from 'images/loading.gif'


import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
// import Textarea from "shared/Textarea/Textarea";
import { Helmet } from "react-helmet";
import FormItem from "components/FormItem";
// import { RadioGroup } from "@headlessui/react";
// import { nftsImgs } from "contains/fakeData";
// import MySwitch from "components/MySwitch";
// import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcImage from "shared/NcImage/NcImage";
// import NcDropDown, { NcDropDownItem } from "shared/NcDropDown/NcDropDown";
import NcModal from "shared/NcModal/NcModal";

// import { WalletService } from "@unlock-protocol/unlock-js";
import Textarea from "shared/Textarea/Textarea";
import { useAccountContext } from "contexts/accountContext";
import { trackEvent } from "utils/tracking";
import { useWeb3React } from "@web3-react/core";
import { saveCustomerUrltoFirebase, saveCustomerUrltoFirebase2, saveGatedContent, saveGatedContent2, savePagetoFirebase, saveWalletToAirtable, saveWallettoFirebase, TokenGateCondition } from "containers/PageHome/helpers";


export interface PageUploadItemProps {
  className?: string;
}

const Success: FC<PageUploadItemProps> = ({ className = "" }) => {

  const plans = [
    {
      name: "Metamask",
      img: metamaskImg,
    },

  ]

  const AccessTypes = [
    {
        type: 'event',
        name: 'Event',
        selected: false,
    }, 
    {
      type: 'blog',
      name: 'Blog',
      selected: false,
     }, 

     {
      type: 'video',
      name: 'Video',
      selected: false,
     }, 
     {
      type: 'art',
      name: 'Art',
      selected: false,
     },

     {
      type: 'link',
      name: 'Link',
      selected: false,
     }, 
     {
      type: 'communication',
      name: 'Communication',
      selected: false
     },
  ]


  const [showModal, setShowModal] = useState(false);
  const { connectWallet } = useAccountContext()
  const [currentAccount, setCurrentAccount] = useState('')
  const navigate = useNavigate()
  const [fileUrl, setFileUrl] = useState<string>('')
  const [showMintingModal, setShowMintingModal] = useState(false)
  const [showMintSuccessModal, setShowMintSuccessModal] = useState(false)
  const [mintSuccess, setMintSuccess] = useState(false)

  const { width, height } = useWindowSize()

  // const [selected, setSelected] = useState(SkillBadges[1]);
  const [formInput, updateFormInput] = useState({ 
    chain: 'polygon',
    title: '', 
    company: '', 
    file: '',
     //TODO dropdown
    jobFamily: '', 
    //TODO dropdown
    location: '',
    yearOfExperience: '',
    skillValueAdd: '',
    base: '',
    equity: '',
    price: '', 
  })

  console.log('--currentAccount', currentAccount)


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




  let client: IPFSHTTPClient | undefined;
  try {
    client = ipfsHttpClient({
      // url: "https://websan.infura-ipfs.io",

      url: 'https://infura-ipfs.io:5001',
      // port: 5001,
      // protocol: 'https',
      headers: {
        authorization,
      },
    });
  } catch (error) {
    console.error("IPFS error ", error);
    client = undefined;
  }


  const renderMintSuccessContent  = () => {
    return (
      <form action="#">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
        ✨ Congrats! You Minted your NFT!✨ 
        </h3>
        {/* <span className="text-l flex mt-10">
          share to <img src={twitter} width='25' className='mr-5 ml-2' onClick={() => {
            
          }}/>
        </span> */}

         <h3 className="text-lg sm:text-2xl font-semibold mt-10">
              <a style={{background: '#19FDA6', padding: '12px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}}> ✨ Share on twitter  
              
              <TwitterShareButton
                style={{background: 'none', margin: '1rem', marginTop: '10px'}}
                  title={"I just minted my Achievement NFT as a pass to Web三DAO talentverse https://www.futureprotocol.co/create"}
                  url={'https://www.futureprotocol.co/create'}
                  hashtags={["futureprotocol","Web三DAO", "talentnation", "ownershipeconomy", "buildereconomy"]}
                >
                  <TwitterIcon size={32} round />
            
                </TwitterShareButton>
                
                </a>
              </h3>

              
        <div className="mt-10 mb-10 space-x-3">
          {/* <ButtonPrimary onClick={handleClickSubmitForm} type="submit">
            Delete
          </ButtonPrimary> */}
          
          <h3 className="text-lg sm:text-2xl font-semibold">
              <a style={{background: '#19FDA6', padding: '12px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'https://discord.gg/bGq3zG7t77'} >Join our Discord Community</a>
              </h3>
          
        </div>
      </form>
    );
  };


  const  renderContent = () => {
    return (

        <form action="#">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
        ✨🔮 Magic in the works... 🔮✨ 
        </h3>
        <span className="text-l flex mt-10">
          <img src={loading} width='50' className='mr-5'/> Minting NFT...
        </span>
        <div className="mt-4 space-x-3">
          {/* <ButtonPrimary onClick={handleClickSubmitForm} type="submit">
            Delete
          </ButtonPrimary> */}
          
        </div>
      </form>
    )
  }




  const fileInput = React.createRef<HTMLInputElement>();


const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active
  } = useWeb3React();

  const [gatedContent, setGatedContent] = useState()

const [errorInput, updateErrorInput] = useState({ 
    pageSlug: ''
  })

  const [ETHGatingCondition, setETHGatingCondition] = useState<{
    tokenId: string,
    contractAddress: string,
    chain: 'Polygon' | 'Ethereum'
  }[]>()

  const [PolygonGatingCondition, setPolygonGatingCondition] = useState<{
    tokenId: string,
    contractAddress: string,
    chain: 'Polygon' | 'Ethereum'
  }[]>()


  console.log('--account', account)

  const [pageSlug, setPageSlug] = useState('')

    const createPage = async (_pageSlug: string, wallet: string, contentType: 'video', tokenGates: TokenGateCondition[], content: string) => {

    const pageSlug = _pageSlug.trim().toLowerCase()
    const res = await saveWalletToAirtable(pageSlug, wallet)
    // if (res == 'success') {
        // setSaveUserName(true)
        // records.forEach(function(record) {
        // console.log(record.get('Name'));
    // });
        console.log('---contentType, tokenGates', contentType, tokenGates)
        await saveCustomerUrltoFirebase(wallet, pageSlug, contentType, tokenGates)
        await saveGatedContent(_pageSlug, contentType, content)
        // setSaveUserName(true)
        setTimeout(() => {
            navigate(`/gated/${pageSlug}`, {
            state: {
                from: 'profile_page',
                // nftDataPOLYGON,
                // nftDataETH
            }
            })
        }, 100)
    }


    const createGatedLink = async (
        _pageSlug: string,
        wallet: string, 
        tokenGates: TokenGateCondition[], 
        content: string
    ) => {

        const pageSlug = _pageSlug.trim().toLowerCase()

        // if (res == 'success') {
        // setSaveUserName(true)
        // records.forEach(function(record) {
        // console.log(record.get('Name'));
        // });
        console.log('---contentType, tokenGates', tokenGates)
        await saveCustomerUrltoFirebase2(wallet, pageSlug, tokenGates)
        await saveGatedContent2(_pageSlug, content)
        // setSaveUserName(true)
        navigate('/success')
    }
  


if (!currentAccount)  {

  return (
    <div
  className={`nc-PageConnectWallet ${className}`}
  data-nc-id="PageConnectWallet"
>
  <Helmet>
    <title>Sign in with wallet || Lewk.app</title>
  </Helmet>
  <div className="container">
    <div className="my-12 sm:lg:my-16 lg:my-24 max-w-3xl mx-auto space-y-8 sm:space-y-10">
      {/* HEADING */}
      <div className="max-w-2xl">
        <h2 className="text-3xl sm:text-4xl font-semibold">
          Connect your wallet to Metamask
        </h2>
        
        <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
          Connect with one of our available wallet providers
        </span>
      </div>
      <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
      <div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8">
        <div className="space-y-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              // onClick={() => setShowModal(true)}
              onClick={() => connectWallet && connectWallet()}
              typeof="button"
              tabIndex={0}
              className="relative rounded-xl hover:shadow-lg hover:bg-neutral-50 border 
            border-neutral-200 dark:border-neutral-700 px-3 sm:px-5 py-4 cursor-pointer flex 
            focus:outline-none focus:shadow-outline-blue focus:border-blue-500 dark:bg-neutral-800 
            dark:text-neutral-100 dark:hover:bg-neutral-900 dark:hover:text-neutral-200"
            >
              <div className="flex items-center w-full">
                <NcImage
                  src={plan.img}
                  containerClassName="flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 p-2 sm:p-3 bg-white rounded-full overflow-hidden shadow-lg"
                />
                <div
                  className={`ml-4 sm:ml-8 font-semibold text-xl sm:text-2xl `}
                >
                  {plan.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ---- */}
        <div className="pt-2 ">
          <ButtonPrimary href={"/"} className="flex-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.5 12H3.67004"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="ml-2">Go Back Home</span>
          </ButtonPrimary>
        </div>
      </div>
    </div>
  </div>

  <NcModal
    renderTrigger={() => null}
    isOpenProp={showModal}
    renderContent={renderContent}
    contentExtraClass="max-w-md"
    onCloseModal={() => setShowModal(false)}
    modalTitle="Sign in with wallet"
  />
</div>

  )
  
} else {
   return (
    <div
      className={`nc-PageUploadItem ${className}`}
      data-nc-id="PageUploadItem"
    >
      <Helmet>
        <title>Lewk.app</title>
      </Helmet>
      <div className="container flex">
        <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold">
              {/* Turn your Salary info NFT, and earn passive income selling it */}

              {/* Allow content on the lewk page to be unlocked with ownership of an NFT */}
                  {/* ✨🔮 Choose a page slug for the controlled page🔮✨ */}
                  Who should have access?
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400 flex">
            Gate to 1 contract and up to 10 wallets.
            {/* Provide details about the NFT to be used to unlock the content, and anyone trying to access your file will not be able to access it unless they own the NFT specified. */}
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
              {/* We are on
              Gate to 1 contract and up to 10 wallets.
              <img src={polygon} style={{height: '25px', display: 'flex'}} className="pl-2" /> */}
            </span>
          </div>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8">
            <FormItem 
                label="" 
                
            >
                <div>



                </div>
              <Input 
                defaultValue=""
                placeholder="Collection name, address, or token symbol"
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      company: e.target.value,
                  })
                  }
                }
              />

            <select
                id="company"
                name="company"
                className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-neutral-500 dark:text-neutral-300 l:text-l rounded-md"
                // value={formInput.company}
                onClick={(e) => {
                  
                    updateFormInput({
                      ...formInput,
                      company: (e.target as HTMLInputElement).value,
                  })
                
                }}
              >
                {[
                    {
                    name: 'ETH'
                },
                {
                    name: 'Polygon'
                }
            ].map(jf => {
                  return <option>{
                    jf.name}</option>
                })}
                
              </select>
            </FormItem>

            <FormItem label="Ethereum Contract Address">

            <span className="block mt-3 text-neutral-500 dark:text-neutral-400 flex">
                {/* ContractAddress,tokenId;ContractAddress,tokenId */}
            </span>
 
            <Input  
                 
                      placeholder='contract address,tokenId;contract address, token id'
                      onChange={
                          (e) => {
                            const values =  e.target.value.split(";")
                            const condistions = values.map(v => {
                                const [contractAddress, tokenId] = v.split(',')
                                return {
                                    contractAddress,
                                    tokenId,
                                    chain: 'Ethereum'
                                }
                            })
                            console.log('---condistions', condistions)
                            // @ts-ignore
                            setETHGatingCondition(condistions)
                            
                          }
          
                      }/>
                    </FormItem>
                      <FormItem label="Polygon Contract Address | 0x2AA03c9cD829F57a0EA4BBB496547308F6e10874">
                                 <Input  
                 
                                    placeholder='contract address address'
                                    onChange={
                                        (e) => {
                        
                                            const values =  e.target.value.split(";")
                                            const condistions = values.map(v => {
                                                const [contractAddress, tokenId] = v.split(',')
                                                return {
                                                    contractAddress,
                                                    tokenId,
                                                    chain: 'Polygon'
                                                }
                                            })
                                            console.log('---condistions', condistions)
                                            // @ts-ignore
                                            setPolygonGatingCondition(condistions)
                                        }
                        
                                    }/>
                                     
                                     </FormItem>
            

            <div>

            </div>

        
           
            <div> 


  
      
            </div>


            {/* <FormItem label="Gated Content Link">
              <Textarea 
                defaultValue="" 
                style={{
                    padding: '10px'
                }}
                onChange={
                  (e) => {
                    // @ts-ignore
                    setGatedContent(e.target.value)
                  //   updateFormInput({
                  //     ...formInput,
                  //     skillValueAdd: e.target.value,
                  // })
                  }
                }
              />
 
            </FormItem> */}


            <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

            <div>
              {/* <Label>Choose the skillset you want to mint</Label> */}
          
        
            </div>


            <h3 className="text-lg sm:text-2xl font-semibold mt-10">
              {/* <ButtonPrimary className="flex-1"
                 onClick={() => listNFTForSale()}
              >Mint & Sell NFT</ButtonPrimary> */}

            {/* <a style={{background: '#19FDA6', padding: '10px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} onClick={() => listNFTForSale()} >Mint & Sell Skill NFT</a> */}
            <div></div>

            <a style={{
                background: '#19FDA6', 
                padding: '12px', 
                'boxShadow': '0 0 50px #19FDA6',
                 borderRadius: '20px', 
                 color: '#111', 
                 cursor: 'pointer'

              }}   
                onClick={() =>  {
                    let rr: any[] = []
                    if (PolygonGatingCondition) {
                        rr = rr.concat(PolygonGatingCondition)
                    }
                    if (ETHGatingCondition) {
                        rr = rr.concat(ETHGatingCondition)
                    }
                    account &&  createGatedLink(pageSlug, account, rr,
                    
                    gatedContent || ''
                    )
                }
              }> 
           Create Page
               
                
            </a>

              {/* <ButtonSecondary className="flex-1">Preview item</ButtonSecondary> */}
            </h3>
          </div>
          <div className="text-neutral-500 dark:text-neutral-400 text-sm">
                {/* Choose an cover PFP for your TC NFT */}
                {/* Want to propose a? 
                email propose@futureprotocol.co */}

                Want to be an artist?
                email hello@futureprotocol.co
                
              </div>
              <div className="text-neutral-500 dark:text-neutral-400 text-sm">
                {/* Choose an cover PFP for your TC NFT */}
           
          
                
              </div>
        </div>
        <div style={{

        }}>
        
        
        </div>
      </div>

    { 
        mintSuccess && <Confetti
        width={width}
        height={height}
      /> }
      {
       showMintingModal && <NcModal
        isOpenProp={showMintingModal}
        onCloseModal={() => {
          setShowMintingModal(false)
        }}
        contentExtraClass="max-w-screen-sm"
        renderContent={renderContent}
        // renderTrigger={renderTrigger}
        modalTitle=""
      />
      }
      {
       showMintSuccessModal && <NcModal
        isOpenProp={showMintSuccessModal}
        onCloseModal={() => {
          setShowMintSuccessModal(false)
        }}
        contentExtraClass="max-w-screen-sm"
        renderContent={renderMintSuccessContent}
        // renderTrigger={renderTrigger}
        modalTitle=""
      />
      }
    </div>
  );

}

// if (!currentAccount) return (
//     <div
//       className={`nc-PageUploadItem ${className}`}
//       data-nc-id="PageUploadItem"
//     >
//   <Helmet>
//     <title>Talent Nation by Future Protocol</title>
//   </Helmet>
//   <div className="container">
//     <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">



//     </div>

//     </div>

//     </div>
    
//     )

 
};

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Success;
