import React, { FC, useState, useEffect } from "react";
// import { ethers } from 'ethers'
import { getDatabase, ref, set, onValue } from "firebase/database";
// import Web3Modal from 'web3modal'
import Airtable from 'airtable';
import { Helmet } from "react-helmet";
// import BackgroundSection from "components/BackgroundSection/BackgroundSection";
// import Pagination from "shared/Pagination/Pagination";
// import ButtonPrimary from "shared/Button/ButtonPrimary";
// import SectionSliderCollections from "components/SectionSliderCollections";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
// import HeaderFilterSearchPage from "components/HeaderFilterSearchPage";
// import Input from "shared/Input/Input";
// import ButtonCircle from "shared/Button/ButtonCircle";
// import CardNFT from "components/CardNFT";

// import { marketplace as marketplaceAddress } from '../utils/constants'
// import marketplaceAbi from '../artifacts/marketplace.json'
// import { getNft } from '../utils/getNFT'
import CardReferral from "components/CardReferral";
import { trackEvent } from "utils/tracking";
import { useFirebaseContext } from "contexts/firebaseContext";
import { Attachment } from "airtable/lib/attachment";
import { Collaborator } from "airtable/lib/collaborator";
import Input from "shared/Input/Input";
import Pagination from "shared/Pagination/Pagination";

export interface PageSearchProps {
  className?: string;
}

var base = new Airtable({apiKey: 'keyDr90Ny9XSuy819'}).base('appfZedSta1s4n06f');

