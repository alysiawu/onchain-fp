import Label from "components/Label/Label";
import { v4 as uuidv4 } from 'uuid';
import React, { FC, useState } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { TwitterShareButton, TwitterIcon } from "react-share";
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
import { useFirebaseContext } from "contexts/firebaseContext";
import Textarea from "shared/Textarea/Textarea";
import { trackEvent } from "utils/tracking";


export interface PageUploadItemProps {
  className?: string;
}


// https://ipfs.infura.io:5001/api/v0/add?pin=false
// const client = ipfsHttpClient({ 
//   url: 'https://ipfs.infura.io:5001/api/v0'
// })

const PostReferral: FC<PageUploadItemProps> = ({ className = "" }) => {
  // const navigate = useNavigate()

  const {
    email, 
    photoUrl,
    displayName,
    uid,
    signInWithGoogle
  } = useFirebaseContext()

  trackEvent('PostReferralPage_Visted', {
    email, 
    uid,
  })
  
  const [showMintingModal, setShowMintingModal] = useState(false)
  const [showMintSuccessModal, setShowMintSuccessModal] = useState(false)
  const [mintSuccess, setMintSuccess] = useState(false)
  const { width, height } = useWindowSize()
  const [metadataIpfsUrl, setMetadataIpfsUrl] = useState<string>()
  const [selected, setSelected] = useState(PFPs[1]);
  const [formInput, updateFormInput] = useState({ 
    chain: 'polygon',
    title: '', 
    primaryRole: 'engineering', 
    company: '',
    h1b: 'yes',
    name: '',
     //TODO dropdown
    jobFamily: '', 
    //TODO dropdown
    location: 'remote',
    email: email || '',
    jobDescription: '',
    video: '',
    bountyAmount: '',

    Linkedin: '',
    typeofPosition: 'fulltime',
    price: '', 
  })

  const [errorInput, updateErrorInput] = useState({ 
    title: false, 
    email: false,
    primaryRole: false, 
    company: false,
    h1b: false,
    name: false,
    jobDescription: false,
    video: false,
    location: false,
    bountyAmount: false,
    Linkedin: false,
    typeofPosition: false,
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

  
  // async function uploadMetadataToIPFS() {
  //   const { 
  //     title, 
  //     primaryRole, 
  //     company,
  //      //TODO dropdown
  //     jobFamily, 
  //     //TODO dropdown
  //     location,
  //     jobDescription,
  //     video,
  //     bountyAmount,
  //     Linkedin,
  //     typeofPosition,
  //     price,

  //     // image,
  //   } = formInput
  //   console.log('---formInput', formInput)
  //   if (!title || !primaryRole || !jobDescription) return
  //   /* first, upload to IPFS */
  //   const data = JSON.stringify({
  //     title, 
  //     primaryRole, 
  //      //TODO dropdown
  //     jobFamily, 
  //     //TODO dropdown
 
  //     jobDescription,
  //     video,
  //     location,
  //     Linkedin,
  //     typeofPosition,
  //     price,
  //     image: selected.featuredImage
  //   })
  //   try {
  //     const added = client && await client.add(data)
  //     const url = added && `https://ipfs.infura.io/ipfs/${added.path}`
  //     /* after file is uploaded to IPFS, return the URL to use it in the transaction */

  //     setMetadataIpfsUrl(url)
  //     return url
  //   } catch (error) {
  //     console.log('Error uploading file: ', error)
  //   }  
  // }

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



  const submitReferralBounty = async () => {
    // console.log('formInput', formInput)
    // const referralOppoId = uuidv4()
    trackEvent('PostReferralPage_Submitting', {
     
      uid,
      ...formInput
    })

    const { 
      title, 
      primaryRole, 
      company,
      h1b,
      name,
      location,
      jobDescription,
      video,
      bountyAmount,
      Linkedin,
      email,
      typeofPosition,
      // price,

      // image,
    } = formInput
    console.log('---formInput', formInput)

    // if (!company) {
    //     updateErrorInput({
    //       ...errorInput,
    //       company: true
    //     })
    //     return
    //   } else {
    //     updateErrorInput({
    //       ...errorInput,
    //       company: false
    //     })
    //   }


    // if (!h1b) {
    //   updateErrorInput({
    //     ...errorInput,
    //     h1b: true
    //   })
    //   return
    // } else {
    //   updateErrorInput({
    //     ...errorInput,
    //     h1b: false
    //   })
    // }


    // if (!title) {
    //   trackEvent('PostReferralTitle_Missing', {
     
    //     uid,
    //     ...formInput
    //   })

    //   updateErrorInput({
    //     ...errorInput,
    //     title: true
    //   })
    //   return
    // }
    
    // // h1b
    // if (!primaryRole) {
    //   updateErrorInput({
    //     ...errorInput,
    //     primaryRole: true
    //   })
    //   return
    // }
    // if (!jobDescription) {
    //   updateErrorInput({
    //     ...errorInput,
    //     jobDescription: true
    //   })
    //   return
    // }
    if (!location) {
        updateErrorInput({
          ...errorInput,
          location: true
        })
        return
    }

      // if (!video) {
      //   updateErrorInput({
      //       ...errorInput,
      //       video: true
      //     })
      //     trackEvent('PostReferralVideo_Missing', {
     
      //       uid,
      //       ...formInput
      //     })

      //     return

      // }
    // if (!Linkedin) {
    //   updateErrorInput({
    //     ...errorInput,
    //     Linkedin: true
    //   })
    //   return
    // }


    // if (!typeofPosition) {
    //   updateErrorInput({
    //     ...errorInput,
    //     typeofPosition: true
    //   })
    //   return
    // }

    // if (!name) {
    //   updateErrorInput({
    //     ...errorInput,
    //     name: true
    //   })
    //   return
    // }

    // if (!email) {
    //   trackEvent('PostReferralEmail_Missing', {
     
    //     uid,
    //     ...formInput
    //   })

    //   updateErrorInput({
    //     ...errorInput,
    //     email: true
    //   })
    //   return
    // }


    // if (!bountyAmount) {
    //   updateErrorInput({
    //     ...errorInput,
    //     bountyAmount: true
    //   })
    // }


 


    const db = getDatabase();
    // console.log('database', db)
    // READ DB
    // const starCountRef = ref(db, 'users/' + 1);

    // onValue(starCountRef, (snapshot) => {
    //   const data = snapshot.val();
    //   console.log('------data', data)
    //   // updateStarCount(postElement, data);
    // });

    const writeUserData = (
        title: string, 
        jobDescription: string, 
        video: string, 
        bountyAmount: string, 
        location: string, 
        primaryRole: string, 
         typeofPosition: string,
         h1b: string,
         company: string,
      email: string,
      name: string,
      ) => {
          console.log('---primaryRole', primaryRole)
    //   const userId = `${title.trim()}-${primaryRole}-${name}`
    const referralOppoId = uuidv4()
      set(ref(db, 'referralOppos/' + referralOppoId), {
        title,
        jobDescription,
        company,
        location,
        // Linkedin,
        primaryRole,
        h1b,
        typeofPosition,
        video,
        bountyAmount,
        name,
        email

      });
    }

    await writeUserData(
      title,
      jobDescription,
      video,
      bountyAmount,
      location,
      primaryRole,
    //   Linkedin,
      typeofPosition,
      h1b,
      company,
      email,
      name,
    )

    console.log('ppp')
    trackEvent('PostReferralPage_Success', {
     
      uid,
      ...formInput
    })

    
    setMintSuccess(true)


  }
//   https://cryptocurrencyjobs.co/post-a-job/

// const dropdownPositon = 'down'
  return (
    <div
      className={`nc-PageUploadItem ${className}`}
      data-nc-id="PageUploadItem"
    >
      <Helmet>
        <title>Refer2Earn | Post a Referral Bounty</title>
      </Helmet>

      {!mintSuccess && 
      <div className="container">
        <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold">
              {/* Turn your Salary info NFT, and earn passive income selling it */}
              {/* Hiring is the most important thing you do.  */}
              Post a Referral Bounty
              {/* Build your first skill NFT */}
            </h2>
            <h2 className="text-3xl sm:text-4xl font-semibold">
              {/* Turn your Salary info NFT, and earn passive income selling it */}
              {/* $0 now, $299 after 08/28/22 */}
              {/* Build your first skill NFT */}
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
              
              {/* Let us help you find your next great hire.

              Activate our exclusive private talents network within Web三DAO, and TalentNationDAO, to get inbounds for your tech candidates. questions? email support: hello@futureprotocol.co */}
            </span>
          </div>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8">
            {/* <div> */}
              <h3 className="text-lg sm:text-2xl font-semibold">
                Tell us about the position
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
            <FormItem label="Company *">
              <Input 
                // style={{
                //   border: '0.5px solid red'
                // }}
                className={errorInput.company ? 'error' : ''}
                defaultValue=""
                placeholder=""
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      company: e.target.value,
                  })
                  }
                }
              />
            </FormItem>
            <FormItem label="H1B *">

            <select  
                id="h1b"
                name="h1b"
                className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-neutral-500 dark:text-neutral-300  l:text-l rounded-md"
                // value={formInput.location}
                onClick={(e) => {
                    updateFormInput({
                      ...formInput,
                      h1b: (e.target as HTMLInputElement).value,
                  })
                
                }}
              >
                {[
               
             
                {
                  name: 'Yes',
                  id: 'yes'
              },
              {
                name: 'No',
                id: 'no'
            },
            
            ].map(jf => {
                  return <option
                    key={jf.id}
                  >{
                    jf.name}</option>
                })}
                
              </select>

              {/* <Input 
                // style={{
                //   border: '0.5px solid red'
                // }}
                className={errorInput.h1b ? 'error' : ''}
                defaultValue=""
                placeholder=""
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      h1b: e.target.value,
                  })
                  }
                }
              /> */}
            </FormItem>
            <FormItem label="Position *">
              <Input 
                // style={{
                //   border: '0.5px solid red'
                // }}
                className={errorInput.title ? 'error' : ''}
                defaultValue=""
                placeholder=""
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
    
            <FormItem label="Function *">
              {/* <Input 
                className={errorInput.primaryRole ? 'error' : ''}
                defaultValue="" 
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      primaryRole: e.target.value,
                  })
                  }
                }
              /> */}
            <select  
                id="primaryRole"
                name="primaryRole"
                className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-neutral-500 dark:text-neutral-300  l:text-l rounded-md"
                // value={formInput.location}
                onClick={(e) => {
                    updateFormInput({
                      ...formInput,
                      primaryRole: (e.target as HTMLInputElement).value,
                  })
                
                }}
              >
                {[
               
             
                {
                    name: 'Engineering',
                    id: 'Engineering'
                },
                {
                    name: 'Design',
                    id: 'Design'
                },
                {
                    name: 'Marketing',
                    id: 'Marketing'
                },
                {
                    name: 'Operation',
                    id: 'Operation'
                },
                {
                  name: 'Sales',
                  id: 'Sales'
              },
              {
                name: 'Customer Support',
                id: 'Customer'
            },
              {
                name: 'Other',
                id: 'Other'
            },
            ].map(jf => {
                  return <option
                    key={jf.id}
                  >{
                    jf.name}</option>
                })}
                
              </select>
              
            </FormItem>
      
            <FormItem label="Location*">
              <Input 
                className={errorInput.typeofPosition ? 'error' : ''}
               type='text'
                defaultValue="" 
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      typeofPosition: e.target.value,
                  })
                  }
                }
              />
            {/* <select
                id="typeofPosition"
                name="typeofPosition"
                className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-neutral-500 dark:text-neutral-300  l:text-l rounded-md"
                // value={formInput.location}
                onClick={(e) => {
                    updateFormInput({
                      ...formInput,
                      typeofPosition: (e.target as HTMLInputElement).value,
                  })
                
                }}
              >
                {[
                {
                    name: 'Full time',
                    id: 'fulltime'
                },
                {
                    name: 'Part time',
                    id: 'parttime'
                },
                {
                    name: 'Contract',
                    id: 'Contract'
                },
                {
                    name: 'Freelance',
                    id: 'Freelance'
                },
                {
                    name: 'Internship',
                    id: 'Internship'
                },
            ].map(jf => {
                  return <option
                    key={jf.id}
                  >{
                    jf.name}</option>
                })}
                
              </select> */}

              
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
                    jobFamily: item.title,
                })
                }}
              />
            </FormItem> */}

