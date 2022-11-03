import Label from "components/Label/Label";
import React, { FC, useEffect, useState } from "react";
import { TwitterShareButton, TwitterIcon } from "react-share";
import { useLocation, useNavigate } from 'react-router-dom';
import { create as ipfsHttpClient, IPFSHTTPClient } from 'ipfs-http-client'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import {
  marketplace as marketplaceAddress, 
  authorization,
} from '../utils/constants'
// import twitter from "images/socials/twitter.svg";
import metamaskImg from "images/metamask.webp";
import loading from 'images/loading.gif'
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
// import Textarea from "shared/Textarea/Textarea";
import { Helmet } from "react-helmet";
import FormItem from "components/FormItem";
import NcImage from "shared/NcImage/NcImage";
// import NcDropDown, { NcDropDownItem } from "shared/NcDropDown/NcDropDown";
import NcModal from "shared/NcModal/NcModal";
import Textarea from "shared/Textarea/Textarea";
import { useAccountContext } from "contexts/accountContext";
import { useFirebaseContext } from "contexts/firebaseContext";
import { signInWithGoogle } from "contexts/firebase";

export interface PageUploadItemProps {
  className?: string;
}

const CreateLink: FC<PageUploadItemProps> = ({ className = "" }) => {

  const {
    email, 
    photoUrl,
    // displayName,
    // signInWithGoogle,
    // currentUser
  } = useFirebaseContext()

  const plans = [
    {
      name: "Metamask",
      img: metamaskImg,
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
  const [uploadingFile, setUploadingFile] = useState(false)
  const { width, height } = useWindowSize()

  const { state } = useLocation()
  const { gatedUrl } = state
  console.log('--gatedUrl', gatedUrl)
  
  const [formInput, updateFormInput] = useState({ 
    chain: 'polygon',
    description: '',
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

  async function onUploadImageToIPFS(e: React.ChangeEvent<HTMLInputElement>) {
    
    let client: IPFSHTTPClient | undefined;
    try {
      client = ipfsHttpClient({
        // url: "https://websan.infura-ipfs.io/ipfs/",
        url: 'https://infura-ipfs.io:5001',
        // port: 5001,
        // protocol: 'https',
        headers: {
          authorization,
        },
      });

      const file = e?.target?.files?.[0]
      console.log('---file', file)
      if (!file) return
      try {
        const added = await client.add(
          file,
          {
            progress: (prog) => console.log(`received: ${prog}`)
          }
        )
        const url = `https://websan.infura-ipfs.io/ipfs/${added.path}`
        
        console.log('--url', url)
        
        
        setFileUrl(url)
   
  
      } catch (error) {
        console.log('Error uploading file: ', error)
      }  
    } catch (error) {
      console.error("IPFS error ", error);
      client = undefined;
    }

    

    // const client = ipfsHttpClient({ 
    //   'https://infura-ipfs.io:5001/api/v0'
    // })
 
}

// const dropdownPositon = 'down'

   return (
    <div
      className={`nc-PageUploadItem ${className}`}
      data-nc-id="PageUploadItem"
    >
      <Helmet>
        <title>Lewk.app</title>
      </Helmet>
      <div className="container">
        <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold">
              {/* Turn your Salary info NFT, and earn passive income selling it */}
              How should your link appear?
            {/* Monetize yourself */}
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400 flex">
            Customize your Lewk link preview.
              {/* You can set preferred display name, create your profile URL and
              manage other personal settings. */}
              {/* We are on
              <img src={polygon} style={{height: '25px', display: 'flex'}} className="pl-2" /> */}
            </span>
          </div>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8">
            <div>
              <h3 className="text-lg sm:text-2xl font-semibold mb-10">
                {/* Company & Title Information */}
                {/* <a 
                    onClick={() => fileInput?.current?.click()} >   
                        {`${fileUrl ? 'Change File' : 'Upload File'}`}
                </a> */}

                <a style={{background: '#19FDA6', padding: '12px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111', cursor: 'pointer'}}
                    onClick={() => fileInput?.current?.click()} >  
                {`${fileUrl ? 'Change File' : 'Upload File'}`}</a>
             

              </h3>

                  {/* <input 
                                        ref={fileInput}
                                        type="file" 
                                        hidden 
                                        // accept=".doc,.docx,.pdf" 
                                        id="fileID"  
                                        value={formInput.file}
                                        // onChange={onUploadImageToIPFS}

                                        onChange={(e) => onUploadImageToIPFS(e)}

                                        
                                        /> */}
                                


                                   {/* {  fileUrl &&  <img className="rounded mt-4" width="350" style={{marginBottom: '30px'}} src={fileUrl} />} */}


              <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                This will be the coverage image of your NFT.
                File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
                OGG, GLB, GLTF. Max size: 100 MB
              </span>


              <div className="mt-5 ">
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-xl">
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
                      >
                        {/* <span  onClick={(e) => 
                          // e.target.defaultPrevented()
                          fileInput?.current?.click()
                          
                          } >Upload a file</span> */}

                          {uploadingFile && 
                          <div className="tenor-gif-embed" data-postid="22743155" data-share-method="host" data-aspect-ratio="0.990625" data-width="100%"><a href="https://tenor.com/view/hug-gif-22743155">Hug Sticker</a>from <a href="https://tenor.com/search/hug-stickers">Hug Stickers</a></div> 
                          
                          // <script type="text/javascript" async src="https://tenor.com/embed.js"></script> 
                          
                          }

                        <input
                         ref={fileInput}
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          value={formInput.file}
                          onChange={(e) => onUploadImageToIPFS(e)}
                        />
                      </label>
                      { !fileInput && <p className="pl-1">or drag and drop</p>}
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {/* PNG, JPG, GIF up to 10MB */}
                    </p>
                    {/* <a 
                                
                                onClick={() => fileInput?.current?.click()} >
                                    
                                    {`${fileUrl ? 'Change File' : 'Cover image for your NFT'}`}
                            </a> */}


                           {  fileUrl &&  <img className="rounded mt-4" width="350" style={{marginBottom: '30px'}} src={fileUrl} />}
                  </div>
                </div>
              </div>
            </div>

            {/* ---- */}
            {/* <FormItem label="Title">
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
            </FormItem> */}
            {/* <FormItem label="Company">
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
              /> */}

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
            {/* </FormItem> */}
          
     
            {/* <FormItem label="Job Family">
              <NcDropDown
              
                // className={` ${containerClassName} `}
                // iconClass={iconClass}
                data={AchievementCategories}
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
            {/* <FormItem label="Base Salary ($)">
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
            </FormItem> */}
            {/* <FormItem label="Equity ($)">
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
            </FormItem> */}

            {/* <h3 className="text-lg sm:text-2xl font-semibold">
              Work Experience and Location
            </h3> */}
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
                
              </select>

            </FormItem> */}
            <FormItem label="">
              <Input 
                defaultValue="" 
                type='text'
                placeholder="Title"
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

            <FormItem label="">
              <Textarea 
                defaultValue="" 
                placeholder="This link has no description"
                style={{
                  padding: '10px'
                }}
                onChange={
                  (e) => {
                    updateFormInput({
                      ...formInput,
                      description: e.target.value,
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
              {/* <Label>Choose the skillset you want to mint</Label> */}
          
        
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

            {/* <a style={{background: '#19FDA6', padding: '10px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} onClick={() => listNFTForSale()} >Mint & Sell Skill NFT</a> */}
            <div></div>

            {/* <a style={{background: '#19FDA6', padding: '12px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111', cursor: 'pointer'}}   onClick={() => {
              if (localStorage.getItem('email') || !email) {
               listNFTForSale()
              } 
              
              else {
                signInWithGoogle()
              }
            }}> 
            Mint 
               
                
            </a> */}

            <a style={{background: '#19FDA6', padding: '12px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111', cursor: 'pointer'}}   onClick={() => {
                navigate('/gate-condition', {
                    state: {
                        gatedUrl,
                        title: formInput.title,
                        description: formInput.description,
                        imageUrl: fileUrl

                    }
                })
            }}> 
            Next 
               
                
            </a>

              {/* <ButtonSecondary className="flex-1">Preview item</ButtonSecondary> */}
            </h3>
          </div>
          <div className="text-neutral-500 dark:text-neutral-400 text-sm">
                {/* Choose an cover PFP for your TC NFT */}
                {/* Want to propose a? 
                email propose@futureprotocol.co */}
{/* 
                Want to be an artist?
                email hello@futureprotocol.co */}
                
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



export default CreateLink;
