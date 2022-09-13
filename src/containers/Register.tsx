import Label from "components/Label/Label";
import React, { FC, useEffect, useState } from "react";
import { TwitterShareButton, TwitterIcon } from "react-share";
import Web3Modal from 'web3modal'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ethers } from 'ethers'
import { create as ipfsHttpClient, IPFSHTTPClient } from 'ipfs-http-client'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import {
  marketplace as marketplaceAddress, 
  authorization,
  AchievementCategories,

  SkillBadges
} from '../utils/constants'
// import twitter from "images/socials/twitter.svg";
import metamaskImg from "images/metamask.webp";
import polygon from "images/polygon-matic-logo.png"
import loading from 'images/loading.gif'
import marketplaceAbi from '../artifacts/marketplace.json'

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
import { useFirebaseContext } from "contexts/firebaseContext";
import { current } from "@reduxjs/toolkit";


export interface PageUploadItemProps {
  className?: string;
}

// https://ipfs.io/ipfs/QmTV5TvgzvYd3PDtcTx1iTbxYG1MDrhnjxVKwehfj6aeEP?filename=6.png
const plans = [
  {
    name: "Crypto Legend - Professor",
    featuredImage: 'https://ipfs.io/ipfs/QmTV5TvgzvYd3PDtcTx1iTbxYG1MDrhnjxVKwehfj6aeEP?filename=6.png',
  },
  {
    name: "Crypto Legend - Professor",
    featuredImage: 'https://ipfs.io/ipfs/Qmad4u7F4Z6j1zMaqLHGH7ierJ8yZ2GY5ayJK4xAVqVmvu?filename=10.png',
  },
  {
    name: "Crypto Legend - Professor",
    featuredImage: 'https://ipfs.io/ipfs/QmQyaoEyL2idHSgRyJ1AaQ5FHC6jTeTkWnRFnsqNkMPrVh?filename=14.png',
  },
  {
    name: "Crypto Legend - Professor",
    featuredImage: 'https://ipfs.io/ipfs/QmPzE1FfPw9FqDLhz3ZbNoM8Bxrx7jihTG3wwrDMfviGMa?filename=42.png',
  },
  {
    name: "Crypto Legend - Professor",
    featuredImage: 'https://ipfs.io/ipfs/QmSA3e7swDUDHnL22JUnQg74ZXAv68fsC3PQ82cwLq8t78?filename=38.png',
  },
  {
    name: "Crypto Legend - Professor",
    featuredImage: 'https://ipfs.io/ipfs/QmeirssBsSUGZt53M3SZNVv73VcLkhErQ9x9bwE6RtpPPX?filename=31.png',
  },
];

// https://websan.infura-ipfs.io/ipfs/
// https://$custom-subdomain.ipfs.infura-ipfs.io/ipfs/$CID/path/to/something
// https://infura-ipfs.io:5001/api/v0/add?pin=false
// const client = ipfsHttpClient({ 
//   url: 'https://infura-ipfs.io:5001/api/v0'
// })