{/* 
            <FormItem label="Job Description *">
              <Input 
                className={errorInput.Linkedin ? 'error' : ''}
                type='text'
                defaultValue="" 
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      Linkedin: e.target.value,
                  })
                  }
                }
              />
            </FormItem>
            */}

            <h3 className="text-lg sm:text-2xl font-semibold">
              {/* Work Experience and Location */}
            </h3>
            <FormItem label="Remote">
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
                {[
                    {
                        name: 'On Site',
                        id: 'onsite'
                    },
                    {
                        name: 'Remote',
                        id: 'Remote'
                    },
                    {
                        name: 'Hybrid',
                        id: 'Hybrid'
                    }
                ].map(jf => {
                  return <option
                    key={jf.id}
                  >{
                    jf.name}</option>
                })}
                
              </select> 

           </FormItem>
            {/* <FormItem label="Job Description (Optional)">
              <Textarea 
                className={errorInput.jobDescription ? 'error' : ''}
                defaultValue="" 
                // type='text'
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      jobDescription: e.target.value,
                  })
                  }
                }
              />
            </FormItem> */}

            {/* <FormItem label="Video intro of the role (optional)">
           
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400"> */}
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
              {/* Grab the embed url like 
              https://www.youtube.com/embed/eQ2TaqzClPk or https://www.loom.com/share/e66669841b264c4ca83e7013e96e0f0c */}

            {/* </span> */}

            {/* <span className="block mt-3 text-neutral-500 dark:text-neutral-400"> */}
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
              
              {/* Research revealed that website visitors prefer to learn information and details via video. */}

            {/* </span> */}

            {/* <span className="block mt-3 text-neutral-500 dark:text-neutral-400"> */}
            
