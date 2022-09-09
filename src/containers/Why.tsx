
// import Label from "components/Label/Label";
import React, { FC, useState } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { create as ipfsHttpClient, IPFSHTTPClient } from 'ipfs-http-client'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import {
  marketplace as marketplaceAddress, 
  authorization,
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
import NcImage from "shared/NcImage/NcImage";
// import NcDropDown, { NcDropDownItem } from "shared/NcDropDown/NcDropDown";
import NcModal from "shared/NcModal/NcModal";
import { useFirebaseContext } from "contexts/firebaseContext";
import { trackEvent } from "utils/tracking";
import { TwitterIcon, TwitterShareButton } from "react-share";
import Textarea from "shared/Textarea/Textarea";

export interface PageUploadItemProps {
  className?: string;
}

const Why: FC<PageUploadItemProps> = ({ className = "" }) => {
  // const navigate = useNavigate()
  const db = getDatabase()
  const {
    email, 
    photoUrl,
    displayName,
    uid,
    signInWithGoogle
  } = useFirebaseContext()
  

  trackEvent('TalentOnboardingClaimPage_Visited', {
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
    name: '', 
    phone: '', 
     //TODO dropdown
    jobFamily: '', 
    //TODO dropdown
    location: '',
    email,
    interviewerIntro: '',
    hourlyRate: '',
    calendlyLink: '',
    Linkedin: '',
    skillsets: '',
    primarySkill: '',
    superpower: '',
    industryInterest: '',
    openToGatedSpace: 'yes',
    education: '',
    twoTruthOnelie: '',
    visaSponsor: 'no',
    openToRecruitersPitch: 'yes',
    avatarString: '',
    linkToResume: '',
    price: '', 
  })

  const [errorInput, updateErrorInput] = useState({ 
    name: false, 
    phone: false, 
    email: false,
    Linkedin: false,
    skillsets: false,
    primarySkill: false,
    superpower: false,
    industryInterest: false,
    openToGatedSpace: false,
    education: false,
    twoTruthOnelie: false,
    visaSponsor: false,
    openToRecruitersPitch: false,
    avatarString: false,
    avatarStringErrorMsg: '',
    linkToResume: false,
    interviewerIntro: false,
    hourlyRate: false,
    calendlyLink: false
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
      skillsets,
      primarySkill,
      superpower,
      openToGatedSpace,
      education,
      industryInterest,
      twoTruthOnelie,
      visaSponsor,
      openToRecruitersPitch,
      avatarString,
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
      skillsets,
      primarySkill,
      superpower,
      industryInterest,
      openToGatedSpace,
      education,
      twoTruthOnelie,
      visaSponsor,
      openToRecruitersPitch,
      avatarString,
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

//   const checkIsAvarAvail = (avatarString: string) => {

 
//     const userRef = ref(db, 'users/' + avatarString);

//     console.log('--userRef', userRef)

//     onValue(userRef, (snapshot) => {
//         console.log('--snapshot', snapshot, snapshot.exists())

//         // if (snapshot.exists()) {
//         var data = snapshot.val();
//         console.log('--data', data)
//         if (data) {
//             updateErrorInput({
//                 ...errorInput,
//                 avatarString: true,
//                 avatarStringErrorMsg: 'pseudonym taken'
//             })
//         } else {
//             updateErrorInput({
//                 ...errorInput,
//                 avatarString: false,
//                 avatarStringErrorMsg: ''
//             })
//         }
        
        

//         // set(ref(db, 'talents/' + avatarString), {
//         //     ...data,
//         //     intro,
//         //     // name,
//         //     // email,
//         //     linkToSystemDesign,
//         //     // phone,
//         //     linkToCoding,
//         // });
//       // setUsername(data.firstName + " " + data.lastName);
//       // TODO
//       // setUsername(data.email)
//     // }
//   });



// }

  const talentProfileSubmit = async () => {

    const { 
      name, 
      phone, 
      interviewerIntro,
      hourlyRate,
      calendlyLink,
      // location,
      email,
      Linkedin,
      skillsets,
      primarySkill,
      superpower,
      industryInterest,
      openToGatedSpace,
      education,
      twoTruthOnelie,
      visaSponsor,
      openToRecruitersPitch,
      avatarString,
      linkToResume,
      // price,

      // image,
    } = formInput

    localStorage.setItem('talentProfile', JSON.stringify(formInput))
    localStorage.setItem('avatarString', avatarString)

    trackEvent('TalentOnboardingClaimPage_Submitting', {
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

    // if (!phone) {
    //   updateErrorInput({
    //     ...errorInput,
    //     phone: true
    //   })
    //   return
    // }
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

    

    if (!skillsets) {
        updateErrorInput({
          ...errorInput,
          skillsets: true
        })
        return
      }
  if (!primarySkill) {
    
    updateErrorInput({
        ...errorInput,
        primarySkill: true
      })
      return
  }

  if (!education) {
    updateErrorInput({
        ...errorInput,
        education: true
    })
    return
  }

  if (!superpower) {
    updateErrorInput({
        ...errorInput,
        superpower: true
      })
      return
  }

  if (!twoTruthOnelie) {
    updateErrorInput({
        ...errorInput,
        twoTruthOnelie: true
      })
      return
    }

    if (!avatarString) {
        updateErrorInput({
            ...errorInput,
          avatarString: true
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

    const writeUserData = (
      name: string, email: string, phone: string, Linkedin: string, 
      
      skillsets: string,
      primarySkill: string,
      superpower: string,
      industryInterest: string,
      openToGatedSpace: string,
      education: string,
      twoTruthOnelie: string,
      linkToResume: string,

      interviewerIntro: string,
      calendlyLink: string,
      hourlyRate: string,
      avatarString: string,
      visaSponsor: string,
      openToRecruitersPitch: string,
      ) => {

      const userId = `${avatarString.trim()}`

      set(ref(db, 'users/' + userId), {
        name,
        email,
        Linkedin,
        skillsets,
        primarySkill,
        superpower,
        industryInterest,
        openToGatedSpace,
        education,
        twoTruthOnelie,

        phone,
        linkToResume,
        interviewerIntro,
        hourlyRate,
        calendlyLink,
        avatarString,
        visaSponsor,
        openToRecruitersPitch
      });
    }

    await writeUserData(
      name,
      email,
      phone,
      Linkedin,
      skillsets,
      primarySkill,
      superpower,
      industryInterest,
      openToGatedSpace,
      education,
      twoTruthOnelie,
      linkToResume,
      interviewerIntro,
      hourlyRate,
      calendlyLink,
      avatarString,
      visaSponsor,
      openToRecruitersPitch
    )
    trackEvent('TalentOnboardingClaimPage_Success', {
      uid,
      ...formInput
    })

    setMintSuccess(true)

  }

//   const placeholderAvatar = 'https://api.multiavatar.com/eeeeee.svg'

// const name = localStorage.getItem('fp_displayName')
// const loginemail = localStorage.getItem('fp_email')

// const [avatarString, setAvatarString] = useState('eeeeee')

// const dropdownPositon = 'down'
  return (
    <div
      className={`nc-PageUploadItem ${className}`}
      data-nc-id="PageUploadItem"
    >
      <Helmet>
        <title>Onramp your professional identity to web3 |  From cog in the wheel to owning your destiny! </title>
      </Helmet>

      {!mintSuccess && 
      <div className="container">
        <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl">

          <h2 className="text-6xl sm:text45xl font-semibold">
              {/* Turn your Salary info NFT, and earn passive income selling it */}
              {/* Onramp Your Professional Identity to Web
              
              3.0, claim you
              r pass to proof of expertise metaverse. */}
              From cog in the wheel to owning your destiny! 
              {/* Build your first skill NFT */}
            </h2>

            <span className="block mt-10 text-neutral-500 dark:text-neutral-400">
            </span>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            </span>

            <h2 className="text-3xl sm:text-4xl font-semibold">
              {/* Turn your Salary info NFT, and earn passive income selling it */}
              {/* Onramp Your Professional Identity to Web
              
              3.0, claim you
              r pass to proof of expertise metaverse. */}
            Community
              {/* Build your first skill NFT */}
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
                {/* * are required */}
              
                ☯️ We are building a community of people that believe in life-long learning and humility
                
                {/* 🧠 Learning, is our way of living
                🥷🏼  Knowledge is nothing if you don’t use it
                🦶🏼 Keep on advancing
                🌲 Keep on growing */}
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold" style={{marginTop: '20px'}}>
                Learning
            </h2>

            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
                {/* * are required */}
                🧠 Learning, is our way of living
            </span>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
                {/* * are required */}
                🥷🏼  Knowledge is nothing if you don’t use it
            </span>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
                {/* * are required */}
                🦶🏼 Keep on advancing
            </span>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
                {/* * are required */}
                🌲 Keep on growing
            </span>

            <h2 className="text-3xl sm:text-4xl font-semibold" style={{marginTop: '20px'}}>
                Growth
            </h2>

            <h2 className="text-3xl sm:text-4xl font-semibold" style={{marginTop: '20px'}}>
               
               
                {/* 👨🏼‍🌾 People that are happy and help each other */}
              
              {/* Build your first skill NFT */}
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
                {/* * are required */}
                💸 Getting paid fairly
            </span>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
                {/* * are required */}
                {/* 🌏 Borderless */}
            </span>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
                {/* * are required */}
                ☄️ Building the New Frontier
            </span>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
                {/* * are required */}
                🌏 Borderless
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

            <h2 className="text-lg sm:text-4xl font-semibold">
                {/* Company & Title Information */}
                {/* ㊙️ We won't share with any company without your permission ㊙️ */}
                What is Professional Identity?
            </h2>

            <span className="text-lg block mt-3 text-neutral-500 dark:text-neutral-400  ">
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
                {/* * are required */}
                1/ Through education, work, and life experiences, we
                developed skills, knowledge, work behaviors, 
                values, ethics, and goals that will lead us towards
               
                <span className='font-semibold' style={{fontWeight: '800'}}> purposeful and fulfilling work.</span> 
            </span>
            <span className="text-lg  block mt-3 text-neutral-500 dark:text-neutral-400 ">
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
                {/* * are required */}
                2/ Knowing and being comfortable with our professional identity throughout our career development builds confidence and enthusiasm.

            </span>
            <span className="text-lg  block mt-3 text-neutral-500 dark:text-neutral-400">
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
                {/* * are required */}
                3/ We will be more apt to reach out to the network or apply for a job because we recognize our 


                <span className='font-semibold' style={{fontWeight: '800'}}> professional value.</span> 
            </span>
            <span className="text-lg  block mt-3 text-neutral-800 dark:text-neutral-400">
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
                {/* * are required */}
                4/ And that employment is a form of <span className='font-semibold' style={{fontWeight: '800'}}>community engagement.</span> 
            </span>

            <span className="text-lg  block mt-3 text-neutral-500 dark:text-neutral-400">
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
                {/* * are required */}
                5/ When we understand that our professional identity satisfies the requirements of a specific job, but can also be   <span style={{fontWeight: '800'}}>transferable to other types of community engagement, </span>   we realize that across fields and work environments, employees and employers are

            </span>
            <span className="text-lg  block mt-3 text-neutral-500 dark:text-neutral-400">
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
                {/* * are required */}
                6/ <span style={{fontWeight: '800'}}>A team who shares the common goal </span>  of providing a product or service to benefit others.

            </span>
            <span className="text-lg  block mt-3 text-neutral-500 dark:text-neutral-400">
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
                {/* * are required */}
                7/ Having clarity about our current professional identity will
                enable us to advance our career by quickly identifying
                other skills needed to meet short-term and future goals and the demands of a changing workforce and decentralized future of work.

            </span>
               <h3 className="text-lg  text-lg sm:text-2xl font-semibold">
                {/* Company & Title Information */}
                {/* ㊙️ We won't share with any company without your permission ㊙️ */}
                    Discover Professional Identity for the Future of Work, and claim your pass to proof of expertise metaverse at <a style={{color: 'pink', borderBottom: '1px solid pink'}} href='/claim'>here</a> or below 👇 
                 
              </h3>
              <span className="text-lg  block mt-3 text-neutral-500 dark:text-neutral-400">
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
                {/* * are required */}
                #futureofwork #metaverse #decentralizedidentity #web3

            </span>
            <h3 className="text-lg  text-lg sm:text-2xl font-semibold">
                {/* Company & Title Information */}
                {/* ㊙️ We won't share with any company without your permission ㊙️ */}
                Join as an early fren and get priority access to our refer2earn decentralized bounty program <a style={{color: 'pink', borderBottom: '1px solid pink'}} href='https://checkout.stripe.com/pay/cs_live_a1bdpJmCSUxhEBx66LmCWqgxXidVkAsiNJppgwO3Ozt3iVc6JH5ovqZx7E#fidkdWxOYHwnPyd1blppbHNgWjA0SVVgfWtEYjRIa3FyanByVEpNaXdRbHVkT0oxVGIxMlZJMXZddDVvYD1sczdtV3VfcGpvfWpSTjZkSUlgUnZzR0FMSkpXRnBgV2ZPMXc2fWJ0bUJPN29dNTU9UmZDUXJpMScpJ3VpbGtuQH11anZgYUxhJz8nMG5EM3RdYDBUNmdEMEFSY1xcJyknd2BjYHd3YHdKd2xibGsnPydtcXF1dj8qKnJycityYGc2d2Bmd3BscXYrfXx%2FKid4JSUl'>here</a>
                 
            </h3>
              
              
            <FormItem label="Name *">
              <Input 
                // style={{
                //   border: '0.5px solid red'
                // }}
                className={errorInput.name ? 'error' : ''}
                defaultValue={''}
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
            <FormItem label="Primary Skill which you get paid for *">
              <Input 
                // style={{
                //   border: '0.5px solid red'
                // }}
                className={errorInput.primarySkill ? 'error' : ''}
                defaultValue={''}
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      primarySkill: e.target.value,
                  })
                  }
                }
              />
            </FormItem>

            <FormItem label="List of skillsets, separate by comma *">
              <Input 
                // style={{
                //   border: '0.5px solid red'
                // }}
                className={errorInput.skillsets ? 'error' : ''}
                defaultValue={''}
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      skillsets: e.target.value,
                  })
                  }
                }
              />
            </FormItem>

            <FormItem label="List all your educations, separate by semicolon *">
              <Input 
                className={errorInput.education ? 'error' : ''}
                defaultValue={''} 
                type='text'
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      education: e.target.value,
                  })
                  }
                }
              />
            </FormItem>

            <FormItem label="Verticals, domains that interest you.  *">
                <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
                e.g. fitness, mental health, DEFI, SocialFI, fintech, edtech, productivity, events, gaming, metaverse, climate tech, AL/ML, dev tools etc
                </span>
              <Input 
                // style={{
                //   border: '0.5px solid red'
                // }}
                className={errorInput.industryInterest? 'error' : ''}
                defaultValue={''}
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      industryInterest: e.target.value,
                  })
                  }
                }
              />
            </FormItem>
            <FormItem label="Your superpower at work *">
                <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
                 {/* we want to know your secret power */}

                 Your superpower is your contribution—the role that you’re put on this Earth to fill. It’s what you do better than anyone else and tapping into it will not only help your team, but you’ll find your work more satisfying, too.
                </span>
              <Input 
                // style={{
                //   border: '0.5px solid red'
                // }}
                className={errorInput.superpower ? 'error' : ''}
                defaultValue={''}
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      superpower: e.target.value,
                  })
                  }
                }
              />
            </FormItem>


            <FormItem label="Two truth, one lie *">

            Two Truths and a Lie

            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
  
                This is a game: 
                 To play, everyone sits or stands in a circle. One by one, each person in the circle says three statements about him/herself. Two of these statements must be facts, or "truths," and one must be a lie. The other members then try to guess which statement is the lie.
                </span>

              <Textarea 
                // style={{
                //   border: '0.5px solid red'
                // }}
                className={errorInput.twoTruthOnelie ? 'error' : ''}
                defaultValue={''}
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      twoTruthOnelie: e.target.value,
                  })
                  }
                }
              />
            </FormItem>
            
           
            
            {/* <FormItem label="Phone Number *">
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
            </FormItem> */}
      
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
            {/* <FormItem label="Email *">
              <Input 
                className={errorInput.email ? 'error' : ''}
                defaultValue={''} 
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
            </FormItem> */}


            

            <FormItem label="Visa Sponsor *">
              {/* <Input 
                className={errorInput.visaSponsor ? 'error' : ''}
                defaultValue={''} 
                type='text'
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      visaSponsor: e.target.value,
                  })
                  }
                }
              /> */}

                <select
                id="visaSponsor"
                name="visaSponsor"
                className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-neutral-500 dark:text-neutral-300  l:text-l rounded-md"
                // value={formInput.location}
                onClick={(e) => {
                    updateFormInput({
                      ...formInput,
                      visaSponsor: (e.target as HTMLInputElement).value,
                  })
                
                }}
              >
                {[{ 
                    name: 'yes',
                    id: 'ye'
                }, { 
                    name: 'no',
                    id: 'no'
                },
            ].map(jf => {
                  return <option
                    key={jf.id}
                  >{
                    jf.name}</option>
                })}
                
              </select>

            </FormItem>
            <FormItem label="Open to recruiters pitching jobs? *">
              {/* <Input 
                className={errorInput.visaSponsor ? 'error' : ''}
                defaultValue={''} 
                type='text'
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      visaSponsor: e.target.value,
                  })
                  }
                }
              /> */}

                <select
                id="openToRecruitersPitch"
                name="openToRecruitersPitch"
                className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-neutral-500 dark:text-neutral-300  l:text-l rounded-md"
                // value={formInput.location}
                onClick={(e) => {
                    updateFormInput({
                      ...formInput,
                      openToRecruitersPitch: (e.target as HTMLInputElement).value,
                  })
                
                }}
              >
                {[{ 
                    name: 'yes',
                    id: 'ye'
                }, { 
                    name: 'no',
                    id: 'no'
                },
            ].map(jf => {
                  return <option
                    key={jf.id}
                  >{
                    jf.name}</option>
                })}
                
              </select>

            </FormItem>

            <FormItem label="Are you interested in creating a gated space to consulting, mentoring, teaching, selling content or simply to talk etc *">
              <select
                id="openToGatedSpace"
                name="openToGatedSpace"
                className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-neutral-500 dark:text-neutral-300  l:text-l rounded-md"
                // value={formInput.location}
                onClick={(e) => {
                    updateFormInput({
                      ...formInput,
                      openToGatedSpace: (e.target as HTMLInputElement).value,
                  })
                
                }}
              >
                {[{ 
                    name: 'yes',
                    id: 'ye'
                }, { 
                    name: 'no',
                    id: 'no'
                },
            ].map(jf => {
                  return <option
                    key={jf.id}
                  >{
                    jf.name}</option>
                })}
                
              </select>
            </FormItem>


            {/* <FormItem label="Link to a 2 min Loom Video tell us your experience in technical interviewing, e.g. the leetcode algorithmns you like the most, system design question you enjoyed the most*">
              <Input 
                className={errorInput.interviewerIntro ? 'error' : ''}
                defaultValue="" 
                type='text'
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      interviewerIntro: e.target.value,
                  })
                  }
                }
              />
            </FormItem> */}

            {/* <FormItem label="Calendly Link *">
              <Input 
                className={errorInput.calendlyLink ? 'error' : ''}
                defaultValue="" 
                type='text'
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      calendlyLink: e.target.value,
                  })
                  }
                }
              />
            </FormItem> */}


            {/* <FormItem label="HourlyRate *">
              <Input 
                className={errorInput.hourlyRate ? 'error' : ''}
                defaultValue="" 
                type='number'
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      hourlyRate: e.target.value,
                  })
                  }
                }
              />
            </FormItem> */}


            
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

              <a style={{background: '#39f889', padding: '10px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}} onClick={() => {
                talentProfileSubmit()
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
                {/* Thanks for contacting us! We will get in touch with you shortly. */}



              </h3>

              {/* <h3 className="text-lg sm:text-2xl font-semibold">
              <a style={{background: '#39f889', padding: '12px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}} href={`/${formInput.avatarString}`} >Check out your profile here</a>
              </h3> */}

              <h3 className="text-lg sm:text-2xl font-semibold">

              </h3>

              <h3 className="text-lg sm:text-2xl font-semibold">
              <a style={{background: '#39f889', padding: '12px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}} href={'https://discord.gg/bGq3zG7t77'} >Join our Discord Community</a>
              </h3>

      
                <div style={{marginTop: '30px'}}>
                ✨ Share on twitter here to enroll sweepstakes for $250 price
                    <TwitterShareButton
                    style={{background: 'none', margin: '1rem', marginTop: '10px'}}
                      title={`I claimed my pseudonym  ${formInput.avatarString} at https://www.futureprotocol.co/claim` }
                      url={`https://www.futureprotocol.co/${formInput.avatarString}`}
                      hashtags={["futureprotocol", "talentnation", "futureofprofessionalidentity", "decentralizedtechscreening", "decentralizedtechinterview", ]}
                    >
                      <TwitterIcon size={32} round />
                
                    </TwitterShareButton>
                </div>


             
          </div>
          <div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8" style={{marginTop: '200px'}}>
         

            {/* <h3 className="text-lg sm:text-2xl font-semibold">
              ✨ Stand out by pitching yourself to your dream company ?
            </h3>

          <h3 className="text-lg sm:text-2xl font-semibold">
              <a style={{background: '#39f889', padding: '12px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}} href={'/talent-pitch'}> Start Here</a>
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

export default Why;