const ReferralOppos: FC<PageSearchProps> = ({ className = "" }) => {
  const [nfts, setNfts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [oppos, setOppos] = useState([])
  const [loadingState, setLoadingState] = useState(false)
  const [jobOpenings, setJobOpenings] = useState<{
    title: string; company: string; location: string; h1b: string; email: string; name: string;
    uuid: string;
  } []>()

//   async function loadNFTs() {
//     setLoadingState(true) 
//     /* create a generic provider and query for unsold market nfts */      
//     const web3Modal = new Web3Modal({
//         network: 'mainnet',
//         cacheProvider: true,
//       })
//       const connection = await web3Modal.connect()
//       const provider = new ethers.providers.Web3Provider(connection)
//       const signer = provider.getSigner()
//       const contract = new ethers.Contract(marketplaceAddress, marketplaceAbi.abi, signer)
//       const data = await contract.fetchMarketItems()
//       // console.log('===data', data)
//     /*
//     *  map over nfts returned from smart contract and format 
//     *  them as well as fetch their token metadata
//     */
//     const nfts = await Promise.all(data.map(async (i: { tokenId: { toNumber: () => any; }; price: { toString: () => ethers.BigNumberish; }; seller: any; owner: any; }) => {
//       const item = getNft(i)
//       return item
//     }))

//     setNfts(nfts as any)
//     // console.log('===nfts', nfts)
//     setLoadingState(false) 
//   }

const {
    email, 
    // photoUrl,
    // displayName,
    uid,
    signInWithGoogle
  } = useFirebaseContext()
  
    trackEvent('ReferralOpposPage_Visted', {
        email, 
        uid,
    })


const getJobOpeningsFromAirtable = () => {

    let data: { airtableId: string; title: string | number | boolean | Collaborator | readonly Collaborator[] | readonly string[] | readonly Attachment[] | undefined; company: string | number | boolean | Collaborator | readonly Collaborator[] | readonly string[] | readonly Attachment[] | undefined; uuid: string }[] = []
    base('Web3 Jobs').select({
      // Selecting the first 3 records in Grid view:
      maxRecords: 5000,
      view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
  
      try {

        records.forEach(function(record) {
       
            data.push({
                airtableId: record.id,
                title: record.get('Title'),
                company: record.get('Company'),
                uuid: record.id,
                // description: record.get('Description')
             
              })
          });
      }catch (e) {
        console.log('error inside eachPage => ',e)
      }
        // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
    // console.log('-----data', data)
    //   if (data) {
        //   @ts-ignore
        setJobOpenings(data)
        localStorage.setItem('jobOpenings', JSON.stringify(data))
    //   }  
  }, function done(err) {
      if (err) { console.error(err); return; }
  });
  
  
  }


  const getReferralOppos = () => {
    const db = getDatabase();
    const userRef = ref(db, 'referralOppos');

    onValue(userRef, (snapshot) => {
        // console.log('--snapshot', snapshot, snapshot.exists())
       
        // if (snapshot.exists()) {
        var data = snapshot.val();
        // console.log('--data', data)

    const _data = Object.keys(data).map(k => {
        const val = data[k]
        // console.log('--val', val)
        return {
            uuid: k,
            ...val
        }
    })
        setOppos(_data as unknown as any)
        localStorage.setItem('opps', JSON.stringify(_data))
      
    })
  }


  const onSearch = ({ searchTerm} : {searchTerm: string}) => {
    // console.log('---searchTerm', searchTerm)
    if (!searchTerm) {
      getReferralOppos()
    }
    const filtered = [...oppos].filter((oppo: {
      title: string;
      company: string;
      location: string;
      h1b: string;
      email: string;
      name: string;
      uuid: string;
  }) => { 
    const s = searchTerm.toLowerCase()
    
      return oppo?.title?.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || oppo?.company?.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    
    })

    console.log('---filtered', filtered)
    setOppos(filtered as unknown as any)

    const filteredAirtable = jobOpenings && jobOpenings.filter((oppo: {
      title: string;
      company: string;
      location: string;
      h1b: string;
      email: string;
      name: string;
      uuid: string;
  }) => { 
      return oppo?.title?.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || oppo?.company?.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    
    })

    setJobOpenings(filteredAirtable as unknown as any)
    // return filtered
  }


  useEffect( () => {
  // Load onchain data
    //   loadNFTs()
    getReferralOppos()
    getJobOpeningsFromAirtable()
    console.log('--getJobOpeningsFromAirtable', jobOpenings)
  }, [])

  if (!oppos) return (<></>)
  return (
    <div className={`nc-PageSearch  ${className}`} data-nc-id="PageSearch">
      <Helmet>
        <title>Your pass to the talentverse</title>
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
          {/* <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
            {nfts.map((nft, index) => (
              <CardNFT key={index} nft={nft}/>
            ))}
          </div> */}

  <h2 className="text-lg sm:text-2xl font-semibold mt-10">
        {/* <div className="mv-10"> */}
               
               {/* <a style={{background: '#19FDA6', padding: '12px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'https://discord.gg/WeRyZYkUD9'} >Join Our Community</a> */}
             {/* </div> */}

  </h2>
           
               <form action="#" className="relative">
              <Input
                type="search"
                placeholder="Search items"
                className="pr-10 w-full"
                sizeClass="h-[42px] pl-4 py-3"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                }}
                onKeyPress={(e) => {
                  // e.preventDefault()
                  // @ts-ignore
                  onSearch({ searchTerm: e.target.value})
                }}

                // onMouseUp={
                //   (e) => {
                //     setTimeout( () => {
                //       onSearch({ searchTerm: e.target.value})
                //     }, 100)
                   
                //   }
                // }

              />
              <span className="absolute top-1/2 -translate-y-1/2 right-3 text-neutral-500">
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
              {/* <input type="submit" hidden value="" /> */}
                      {/* <a style={{background: '#19FDA6', padding: '12px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'https://discord.gg/WeRyZYkUD9'} >Search</a> */}
            </form>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
        
            {jobOpenings && jobOpenings.map((oppo, index) => (
                <CardReferral key={index} oppo={oppo}/>
            ))}
          </div>



          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
            {oppos && [...oppos].map((oppo, index) => (
              <CardReferral key={index} oppo={oppo}/>
            ))}
            {/* {jobOpenings && jobOpenings.map((oppo, index) => (
                <CardReferral key={index} oppo={oppo}/>
            ))} */}
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
            {/* <ButtonPrimary loading>Show me more</ButtonPrimary> */}
             <div className="mv-10">
               
               <a style={{background: '#19FDA6', padding: '12px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'https://discord.gg/WeRyZYkUD9'} >Show more</a>
             </div>
          </div>
        </main>

        {/* === SECTION 5 === */}
        {/* <div className="relative py-16 lg:py-28"> */}
          {/* <BackgroundSection /> */}
          {/* <SectionSliderCollections /> */}
        {/* </div> */}

        {/* SUBCRIBES */}
        <SectionBecomeAnAuthor />
      </div>
    </div>
  );
};

export default ReferralOppos;