{/* Specifically within Recruitment Marketing, job postings that include video garner 12% more views than postings without, according to CareerBuilder. */}

            {/* </span>

            <span className="block mt-3 text-neutral-500 dark:text-neutral-400"> */}
            
{/* Videos within job descriptions can also help drive a 34% higher application rate, the CareerBuilder survey found. */}
            {/* </span> */}

              {/* <Input 
                className={errorInput.video ? 'error' : ''}
                defaultValue="" 
                // type='text'
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      video: e.target.value,
                  })
                  }
                }
              />
            </FormItem> */}
            {/* https://www.loom.com/share/0104e2bb56c44739af9073a21f9e3d43 */}
            {/* {formInput.video}  */}

            {/* <iframe src='https://www.loom.com/share/0104e2bb56c44739af9073a21f9e3d43' /> */}
            { formInput.video &&  
            
            // <div 
            
            // style={{ position: 'relative', paddingBottom: '133.33333333333331%', height: 0}}
            
            // >
              
             <iframe 
            // src="https://www.loom.com/embed/0104e2bb56c44739af9073a21f9e3d43" 
            src={formInput.video.replace('share', 'embed')}
            frameBorder="0" 
            // webkitallowfullscreen 
            // mozallowfullscreen 
            // allowfullscreen 
            
            style={{
              // position: 'absolute',
            //  top: 0,
            //   left: 0,
               width: '800px',
                height: '900px'
              }}
            >
              
              
              </iframe>
              
              // </div>
              
              }

            <FormItem label="Name *">
              <Input 
                className={errorInput.name ? 'error' : ''}
                defaultValue="" 
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      name: e.target.value,
                  })
                  }
                }
              />
            </FormItem>

            <FormItem label="Email *">
              <Input 
                className={errorInput.email ? 'error' : ''}
                defaultValue="" 
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      email: e.target.value,
                  })
                  }
                }
              />
            </FormItem>


        
            <FormItem label="Referral Bonus (if your company offer any, we are asking just for information gathering)">
              <Input 
                className={errorInput.name ? 'error' : ''}
                defaultValue="" 
                type='number'
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      bountyAmount: e.target.value,
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
              {/* <Label>Choose PFP</Label>
              <div className="text-neutral-500 dark:text-neutral-400 text-sm">
                Choose an cover PFP for your TC NFT
              </div> */}
  
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
            <MySwitch 
            
              label="I agree to receive news and updates"
              desc=""
              enabled 
            />

            {/* ---- */}
          

            {/* ---- */}
       

     
            {/* ---- */}
            <div className="pt-2 flex flex-col sm:flex-row space-y-3 sm:space-y-0 space-x-0 sm:space-x-3 ">
              {/* <a className="flex-1"
                 onClick={() => listNFTForSale()}
              >Done</a> */}

