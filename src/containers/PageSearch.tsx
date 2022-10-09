import React, { FC, useState, useEffect } from "react";
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import { Helmet } from "react-helmet";
// import BackgroundSection from "components/BackgroundSection/BackgroundSection";
// import Pagination from "shared/Pagination/Pagination";
// import ButtonPrimary from "shared/Button/ButtonPrimary";
// import SectionSliderCollections from "components/SectionSliderCollections";
// import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
// import HeaderFilterSearchPage from "components/HeaderFilterSearchPage";
// import Input from "shared/Input/Input";
// import ButtonCircle from "shared/Button/ButtonCircle";
import CardNFT from "components/CardNFT";

import { marketplace as marketplaceAddress } from '../utils/constants'
import marketplaceAbi from '../artifacts/marketplace.json'
import { getNft } from '../utils/getNFT'
import { useWeb3React } from "@web3-react/core";
import NcModal from "shared/NcModal/NcModal";

export interface PageSearchProps {
  className?: string;
}

const PageSearch: FC<PageSearchProps> = ({ className = "" }) => {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState(false)
  async function loadNFTs() {
    setLoadingState(true) 
    /* create a generic provider and query for unsold market nfts */      
    const web3Modal = new Web3Modal({
        network: 'mainnet',
        cacheProvider: true,
      })
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(marketplaceAddress, marketplaceAbi.abi, signer)
      const data = await contract.fetchMarketItems()
      // console.log('===data', data)
    /*
    *  map over nfts returned from smart contract and format 
    *  them as well as fetch their token metadata
    */
    const nfts = await Promise.all(data.map(async (i: { tokenId: { toNumber: () => any; }; price: { toString: () => ethers.BigNumberish; }; seller: any; owner: any; }) => {
      const item = getNft(i)
      return item
    }))

    setNfts(nfts as any)
    // console.log('===nfts', nfts)
    setLoadingState(false) 
  }

  useEffect( () => {
  // Load onchain data
      loadNFTs()
  }, [])


  const  renderContent = () => {
    return (

        <form action="#">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
        ✨🔮 Wrong network 🔮✨ 
        </h3>
        <span className="text-l flex mt-10">
           Please connect with Polygon 
        </span>
        <div className="mt-4 space-x-3">
          {/* <ButtonPrimary onClick={handleClickSubmitForm} type="submit">
            Delete
          </ButtonPrimary> */}
          
        </div>
      </form>
    )
  }


  const {
    account, 
    chainId
  } = useWeb3React()
  console.log('chainid', chainId)
const [wrongChain, setWrongChain] = useState(false)
const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    if (chainId!== 137) {
      setWrongChain(true)
      setShowModal(true)

    }
  }, [chainId])


  return (
    <div className={`nc-PageSearch  ${className}`} data-nc-id="PageSearch">
      <Helmet>
        <title>token gates marketplace</title>
      </Helmet>

      <div
        className={`nc-HeadBackgroundCommon h-24 2xl:h-28 top-0 left-0 right-0 w-full bg-primary-50 dark:bg-neutral-800/20 `}
        data-nc-id="HeadBackgroundCommon"
      />
      {/* <div className="container"> */}
        {/* <header className="max-w-2xl mx-auto -mt-10 flex flex-col lg:-mt-7">
          <form className="relative w-full " method="post">
            <label
              htmlFor="search-input"
              className="text-neutral-500 dark:text-neutral-300"
            >
              <span className="sr-only">Search all icons</span>
              <Input
                className="shadow-lg border-0 dark:border"
                id="search-input"
                type="search"
                placeholder="Type your keywords"
                sizeClass="pl-14 py-5 pr-5 md:pl-16"
                rounded="rounded-full"
              />
              <ButtonCircle
                className="absolute right-2.5 top-1/2 transform -translate-y-1/2"
                size=" w-11 h-11"
                type="submit"
              >
                <i className="las la-arrow-right text-xl"></i>
              </ButtonCircle>
              <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                </svg>
              </span>
            </label>
          </form>
        </header> */}
      {/* </div> */}

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <main>
          {/* FILTER */}
          {/* <HeaderFilterSearchPage /> */}

          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
            {nfts.reverse().map((nft, index) => (
              <CardNFT key={index} nft={nft}/>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            {/* <Pagination /> */}
            {/* <ButtonPrimary loading>Show me more</ButtonPrimary> */}
          </div>
        </main>

        {/* === SECTION 5 === */}
        {/* <div className="relative py-16 lg:py-28"> */}
          {/* <BackgroundSection /> */}
          {/* <SectionSliderCollections /> */}
        {/* </div> */}

        {/* SUBCRIBES */}
        {/* <SectionBecomeAnAuthor /> */}
      </div>

      {
       <NcModal
         renderTrigger={() => null}
         isOpenProp={showModal}
         renderContent={renderContent}
         contentExtraClass="max-w-md"
         onCloseModal={() => setShowModal(false)}
         modalTitle="Sign in with wallet"
       />
      }
    </div>
  );
};

export default PageSearch;
