import Label from "components/Label/Label";
import React, { FC, useState } from "react";
// import { getDatabase, ref, set, onValue } from "firebase/database";
import Airtable from 'airtable';
// import Web3Modal from 'web3modal'
// import { useNavigate } from 'react-router-dom';
// import { ethers } from 'ethers'
import { create as ipfsHttpClient, IPFSHTTPClient } from 'ipfs-http-client'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import {
  marketplace as marketplaceAddress, 
  authorization,
//   JobFamilies,
//   Companies,
//   Locations,
  PFPs
} from '../utils/constants'
import twitter from "images/socials/twitter.svg";
import loading from 'images/loading.gif'
// import marketplaceAbi from '../artifacts/marketplace.json'

// import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
// import Textarea from "shared/Textarea/Textarea";
import { Helmet } from "react-helmet";
import FormItem from "components/FormItem";
// import { RadioGroup } from "@headlessui/react";
// import { nftsImgs } from "contains/fakeData";
import MySwitch from "components/MySwitch";
// import ButtonSecondary from "shared/Button/ButtonSecondary";
// import NcImage from "shared/NcImage/NcImage";
// import NcDropDown, { NcDropDownItem } from "shared/NcDropDown/NcDropDown";
import NcModal from "shared/NcModal/NcModal";
import { useFirebaseContext } from "contexts/firebaseContext";
import { trackEvent } from "utils/tracking";
import { TwitterIcon, TwitterShareButton } from "react-share";
import Textarea from "shared/Textarea/Textarea";


export interface PageUploadItemProps {
  className?: string;
}

// https://ipfs.io/ipfs/QmTV5TvgzvYd3PDtcTx1iTbxYG1MDrhnjxVKwehfj6aeEP?filename=6.png
// const plans = [
//   {
//     name: "Crypto Legend - Professor",
//     featuredImage: 'https://ipfs.io/ipfs/QmTV5TvgzvYd3PDtcTx1iTbxYG1MDrhnjxVKwehfj6aeEP?filename=6.png',
//   },
//   {
//     name: "Crypto Legend - Professor",
//     featuredImage: 'https://ipfs.io/ipfs/Qmad4u7F4Z6j1zMaqLHGH7ierJ8yZ2GY5ayJK4xAVqVmvu?filename=10.png',
//   },
//   {
//     name: "Crypto Legend - Professor",
//     featuredImage: 'https://ipfs.io/ipfs/QmQyaoEyL2idHSgRyJ1AaQ5FHC6jTeTkWnRFnsqNkMPrVh?filename=14.png',
//   },
//   {
//     name: "Crypto Legend - Professor",
//     featuredImage: 'https://ipfs.io/ipfs/QmPzE1FfPw9FqDLhz3ZbNoM8Bxrx7jihTG3wwrDMfviGMa?filename=42.png',
//   },
//   {
//     name: "Crypto Legend - Professor",
//     featuredImage: 'https://ipfs.io/ipfs/QmSA3e7swDUDHnL22JUnQg74ZXAv68fsC3PQ82cwLq8t78?filename=38.png',
//   },
//   {
//     name: "Crypto Legend - Professor",
//     featuredImage: 'https://ipfs.io/ipfs/QmeirssBsSUGZt53M3SZNVv73VcLkhErQ9x9bwE6RtpPPX?filename=31.png',
//   },
// ];



// https://ipfs.infura.io:5001/api/v0/add?pin=false
// const client = ipfsHttpClient({ 
//   url: 'https://ipfs.infura.io:5001/api/v0'
// })