const Register: FC<PageUploadItemProps> = ({ className = "" }) => {
    const {
        email, 
        photoUrl,
        displayName,
        signInWithGoogle,
        currentUser
      } = useFirebaseContext()

    const [ searchParams ] = useSearchParams()

    console.log('---username', searchParams.get('username'))
    const _username = searchParams.get('username')

    const [username, setUsername] = useState(_username)
    const [existedWallets, setExistedWallets] = useState()
const [existed, setExisted] = useState(false)
  // const plans = [
  //   {
  //     name: "Metamask",
  //     img: metamaskImg,
  //   },

  // ]
  const [showModal, setShowModal] = useState(false);
  const { connectWallet, currentAccount, setCurrentAccount  } = useAccountContext()
  // const [currentAccount, setCurrentAccount] = useState('')
  const navigate = useNavigate()
  const [fileUrl, setFileUrl] = useState<string>('')
  const [showMintingModal, setShowMintingModal] = useState(false)
  const [showMintSuccessModal, setShowMintSuccessModal] = useState(false)
  const [mintSuccess, setMintSuccess] = useState(false)
  const [uploadingFile, setUploadingFile] = useState(false)
  const { width, height } = useWindowSize()
  const [metadataIpfsUrl, setMetadataIpfsUrl] = useState<string>()
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
      setCurrentAccount && setCurrentAccount(w)
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

  
  async function uploadMetadataToIPFS() {
    setUploadingFile(true)
    const { 
      title, 
      company, 
       //TODO dropdown
      jobFamily, 
      //TODO dropdown
      location,
      yearOfExperience,
      skillValueAdd,
      base,
      equity,
      price,


      // image,
    } = formInput


    console.log('---formInput', formInput)
    // if (!title || !company || !price || !jobFamily || !yearOfExperience || !location) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      title, 
      company, 
      image: fileUrl,
       //TODO dropdown
      jobFamily, 
      //TODO dropdown
      location,
      yearOfExperience,
      skillValueAdd,
      base,
      equity,
      price,
      // image: selected.featuredImage
    })
    try {
      const added = client && await client.add(data)
      const url = added && `https://websan.infura-ipfs.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, return the URL to use it in the transaction */

      setMetadataIpfsUrl(url)
      setUploadingFile(false)
      return url
    } catch (error) {
      console.log('Error uploading file: ', error)
      setUploadingFile(false)
    }  
  }

  const renderMintSuccessContent  = () => {
    return (
      <form action="#">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
        {/* ✨ Congrats! You Claimed an Achievement NFT, this is the pass for your Web三DAO talentverse !✨  */}
        </h3>
        {/* <span className="text-l flex mt-10">
          share to <img src={twitter} width='25' className='mr-5 ml-2' onClick={() => {
            
          }}/>
        </span> */}

         <h3 className="text-lg sm:text-2xl font-semibold mt-10">
              <a style={{background: '#39f889', padding: '12px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}}> ✨ Share on twitter  
              
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
              <a style={{background: '#39f889', padding: '12px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}} href={'https://discord.gg/bGq3zG7t77'} >Join our Discord Community</a>
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
          <img src={loading} width='50' className='mr-5'/> Minting Skill NFT On Chain
        </span>
        <div className="mt-4 space-x-3">
          {/* <ButtonPrimary onClick={handleClickSubmitForm} type="submit">
            Delete
          </ButtonPrimary> */}
          
        </div>
      </form>
    )
  }




  // async function listNFTForSale() {
  //   setShowMintingModal(true)
  //   const url = await uploadMetadataToIPFS()
  //   const web3Modal = new Web3Modal()
  //   const connection = await web3Modal.connect()
  //   const provider = new ethers.providers.Web3Provider(connection)
  //   const signer = provider.getSigner()
  //   /* next, create the item */
  //   const price = ethers.utils.parseUnits(formInput.price, 'ether')
  //   let contract = new ethers.Contract(
  //     marketplaceAddress, 
  //     // PolygonNFTMarketplaceAddress,
  //     marketplaceAbi.abi, 
  //     signer
  //   )

  //   let listingPrice = await contract.getListingPrice()

  //   listingPrice = listingPrice.toString()
  //   let transaction = await contract.createToken(url, price, { value: listingPrice })
  //   // let transaction = await contract.createToken(url, price, '0x0000000000000000000000000000000000001010', 10, { value: listingPrice })
  //   const res = await transaction.wait()
  //     // console.log('--res', res, 'transaction', transaction)
  //   setMintSuccess(true)
  //   setShowMintingModal(false)
  //   setShowMintSuccessModal(true)
    // toast("Item successfully listed for sale 🎉 ")
    // await saveToDB({
    //   formInput,
    //   image: fileUrl,
    //   url,
    //   metadataUrl: url,
    //   signer,
    //   marketplaceAddress
    //   // PolygonNFTMarketplaceAddress,
    //   // listingPrice,
    //   // musicFileUrl,
    // })
    // TODO 
    // navigate('/profile')
  // }

  // const fileInput = React.createRef<HTMLInputElement>();

  // async function onUploadImageToIPFS(e: React.ChangeEvent<HTMLInputElement>) {
    
  //   let client: IPFSHTTPClient | undefined;
  //   try {
  //     client = ipfsHttpClient({
  //       // url: "https://websan.infura-ipfs.io/ipfs/",
  //       url: 'https://infura-ipfs.io:5001',
  //       // port: 5001,
  //       // protocol: 'https',
  //       headers: {
  //         authorization,
  //       },
  //     });

  //     const file = e?.target?.files?.[0]
  //     console.log('---file', file)
  //     if (!file) return
  //     try {
  //       const added = await client.add(
  //         file,
  //         {
  //           progress: (prog) => console.log(`received: ${prog}`)
  //         }
  //       )
  //       const url = `https://websan.infura-ipfs.io/ipfs/${added.path}`
        
  //       console.log('--url', url)
        
        
  //       setFileUrl(url)
   
  
  //     } catch (error) {
  //       console.log('Error uploading file: ', error)
  //     }  
  //   } catch (error) {
  //     console.error("IPFS error ", error);
  //     client = undefined;
  //   }

    

    // const client = ipfsHttpClient({ 
    //   'https://infura-ipfs.io:5001/api/v0'
    // })
 
  // }

// const dropdownPositon = 'down'
// const getLinks = async () => {
//     var Airtable = require('airtable');
//     var base = new Airtable({apiKey: 'keyDr90Ny9XSuy819'}).base('appfZedSta1s4n06f');


//     base('NametoWallets').find('recR18tUivvgOPgdg', function(err: any, record: any) {
//         if (err) { console.error(err); return; }
//         console.log('Retrieved', record.id);

//     });
// }

useEffect(() => {
  console.log('displayName && currentAccount && username', displayName, currentAccount , username)
  if (displayName && currentAccount && username) {
    navigate(`/${username}`)
  }
}, [displayName, currentAccount, username])

// const updateLinks = async () => {

// }

const associateWallet = async (wallet: string) => {
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'keyDr90Ny9XSuy819'}).base('appfZedSta1s4n06f');

    console.log('--usename', username)


    base('NametoWallets').select({
        // Selecting the first 3 records in Grid view:
        // maxRecords: 3,
        view: "Grid view",
        // filterByFormula: `Name%3Dalysia`
    }).eachPage(function page(records: any[], fetchNextPage: () => void) {
        // This function (`page`) will get called for each page of records.
    
        records.forEach(function(record) {
            console.log('Retrieved', record.get('Name'), '--', record.get('Wallets'));
            if (record.get('Name') === username) {
                setExisted(true)
                setExistedWallets(record.get('Wallets'))
                console.log('lllll', existed, existedWallets)

            }
        });
    
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        // fetchNextPage();

        console.log('existedWallets', existedWallets, existed)
        if (existed) {
            navigate(`/${username}`)
        } else {
            console.log('-oooo-currentAccount', currentAccount)
             base('NametoWallets').create([
                {
                "fields": {
                    "Name": username,
                    "Wallets": currentAccount
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

                navigate(`/${username}`)
            });
        }


    // @ts-ignore
    }, function done(err) {
        if (err) { console.error(err); return; }
    });

    // if (existed) {
       
    // }

    // base('NametoWallets').create([
    //     {
    //       "fields": {
    //         "Name": username,
    //         "Wallets": wallet
    //       }
    //     }
    //   ], function(err: any, records: any[]) {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //     records.forEach(function(record) {
    //       console.log(record.get('Name'));
    //     });
    //   });



}


if (false)  {

  return (
    <div
  className={`nc-PageConnectWallet ${className}`}
  data-nc-id="PageConnectWallet"
>
  <Helmet>
    <title>Connect Wallet || Future Protocol</title>
  </Helmet>
  <div className="container">
    <div className="my-12 sm:lg:my-16 lg:my-24 max-w-3xl mx-auto space-y-8 sm:space-y-10">
      {/* HEADING */}
      {/* <div className="max-w-2xl"> */}
        {/* <h2 className="text-3xl sm:text-4xl font-semibold">
          Connect your wallet to Polygon Network (Other chains coming soon!)
        </h2>
        
        <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
          Connect with one of our available wallet providers
        </span> */}
      {/* </div> */}
      <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
      <div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8">
        {/* <div className="space-y-3">
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
        </div> */}

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
    modalTitle="Connect Wallet"
  />
</div>

  )
  
} else {
   return (
    <div
      className={`nc-PageUploadItem ${className}`}
      data-nc-id="PageUploadItem"
      style={{
          height: '100vh'
      }}
    >
      <Helmet>
        <title>Lewk.app</title>
      </Helmet>
      <div className="container">
        <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl">
        
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400 flex">
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
              {/* We are on
              <img src={polygon} style={{height: '25px', display: 'flex'}} className="pl-2" /> */}
            </span>
          </div>
          {/* <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div> */}
          <div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8">
            <div>
      
               
                                


                                   {/* {  fileUrl &&  <img className="rounded mt-4" width="350" style={{marginBottom: '30px'}} src={fileUrl} />} */}


              {/* <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                This will be the coverage image of your NFT, it can be your anything that represents your achievement.
                File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
                OGG, GLB, GLTF. Max size: 100 MB
              </span> */}


              <div className="mt-5 ">
                {/* <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-xl">
                  <div className="space-y-1 text-center">
                    {  !fileInput &&  <svg
                      className="mx-auto h-12 w-12 text-neutral-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    > 
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>}
                    <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                      > */}
                        {/* <span  onClick={(e) => 
                          // e.target.defaultPrevented()
                          fileInput?.current?.click()
                          
                          } >Upload a file</span> */}

                          {/* {uploadingFile && 
                          <div className="tenor-gif-embed" data-postid="22743155" data-share-method="host" data-aspect-ratio="0.990625" data-width="100%"><a href="https://tenor.com/view/hug-gif-22743155">Hug Sticker</a>from <a href="https://tenor.com/search/hug-stickers">Hug Stickers</a></div>  */}
                          
                          {/* <script type="text/javascript" async src="https://tenor.com/embed.js"></script> 
                          
                          } */}

                        {/* <input
                         ref={fileInput}
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          value={formInput.file}
                          onChange={(e) => onUploadImageToIPFS(e)}
                        />
                      </label> */}
                      {/* { !fileInput && <p className="pl-1">or drag and drop</p>} */}
                    {/* </div> */}
                    {/* <p className="text-xs text-neutral-500 dark:text-neutral-400"> */}
                      {/* PNG, JPG, GIF up to 10MB */}
                    {/* </p> */}
                    {/* <a 
                                
                                onClick={() => fileInput?.current?.click()} >
                                    
                                    {`${fileUrl ? 'Change File' : 'Cover image for your NFT'}`}
                            </a> */}

{/* 
                           {  fileUrl &&  <img className="rounded mt-4" width="350" style={{marginBottom: '30px'}} src={fileUrl} />} */}
                  {/* </div>
                </div> */}
              </div>
            </div>

            {/* ---- */}
            <div className="relative py-5 lg:py-5 text-center">
             
                <h3 className="text-lg sm:text-2xl font-semibold mb-10 text-center">
                    Welcome to Lewk.app
                </h3>

                <p className="text text-neutral-500 dark:text-neutral-400">
                      The home for 1 billion NFTs
                   

                </p>


                <h3 className="text-lg sm:text-2xl font-semibold mb-10 mt-10 text-center">
                {`Claim your lewk.app/${username || 'username'}`}
                </h3>
               
                {displayName && <p className="text text-neutral-500 dark:text-neutral-400">
                    You are logged in as {displayName}

                </p>}

            </div>
          
{/*             
            {<FormItem label={''}>
              <Input 
            //  @ts-ignore
                value={username}
                style={{
                  border: 'none'
                }}
                 //  @ts-ignore
                placeholder={username}
                onChange={
                  (e) => {
                    setUsername( e.target.value)
                //     updateFormInput({
                //       ...formInput,
                //       title: e.target.value,
                //   })
                  }
                }
              />
            </FormItem>} */}


            <div>
              {/* <Label>Choose the skillset you want to mint</Label> */}
          
              <h2 className="text-3xl sm:text-4xl font-semibold mt-30">
              {/* Turn your Salary info NFT, and earn passive income selling it */}

            {/* Mint an achievement NFT */}

            </h2>
            </div>
            <div className="relative py-10 lg:py-10"></div>
            <h3 className="text-lg sm:text-2xl font-semibold mb-10 text-center">

                

                {/* Company & Title Information */}

                {!currentAccount && <a style={{background: '#39f889', padding: '15px 25px', 'boxShadow': '0 0 50px #39f889', borderRadius: '30px', color: '#111', cursor: 'pointer'}}
                    onClick={
                        
                        () => { 
                            connectWallet && connectWallet()
                        
                            console.log('pppppcurrentAccount', currentAccount)

                            currentAccount && associateWallet(currentAccount)
                        }
                    
                    
                    }
                    
                    >  
                    Connect Wallet
                </a>}

                {!displayName && <a style={{
                    padding: '15px 20px', 
                    'boxShadow': '0 0 50px #39f889', 
                    borderRadius: '30px', 
                    color: '#39f889',
                    cursor: 'pointer'

                }} onClick={(e) => {
                e.preventDefault();
                signInWithGoogle && signInWithGoogle();
              }} > Sign in with Google
              
              {/* <img style={{height: '20px',}} src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon"/> */}
              <span> </span></a>}
                </h3>


            {/* ---- */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-2.5">
              {/* ---- */}
              {/* <FormItem label="Royalties">
                <Input placeholder="20%" />
              </FormItem> */}
              {/* ---- */}
              {/* <FormItem label="Size">
                <Input placeholder="165Mb" />
              </FormItem> */}
              {/* ---- */}
              {/* <FormItem label="Propertie">
                <Input placeholder="Propertie" />
              </FormItem> */}
            </div>

            {/* ---- */}
            {/* <MySwitch enabled /> */}

            {/* ---- */}
            {/* <MySwitch
              label="Instant sale price"
              desc="Enter the price for which the item will be instantly sold"
            /> */}

            {/* ---- */}
            {/* <FormItem label="Price (MATIC)">
              <Input 
                defaultValue="" 
                type='number'
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      price: e.target.value,
                  })
                  }
                }
              />
            </FormItem> */}

            {/* <MySwitch
              enabled
              label="Unlock once purchased"
              desc="Content will be unlocked after successful transaction"
            /> */}

            {/* ---- */}
            <h3 className="text-lg sm:text-2xl font-semibold mt-10">
              {/* <ButtonPrimary className="flex-1"
                 onClick={() => listNFTForSale()}
              >Mint & Sell NFT</ButtonPrimary> */}

            {/* <a style={{background: '#39f889', padding: '10px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}} onClick={() => listNFTForSale()} >Mint & Sell Skill NFT</a> */}
            <div></div>
{/* 
            <a style={{background: '#39f889', padding: '12px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}}   onClick={() => listNFTForSale()}> 
            Mint 
               
                
            </a> */}

              {/* <ButtonSecondary className="flex-1">Preview item</ButtonSecondary> */}
            </h3>
          </div>
          <div className="text-neutral-500 dark:text-neutral-400 text-sm mt-30 text-center">
                {/* Choose an cover PFP for your TC NFT */}
                {/* Want to propose a? 
                email propose@futureprotocol.co */}

                {/* Want to be an artist?
                email hello@futureprotocol.co */}
                {/* Connect your wallet to get upcoming airdrop */}
               {!displayName && 'Sign in with Google, so you get the aidrop updates!'}
               {!currentAccount && 'Connect with wallet to view all your NFTs'}
                
              </div>
              <div className="text-neutral-500 dark:text-neutral-400 text-sm">
                {/* Choose an cover PFP for your TC NFT */}
           
          
                
              </div>
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

export default Register;
