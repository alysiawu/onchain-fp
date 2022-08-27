import Label from "components/Label/Label";
import React, { FC, useState } from "react";
import Web3Modal from 'web3modal'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers'
import { create as ipfsHttpClient, IPFSHTTPClient } from 'ipfs-http-client'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import {
  marketplace as marketplaceAddress, 
  authorization,
  JobFamilies,
  Companies,
  Locations,
  PFPs
} from '../utils/constants'
import twitter from "images/socials/twitter.svg";
import loading from 'images/loading.gif'
import marketplaceAbi from '../artifacts/marketplace.json'

import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
// import Textarea from "shared/Textarea/Textarea";
import { Helmet } from "react-helmet";
import FormItem from "components/FormItem";
import { RadioGroup } from "@headlessui/react";
// import { nftsImgs } from "contains/fakeData";
import MySwitch from "components/MySwitch";
// import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcImage from "shared/NcImage/NcImage";
import NcDropDown, { NcDropDownItem } from "shared/NcDropDown/NcDropDown";
import NcModal from "shared/NcModal/NcModal";

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



// https://ipfs.infura.io:5001/api/v0/add?pin=false
// const client = ipfsHttpClient({ 
//   url: 'https://ipfs.infura.io:5001/api/v0'
// })

const PageUploadItem: FC<PageUploadItemProps> = ({ className = "" }) => {
  const navigate = useNavigate()
  const [showMintingModal, setShowMintingModal] = useState(false)
  const [showMintSuccessModal, setShowMintSuccessModal] = useState(false)
  const [mintSuccess, setMintSuccess] = useState(false)
  const { width, height } = useWindowSize()
  const [metadataIpfsUrl, setMetadataIpfsUrl] = useState<string>()
  const [selected, setSelected] = useState(PFPs[1]);
  const [formInput, updateFormInput] = useState({ 
    chain: 'polygon',
    title: '', 
    company: '', 
     //TODO dropdown
    jobFamily: '', 
    //TODO dropdown
    location: '',
    yearOfExperience: '',
    base: '',
    equity: '',
    price: '', 
  })


  let client: IPFSHTTPClient | undefined;
  try {
    client = ipfsHttpClient({
      url: "https://ipfs.infura.io:5001/api/v0",
      headers: {
        authorization,
      },
    });
  } catch (error) {
    console.error("IPFS error ", error);
    client = undefined;
  }

  
  async function uploadMetadataToIPFS() {
    const { 
      title, 
      company, 
       //TODO dropdown
      jobFamily, 
      //TODO dropdown
      location,
      yearOfExperience,
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
       //TODO dropdown
      jobFamily, 
      //TODO dropdown
      location,
      yearOfExperience,
      base,
      equity,
      price,
      image: selected.featuredImage
    })
    try {
      const added = client && await client.add(data)
      const url = added && `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, return the URL to use it in the transaction */

      setMetadataIpfsUrl(url)
      return url
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  const renderMintSuccessContent  = () => {
    return (
      <form action="#">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
        ✨ You created a salary data NFT !✨ 
        </h3>
        <span className="text-l flex mt-10">
          share to <img src={twitter} width='25' className='mr-5 ml-2' onClick={() => {
            
          }}/>
        </span>
        <div className="mt-4 space-x-3">
          {/* <ButtonPrimary onClick={handleClickSubmitForm} type="submit">
            Delete
          </ButtonPrimary> */}
          

          
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
          <img src={loading} width='50' className='mr-5'/> Minting your salary data into NFTs
        </span>
        <div className="mt-4 space-x-3">
          {/* <ButtonPrimary onClick={handleClickSubmitForm} type="submit">
            Delete
          </ButtonPrimary> */}
          
        </div>
      </form>
    )
  }

  async function listNFTForSale() {
    setShowMintingModal(true)
    const url = await uploadMetadataToIPFS()
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    /* next, create the item */
    const price = ethers.utils.parseUnits(formInput.price, 'ether')
    let contract = new ethers.Contract(
      marketplaceAddress, 
      // PolygonNFTMarketplaceAddress,
      marketplaceAbi.abi, 
      signer
    )

    let listingPrice = await contract.getListingPrice()

    listingPrice = listingPrice.toString()
    let transaction = await contract.createToken(url, price, { value: listingPrice })
    // let transaction = await contract.createToken(url, price, '0x0000000000000000000000000000000000001010', 10, { value: listingPrice })
    const res = await transaction.wait()
      console.log('--res', res, 'transaction', transaction)
    setMintSuccess(true)
    setShowMintingModal(false)
    setShowMintSuccessModal(true)
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
  }

// const dropdownPositon = 'down'
  return (
    <div
      className={`nc-PageUploadItem ${className}`}
      data-nc-id="PageUploadItem"
    >
      <Helmet>
        <title>Talent Nation by Future Protocol</title>
      </Helmet>
      <div className="container">
        <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold">
              {/* Turn your Salary info NFT, and earn passive income selling it */}
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
            </span>
          </div>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8">
            {/* <div> */}
              <h3 className="text-lg sm:text-2xl font-semibold">
                Company & Title Information
              </h3>
              {/* <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
                OGG, GLB, GLTF. Max size: 100 MB
              </span>
              <div className="mt-5 ">
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-xl">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-neutral-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    > */}
                      {/* <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div> */}

            {/* ---- */}
            <FormItem label="Title">
              <Input 
                defaultValue="" 
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      title: e.target.value,
                  })
                  }
                }
              />
            </FormItem>
            <FormItem label="Company">
              <Input 
                defaultValue="" 
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      company: e.target.value,
                  })
                  }
                }
              />

            {/* <select
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
                {Companies.map(jf => {
                  return <option>{
                    jf.name}</option>
                })}
                
              </select> */}
            </FormItem>
            <FormItem label="Job Family">
              {/* <Input 
                defaultValue="" 
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      jobFamily: e.target.value,
                  })
                  }
                }
              /> */}
               <select
                id="jobFamily"
                name="jobFamily"
                className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-neutral-500 dark:text-neutral-300  l:text-l rounded-md"
                // value={formInput.jobFamily}
                onClick={(e) => {
                  
                    updateFormInput({
                      ...formInput,
                      jobFamily: (e.target as HTMLInputElement).value,
                  })
                
                }}
              >
                {JobFamilies.map(jf => {
                  return <option
                    key={jf.id}
                  >{
                    jf.name}</option>
                })}
                
              </select>
            </FormItem>
     
            {/* <FormItem label="Job Family">
              <NcDropDown
              
                // className={` ${containerClassName} `}
                // iconClass={iconClass}
                data={JobFamilies}
                panelMenusClass={""
                  // dropdownPositon === "up"
                  //   ? "origin-bottom-right bottom-0 "
                    // : 
                    // "origin-top-right !w-44 sm:!w-52"
                }
                onClick={(item) => {
                  updateFormInput({
                    ...formInput,
                    jobFamily: item.name,
                })
                }}
              />
            </FormItem> */}
            <FormItem label="Base Salary ($)">
              <Input 
                type='number'
                defaultValue="" 
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      base: e.target.value,
                  })
                  }
                }
              />
            </FormItem>
            <FormItem label="Equity ($)">
              <Input 
               type='number'
                defaultValue="" 
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      equity: e.target.value,
                  })
                  }
                }
              />
            </FormItem>

            <h3 className="text-lg sm:text-2xl font-semibold">
              Work Experience and Location
            </h3>
            <FormItem label="Location">
              {/* <Input 
                defaultValue="" 
 
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      location: e.target.value,
                  })
                  }
                }
              /> */}

              <select
                id="location"
                name="location"
                className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-neutral-500 dark:text-neutral-300  l:text-l rounded-md"
                // value={formInput.location}
                onClick={(e) => {
                    updateFormInput({
                      ...formInput,
                      location: (e.target as HTMLInputElement).value,
                  })
                
                }}
              >
                {Locations.map(jf => {
                  return <option
                    key={jf.id}
                  >{
                    jf.name}</option>
                })}
                
              </select>

            </FormItem>
            <FormItem label="Year of Experience">
              <Input 
                defaultValue="" 
                type='number'
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      yearOfExperience: e.target.value,
                  })
                  }
                }
              />
            </FormItem>

            {/* ---- */}
            {/* <FormItem
              label="External link"
              desc="Ciscrypt will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details."
            >
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  https://
                </span>
                <Input className="!rounded-l-none" placeholder="abc.com" />
              </div>
            </FormItem> */}

            {/* ---- */}
            {/* <FormItem
              label="Description"
              desc={
                <div>
                  The description will be included on the item's detail page
                  underneath its image.{" "}
                  <span className="text-green-500">Markdown</span> syntax is
                  supported.
                </div>
              }
            >
              <Textarea rows={6} className="mt-1.5" placeholder="..." />
            </FormItem> */}

            <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

            <div>
              <Label>Choose PFP</Label>
              <div className="text-neutral-500 dark:text-neutral-400 text-sm">
                Choose an cover PFP for your TC NFT
              </div>
              <RadioGroup value={selected} onChange={setSelected}>
                <RadioGroup.Label className="sr-only">
                  {/* Server size */}
                </RadioGroup.Label>
                <div className="flex overflow-auto py-2 space-x-4 customScrollBar">
                  {PFPs.map((pfp, index) => (
                    <RadioGroup.Option
                      key={index}
                      value={pfp}
                      className={({ active, checked }) =>
                        `${
                          active
                            ? "ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60"
                            : ""
                        }
                  ${
                    checked
                      ? "bg-teal-600 text-white"
                      : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }
                    relative flex-shrink-0 w-44 rounded-xl border border-neutral-200 dark:border-neutral-700 px-6 py-5 cursor-pointer flex focus:outline-none `
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                              <div className="text-sm">
                                <div className="flex items-center justify-between">
                                  <RadioGroup.Description
                                    as="div"
                                    className={"rounded-full w-16"}
                                  >
                                    <NcImage
                                      containerClassName="aspect-w-1 aspect-h-1 rounded-full overflow-hidden"
                                      src={pfp.featuredImage}
                                    />
                                  </RadioGroup.Description>
                                  {checked && (
                                    <div className="flex-shrink-0 text-white">
                                      <CheckIcon className="w-6 h-6" />
                                    </div>
                                  )}
                                </div>
                                <RadioGroup.Label
                                  as="p"
                                  className={`font-semibold mt-3  ${
                                    checked ? "text-white" : ""
                                  }`}
                                >
                                  {pfp.name}
                                </RadioGroup.Label>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>

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
            <FormItem label="Price (MATIC)">
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
            </FormItem>

            <MySwitch
              enabled
              label="Unlock once purchased"
              desc="Content will be unlocked after successful transaction"
            />

            {/* ---- */}
            <div className="pt-2 flex flex-col sm:flex-row space-y-3 sm:space-y-0 space-x-0 sm:space-x-3 ">
              <ButtonPrimary className="flex-1"
                 onClick={() => listNFTForSale()}
              >Mint & Sell NFT</ButtonPrimary>
              {/* <ButtonSecondary className="flex-1">Preview item</ButtonSecondary> */}
            </div>
          </div>
        </div>
      </div>
      { mintSuccess && <Confetti
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

export default PageUploadItem;