const RoleBasedReferralRequest: FC<PageUploadItemProps> = ({ className = "" }) => {
  // const navigate = useNavigate()
  var base = new Airtable({apiKey: 'keyDr90Ny9XSuy819'}).base('appfZedSta1s4n06f');
  const {
    email, 
    photoUrl,
    displayName,
    uid,
    signInWithGoogle
  } = useFirebaseContext()
  

  trackEvent('QuickApplyPage_Visted', {
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


     //TODO dropdown
    jobFamily: '', 
    //TODO dropdown
    location: '',
    // email,


    price: '', 
// 
    name: '', 
    company: '',
    role: '',
    jdLink: '',
    h1b: 'no',
    linkToResume: '',
    Linkedin: '',
    whoVouch: '',
    email: email || '',
    phone: '', 
    talentPitch: '',
    featured: 'yes',
  })

  const [errorInput, updateErrorInput] = useState({ 
    name: false, 
    phone: false, 
    email: false,
    Linkedin: false,
    linkToResume: false,
    talentPitch: false,
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
      name, 
      phone, 
       //TODO dropdown
      jobFamily, 
      //TODO dropdown
      location,
      email,
      Linkedin,
      linkToResume,
      price,

      // image,
    } = formInput
    console.log('---formInput', formInput)
    if (!name || !phone || !email) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, 
      phone, 
       //TODO dropdown
      jobFamily, 
      //TODO dropdown
      location,
      email,
      Linkedin,
      linkToResume,
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

  const submitRoleBasedReferralRequest = async () => {

    const { 
      name, 
      phone, 
      talentPitch,
      // location,
      email,
      Linkedin,
      linkToResume,
      // price,

      // image,
    } = formInput

    trackEvent('RoleBasedReferralRequestPage_Submitting', {
      uid,
      ...formInput
    })

    if (!name) {
      updateErrorInput({
        ...errorInput,
        name: true
      })
      return
    }

    if (!phone) {
      updateErrorInput({
        ...errorInput,
        phone: true
      })
      return
    }
    if (!email) {
      updateErrorInput({
        ...errorInput,
        email: true
      })
      return
    }
    if (!Linkedin) {
      updateErrorInput({
        ...errorInput,
        Linkedin: true
      })
      return
    }
    if (!linkToResume) {
      updateErrorInput({
        ...errorInput,
        linkToResume: true
      })
      return
    }

    if (!talentPitch) {
      updateErrorInput({
        ...errorInput,
        talentPitch: true
      })
      return
    }
    
    // base('Web3 Jobs').find(airtableId, function(err, record) {
        // if (err) { console.error(err); return; }
  
        // const applicants = JSON.parse((record.get('Applicants') || "[]"))
        
        // applicants.push(webSanNFT)
        console.log('--formInput', formInput)
        base('Role based referral request').create([
            {
              "fields": {
                  "Name": formInput.name,
                  "Role": formInput.role,
                  "Company": formInput.company,
                  "TalentPitch": formInput.talentPitch,
                  "JDLink": formInput.jdLink,
                  "H1b": formInput.h1b ,
                  "Resume": formInput.linkToResume,
                  "Who can vouch for you": formInput.whoVouch,
                  "Email": formInput.email,
                  "Phone": formInput.phone,
                //   "Who can vouch for you": formInput.whoVouch,
                  "Featured": formInput.featured,

              }
            },
            // {
            //   "fields": {}
            // }
          ], function(err, records) {
            if (err) {
              console.error(err);
              return;
            }
            records && records.forEach(function (record) {
              console.log(record.getId());
            });
          });
          

    // });


    // const db = getDatabase();
    // // console.log('database', db)
    // // READ DB
    // // const starCountRef = ref(db, 'users/' + 1);

    // // onValue(starCountRef, (snapshot) => {
    // //   const data = snapshot.val();
    // //   console.log('------data', data)
    // //   // updateStarCount(postElement, data);
    // // });

    // const writeUserData = (
    //   name: string, email: string, phone: string, Linkedin: string, linkToResume: string,
    //   talentPitch: string
    //   ) => {
    //   const userId = `${name.trim()}${phone}`

    //   set(ref(db, 'talents/' + userId), {
    //     name,
    //     email,
    //     Linkedin,
    //     phone,
    //     linkToResume,
    //     talentPitch,
    //   });
    // }

    // await writeUserData(
    //   name,
    //   email,
    //   phone,
    //   Linkedin,
    //   linkToResume,
    //   talentPitch
    // )


    trackEvent('RoleBasedReferralRequestPage_Success', {
      uid,
      ...formInput
    })

    setMintSuccess(true)


  }


// const dropdownPositon = 'down'
  return (
    <div
      className={`nc-PageUploadItem ${className}`}
      data-nc-id="PageUploadItem"
    >
      <Helmet>
        <title>Request an internal referral for a job</title>
      </Helmet>

      {!mintSuccess && 
      <div className="container">
        <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold">
              {/* Turn your Salary info NFT, and earn passive income selling it */}
              {/* Do you have what it takes to join Talent Nation? */}
              Request an internal referral for a job, we will match you with an industry insider to help you get the job you want!
              {/* Build your first skill NFT */}
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
                      * are required
            </span>
          </div>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8">
            {/* <div> */}
              <h3 className="text-lg sm:text-2xl font-semibold">
                {/* Company & Title Information */}
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
            <FormItem label="Name *">
              <Input 
                // style={{
                //   border: '0.5px solid red'
                // }}
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
            <FormItem label="Company *">
              <Input 
                // style={{
                //   border: '0.5px solid red'
                // }}
                // className={errorInput.company ? 'error' : ''}
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
            </FormItem>

            <FormItem label="Role *">
              <Input 
                // style={{
                //   border: '0.5px solid red'
                // }}
                // className={errorInput.role ? 'error' : ''}
                defaultValue="" 
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      role: e.target.value,
                  })
                  }
                }
              />
            </FormItem>

            <FormItem label="Job Description Link *">
              <Input 
                // style={{
                //   border: '0.5px solid red'
                // }}
                // className={errorInput.jdLink ? 'error' : ''}
                defaultValue="" 
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      jdLink: e.target.value,
                  })
                  }
                }
              />
            </FormItem>

            <FormItem label="Need visa support? *">
              
            <select
                        id="location"
                        name="location"
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
                        id: 'yes',
                        name: 'Yes'
                    },
                    {
                        id: 'no',
                        name: 'No'
                    }
                ].map(jf => {
                  return <option
                    key={jf.id}
                  >{
                    jf.name}</option>
                })}
                
              </select>
            </FormItem>


            <FormItem label="Link to Resume *">
              <Input 
                className={errorInput.linkToResume ? 'error' : ''}
               type='text'
                defaultValue="" 
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      linkToResume: e.target.value,
                  })
                  }
                }
              />
            </FormItem>
    
            <FormItem label="Linkedin *">
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
            
            <FormItem label="Who can be your reference, advocate (optional)">
              <Input 
                // className={errorInput.whoVouch ? 'error' : ''}
                type='text'
                defaultValue="" 
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      whoVouch: e.target.value,
                  })
                  }
                }
              />
            </FormItem>

            <FormItem label="Email *">
              <Input 
                className={errorInput.email ? 'error' : ''}
                defaultValue="" 
                type='text'
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

            <FormItem label="Phone Number ">
              <Input 
                className={errorInput.phone ? 'error' : ''}
                defaultValue="" 
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      phone: e.target.value,
                  })
                  }
                }
              />
            </FormItem>
{/* 
            <FormItem label="whoVouch *">
              <Input 
                className={errorInput.whoVouch ? 'error' : ''}
                type='text'
                defaultValue="" 
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      whoVouch: e.target.value,
                  })
                  }
                }
              />
            </FormItem> */}
      {/* story */}
            <FormItem label="Your referrer's time is precious as well, tell us why you are right for the job, text and / or vide link, link to you porfolio, github, tell us your story *">
              <Textarea 
                className={errorInput.talentPitch ? 'error' : ''}
                defaultValue="" 
                // type='text'
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      talentPitch: e.target.value,
                  })
                  }
                }
              />
            </FormItem>

            <FormItem label="Feature in our talent blog which we share with our partner companies, this will help you get multiple offers">
        

  

                 <select
                        id="location"
                        name="location"
                        className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-neutral-500 dark:text-neutral-300  l:text-l rounded-md"
                        // value={formInput.location}
                        onClick={(e) => {
                            updateFormInput({
                            ...formInput,
                            featured: (e.target as HTMLInputElement).value,
                        })
                        
                        }}
                    >
                {[
                    {
                        id: 'yes',
                        name: 'Yes'
                    },
                    {
                        id: 'no',
                        name: 'No'
                    }
                ].map(jf => {
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
        
           

            <h3 className="text-lg sm:text-2xl font-semibold">
              {/* Work Experience and Location */}
            </h3>
            {/* <FormItem label="Location"> */}
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

              {/* <select
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
                
              </select> */}

            {/* </FormItem> */}
       

      
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
  submitRoleBasedReferralRequest()
}} >Submit</a>

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
                Thanks for contacting us! We will get in touch with you shortly.
              </h3>

              ✨ Share on twitter  here
                <span style={{paddingTop: '10px'}}>

                    <TwitterShareButton
                    style={{background: 'none', margin: '1rem', marginTop: '10px'}}
                      title={" https://www.futureprotocol.co"}
                      url={'https://www.futureprotocol.co/request-a-referral'}
                      hashtags={["futureprotocol", "talentnation", "rewritehiring", 'jobmarket', 'blockchain']}
                    >
                      <TwitterIcon size={32} round />
                
                    </TwitterShareButton>
                </span>


              <h3 className="text-lg sm:text-2xl font-semibold">
                Interesting in owning and managing your on chain professional identity?
              </h3>
              <h3 className="text-lg sm:text-2xl font-semibold">
              <a style={{background: '#19FDA6', padding: '12px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'/connect-wallet'} >Sign in with wallet</a>
              </h3>

              <h3 className="text-lg sm:text-2xl font-semibold">
              <a style={{background: '#19FDA6', padding: '12px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'https://discord.gg/bGq3zG7t77'} >Join our Discord Community</a>
              </h3>


             
          </div>
          <div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8" style={{marginTop: '200px'}}>
         

            <h3 className="text-lg sm:text-2xl font-semibold">
              ✨ Stand out by pitching yourself to your dream company ?
            </h3>

          <h3 className="text-lg sm:text-2xl font-semibold">
              <a style={{background: '#19FDA6', padding: '12px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'/talent-pitch'}> Start Here</a>
              </h3>
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

export default RoleBasedReferralRequest;
