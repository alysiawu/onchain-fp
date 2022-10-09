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
import NcImage from "shared/NcImage/NcImage";
import SectionHero3 from "components/SectionHero/SectionHero3";

export interface PageSearchProps {
  className?: string;
}

const PeopleSearch: FC<PageSearchProps> = ({ className = "" }) => {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState(false)

  const getExperts = async () => {
    
  }


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

const [creators, setCreators] = useState()
  const getCreators = () => {
    const airAPI = 'keyDr90Ny9XSuy819'
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: airAPI}).base('appHHO5bg6dBaqe46');
    let _creators: any[] = []
    const keys = [
      'name',
      'bio',
      'category',
      'email',
      'linkedin_url',
      'profile_image_url',
      'city',
      'country',
      'stripe'
    ]
    base('Creators').select({
        // Selecting the first 3 records in Grid view:
        // maxRecords: 3,
        view: "Grid view"
    }).eachPage(function page(records: any[], fetchNextPage: () => void) {
        // This function (`page`) will get called for each page of records.
      
        records.forEach(function(record) {
            console.log('Retrieved', record.get('name'));
            console.log('Retrieved', record.get('bio'));
            // _creators.push({
            //   name: record.get('name'),
            //   category: record.get('category'),

            // })
            const _data = {}
            keys.forEach(key => {
              // @ts-ignore
              _data[key] = record.get(key)
            })

            _creators.push(_data)
            console.log('---_creators', _creators)
            // @ts-ignore
            setCreators(_creators)
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
       

    }, function done(err: any) {
        if (err) { console.error(err); return; }
    });
   
  }


  useEffect( () => {
  // Load onchain data
      // loadNFTs()
      getCreators()
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
    if (chainId && chainId!== 137) {
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
       
       <div className="container relative mt-5 mb-5 sm:mb-5 lg:mt-20 lg:mb-32">
         
        <h2 className="font-semibold text-4xl md:text-4xl 2xl:text-5xl font-semibold xl:text-6xl  text-center !leading-[114%] mb-10" style={{
          fontSize: '2rem'
        }}>
       

          Talk to the right people - experts, creators and influencers


          
      </h2>
      <h2 className="font-semibold text-3xl md:text-4xl 2xl:text-5xl font-semibold xl:text-6xl  text-center !leading-[114%] mb-10" style={{
          fontSize: '2rem'
        }}>
       

          for the right information
          {/* Comment, React, and Curate NFTs */}

          
      </h2>
        </div>

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
 
        <main>
          {/* FILTER */}
          {/* <HeaderFilterSearchPage /> */}

          {/* LOOP ITEMS */}

      
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
        

            {/* @ts-ignore */}
            {creators && creators.map((creator, index) => (
                <div
                className={`nc-CardNFT relative flex flex-col group !border-0 [ nc-box-has-hover nc-dark-box-bg-has-hover ] ${className}`}
                data-nc-id="CardNFT"
              >
                <div className="relative flex-shrink-0 ">
                  <div>
                    <NcImage
                      containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0 rounded-3xl overflow-hidden z-0"
                      src={creator&& creator.profile_image_url}
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
                    {creator.name}
                {creator &&  creator.bio && <div className="flex justify-between">
                    {/* {renderAvatars()} */}
                  
                    {/* {nft && nft.metaData.jobFamily} */}
                    {/* <span className="text-neutral-700 dark:text-neutral-400 text-xs">
                      {Math.floor(Math.random() * 90) + 10} in stock
                    </span> */}
                     <a style={{background: '#19FDA6', padding: '10px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={creator.stripe} >Schedule a Call</a>
                  </div> }
                  {creator  && <div className="flex justify-between">
                 
                    {/* {nft.metaData.jobFamily}  {nft.metaData.yearOfExperience && <> - {nft.metaData.yearOfExperience} years of experience</>} */}
                    {creator.bio} 
                 
                  </div> }
                
            
                  {/* {nft && nft.metaData.title &&  <h2 className={`text-lg font-medium`}> */}
                  {/* Blockchain Engineer@Magic Eden Salary Data */}
                  {/* {nft.metaData.title}  */}
               
                  {/* { owned && nft?.metaData.base}
                  { owned && nft?.metaData.equity} */}
                  
                  {/* #{Math.floor(Math.random() * 1000) + 1000} */}
           
                  {/* {nft && nft.metaData.skillValueAdd &&  <h2 className={`text-lg font-medium`}> */}
                  {/* Blockchain Engineer@Magic Eden Salary Data */}
                  {/* {nft.metaData.skillValueAdd}  */}
               
                  {/* { owned && nft?.metaData.base}
                  { owned && nft?.metaData.equity} */}
                  
                  {/* #{Math.floor(Math.random() * 1000) + 1000} */}
       
                  <div className="w-2d4 w-full border-b border-neutral-100 dark:border-neutral-700"></div>
          
                  <div className="flex justify-between items-end ">
                    {/* <Prices labelTextClassName="bg-white dark:bg-neutral-900 dark:group-hover:bg-neutral-800 group-hover:bg-neutral-50" 
                      price={nft?.price || nft?.metaData.price}
                    /> */}
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

export default PeopleSearch;