<a style={{background: '#19FDA6', padding: '10px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} onClick={() => {
  submitReferralBounty()
}} >Done</a>

              {/* <ButtonSecondary className="flex-1">Preview item</ButtonSecondary> */}
            </div>
          </div>
        </div>
      </div>
      }
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
                Thanks for providing referral! We will matched candiates to your email.
              </h3>
              <h3 className="text-lg sm:text-2xl font-semibold">
                Interesting in owning and managing your on chain professional identity?
              </h3>
              <h3 className="text-lg sm:text-2xl font-semibold">
              <a style={{background: '#19FDA6', padding: '12px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'/connect-wallet'} >Sign in with wallet</a>
              </h3>
              <div></div>
              <h3 className="text-lg sm:text-2xl font-semibold">
              <a style={{background: '#19FDA6', padding: '12px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'/claim'} >Claim your pseudonym</a>
              </h3>
              <div></div>
              {/* <h3 className="text-lg sm:text-2xl font-semibold"> */}
              {/* <a style={{background: '#19FDA6', padding: '12px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}}> 
              
           /claim

            
              
                
                </a> */}
                ✨ Share on twitter here
                <span style={{paddingTop: '10px'}}>

                    <TwitterShareButton
                    style={{background: 'none', margin: '1rem', marginTop: '10px'}}
                      title={`I can refer for this postion at ${formInput.title} at ${formInput.company}`}
                      url={'https://www.futureprotocol.co/referral'}
                      hashtags={["futureprotocol", "talentnation", 'referral2earn', 'professionalidentity', 'missiondrivencompany']}
                    >
                      <TwitterIcon size={32} round />
                
                    </TwitterShareButton>
                </span>
               
              {/* </h3> */}

              {/* <h3 className="text-lg sm:text-2xl font-semibold">
              <a style={{background: '#19FDA6', padding: '12px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'https://discord.gg/bGq3zG7t77'} >Join our Discord Community</a>
              </h3> */}


             
          </div>
          <div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8" style={{marginTop: '200px'}}>
         

            {/* <h3 className="text-lg sm:text-2xl font-semibold">
              ✨ Stand out by pitching yourself to your dream company ?
            </h3>

            <h3 className="text-lg sm:text-2xl font-semibold">
              <a style={{background: '#19FDA6', padding: '12px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'/talent-pitch'}> Start Here</a>
            </h3> */}
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

export default PostReferral;
