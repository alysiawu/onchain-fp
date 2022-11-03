import React, { FC, useEffect, useState } from "react";


import {
  // VStack,
  useDisclosure,
  // Button,
  // Text,
  // HStack,
  // Select,
  // Input,
  // Box
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";

// import Logo from "shared/Logo/Logo";
import { useWeb3React } from "@web3-react/core";
// import { signInWithGoogle } from "../../contexts/firebase";
import MenuBar from "shared/MenuBar/MenuBar";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
// import NotifyDropdown from "./NotifyDropdown";
// import AvatarDropdown from "./AvatarDropdown";
// import Input from "shared/Input/Input";
import { useFirebaseContext } from "contexts/firebaseContext";
import { connectors } from "utils/connectors";
import SelectWalletModal from "./Modal";
import Logo from "shared/Logo/Logo";
import { toHex, truncateAddress } from "./utils";
import { trackEvent } from "utils/tracking";
import { signInWithGoogle } from "contexts/firebase";
// import MenuDropdown from "./MenuDropdow";
// import ButtonPrimary from "shared/Button/ButtonPrimary";
// import Navigation from "shared/Navigation/Navigation";

export interface MainNav2LoggedProps {}

const MainNav2Logged: FC<MainNav2LoggedProps> = () => {

  const [logged, setLogged] = useState(false)
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [network, setNetwork] = useState(undefined);
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();


  // https://codesandbox.io/s/mqlydu?file=/src/App.js
  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active
  } = useWeb3React();
  // console.log('library, chainId, account, activate, deactivate, active',  
  
  // // library,
  // // chainId,
  // // account,
  // // activate,
  // deactivate,
  // // active
  
  // )

  const fb_displayName = localStorage.getItem('fp_displayName')
  const [displayName, setDisplayName] = useState(fb_displayName)

  const {
    email, 
    photoUrl,
    // displayName,
    // signInWithGoogle,
    // currentUser
  } = useFirebaseContext()

  console.log('--email', email)
  
  useEffect(() => {
    const provider = window.localStorage.getItem("provider");
    // @ts-ignore
    if (provider) activate(connectors[provider]);
  }, []);


    useEffect(() => {
      // console.log( 'herer----', email, 
      // photoUrl,
      // displayName, currentUser, fb_displayName, localStorage.getItem('fp_email'))
      
      setDisplayName(fb_displayName)
      // localStorage.getItem('fp_email')
      // const photoUrl = localStorage.setItem('fp_photoUrl')
      // localStorage.setItem('fp_displayName', displayName)
      // localStorage.setItem('fp_uid', uid)

      // return setDisplayName(displayName);
    }, [ email, 
      photoUrl,
      displayName, fb_displayName])


  

      const switchNetwork = async () => {
        try {
          await library.provider.request({
            method: "wallet_switchEthereumChain",
            // @ts-ignore
            params: [{ chainId: toHex(network) }]
          });
        } catch (switchError) {
          // @ts-ignore
          if (switchError.code === 4902) {
            try {
              await library.provider.request({
                method: "wallet_addEthereumChain",
                // @ts-ignore
                params: [networkParams[toHex(network)]]
              });
            } catch (error) {
              // @ts-ignore
              setError(error);
            }
          }
        }
      };


      const signMessage = async () => {
        if (!library) return;
        try {
          const signature = await library.provider.request({
            method: "personal_sign",
            params: [message, account]
          });
          setSignedMessage(message);
          setSignature(signature);
        } catch (error) {
          // @ts-ignore
          setError(error);
        }
      };

      const verifyMessage = async () => {
        if (!library) return;
        try {
          const verify = await library.provider.request({
            method: "personal_ecRecover",
            params: [signedMessage, signature]
          });
          // @ts-ignore
          setVerified(verify === account.toLowerCase());
        } catch (error) {
          // @ts-ignore
          setError(error);
        }
      };

      const refreshState = () => {
        window.localStorage.setItem("provider", '');
        // @ts-ignore
        setNetwork("");
        setMessage("");
        setSignature("");
        setVerified(undefined);
      };
 
      const disconnect = () => {
        refreshState();
        deactivate();
      };

      useEffect(() => {
        const provider = window.localStorage.getItem("provider");
        // @ts-ignore
        if (provider) activate(connectors[provider]);
      }, []);


  return (
    <div className={`nc-MainNav2Logged relative z-10 ${"onTop "}`}>
      <div className="container py-5 relative flex justify-between items-center space-x-4 xl:space-x-8">
        <div className="flex justify-start flex-grow items-center space-x-3 sm:space-x-8 lg:space-x-10"
        
        style={{
         
        }}>
          <Logo />
       
         
          <a className="font-semibold text-xl md:text-xl xl:text-xl !leading-[114%] " href='/'>

          {/* Lewk.app */}

          </a>


          <div className="hidden sm:block flex-grow max-w-xs">
            {/* <form action="" method="POST" className="relative">
              <Input
                type="search"
                placeholder="Search items"
                className="pr-10 w-full"
                sizeClass="h-[42px] pl-4 py-3"
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
              <input type="submit" hidden value="" />
            </form> */}
          </div>
        </div>
        <div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
          <div className="hidden items-center xl:flex space-x-2">
          {/* <Logo /> */}
            {/* <Navigation />
            
            <div className="hidden sm:block h-6 border-l border-neutral-300 dark:border-neutral-6000"></div> */}
            <div className="flex">
              
              <SwitchDarkMode />
              {/* <NotifyDropdown /> */}
            </div>
            <div></div>
            {/* <ButtonPrimary  href={"/create"}  sizeClass="px-4 py-2 sm:px-5">Create</ButtonPrimary> */}
              {/* <a style={{paddingRight: '10px', }} href={'https://twitter.com/joinlewk'}>
              <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.2454 4.27106C18.2576 4.44737 18.2576 4.62369 18.2576 4.80163C18.2576 10.2235 14.1301 16.4766 6.58263 16.4766V16.4734C4.3531 16.4766 2.16987 15.838 0.292969 14.6338C0.617161 14.6728 0.942979 14.6923 1.26961 14.6932C3.11726 14.6948 4.9121 14.0748 6.36569 12.9333C4.60985 12.8999 3.07014 11.7551 2.53225 10.0838C3.14733 10.2024 3.78109 10.178 4.38478 10.0131C2.4705 9.62633 1.09329 7.94443 1.09329 5.99114C1.09329 5.97327 1.09329 5.95621 1.09329 5.93914C1.66368 6.25684 2.30231 6.43315 2.95557 6.45265C1.15261 5.2477 0.596848 2.84916 1.68562 0.973879C3.7689 3.53736 6.84263 5.09576 10.1422 5.2607C9.81155 3.83555 10.2633 2.34215 11.3293 1.34032C12.982 -0.213202 15.5812 -0.133576 17.1347 1.51826C18.0537 1.33707 18.9344 0.99988 19.7405 0.522122C19.4341 1.47195 18.7931 2.27877 17.9367 2.79147C18.75 2.69559 19.5446 2.47784 20.293 2.14552C19.7421 2.97104 19.0482 3.69011 18.2454 4.27106Z" fill="currentColor"></path></svg>
            </a> */}
              
              {/* <a style={{background: '#19FDA6', padding: '10px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'/our-why'} >Our Why</a> */}
            <div></div>

            {/* <a style={{background: '#19FDA6', padding: '10px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'/experts'} >Experts</a>
            <div></div>


            <a style={{background: '#19FDA6', padding: '10px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'/talent'} >Talent</a> */}
            <div></div>
            {/* <MenuDropdown copy='Hiring' type='hiring'/> */}
            {/* <MenuDropdown copy='Looking for a job' type='jobSeeker'/> */}
    
            {/* <MenuDropdown copy='Community' type='advocate' /> */}

            <div></div>
            {/* <a style={{background: '#19FDA6', padding: '10px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'/free-mint'} >Free Mint</a>
            <div></div> */}
             <div className="login-buttons" style={{margin: '10px'}}>
              <a style={{background: '#19FDA6', padding: '10px', 
              cursor: 'pointer',
              'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} 
                
              href='https://lewkprotocol.xyz'
              >
            
                  <span>Create Web3 Identity</span>
                </a>
            </div>

            
            <div className="login-buttons" style={{margin: '10px'}}>
              <a style={{background: '#19FDA6', padding: '10px', 
              cursor: 'pointer',
              'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} 
                
              href='/create'
              >
            
                  <span>Mint</span>
                </a>
            </div>
           

              {/* <a style={{background: '#19FDA6', padding: '10px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'https://discord.gg/MSJtrV6xjb'} >Join our community</a>
            <div></div> */}
            {/* <a style={{background: '#19FDA6', padding: '10px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'/communities'} >Curated Communities</a>
            <div></div> */}
            {/* <a style={{background: '#19FDA6', padding: '10px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'/create'} >Mint NFT Key</a>
            <div></div> */}
            {/* <a style={{background: '#19FDA6', padding: '10px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'/marketplace'} >Marketplace</a>
            <div></div> */}
            {/* <a style={{background: '#19FDA6', padding: '10px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'/create'} >Mint your own NFT</a>
            <div></div> */}
            {/* <MenuDropdown copy='On Chain' type='on-chain' /> */}
            <div></div>
            {/* <a style={{ padding: '10px 15px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#19FDA6'}} href={'/roof'} >Get your own Roof</a>
            <div></div> */}

            {/* <a style={{background: '#19FDA6', padding: '10px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'https://discord.gg/bGq3zG7t77'} >Join our Discord</a>
            <div></div> */}

            {/* <a style={{background: '#19FDA6', padding: '10px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'https://zcal.co/i/QJ9_dMGJ'} >Partner & Investor</a>
            <div></div> */}

            {/* <a style={{background: '#19FDA6', padding: '10px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'/connect-wallet'} >Sign in with wallet</a> */}
            {/* {account && account.slice(0, 5)} */}
            {!active ? (
            <a
            
              style={{
                padding: '10px 15px', 'boxShadow': '0 0 50px #19FDA6',  background: '#19FDA6', borderRadius: '20px', color: '#000',
                cursor: 'pointer'
            
            }}
            onClick={() => {

              trackEvent('SignInWithWallet_Clicked', {
                library,
                chainId,
                account,
                activate,
                deactivate,
                active
              })

              onOpen()
            }}>Sign in with wallet {active}</a>
          ) : (
<>

{account && `${account.slice(0, 5)}...${account.slice(-5)}`}
<a
            
            style={{
              padding: '10px 15px', 
              'boxShadow': '0 0 50px #19FDA6', 
      
               color: '#19FDA6',
              
              borderRadius: '20px', }}
                onClick={() => { 
                  trackEvent('DisconnectWallet_Clicked', {
                    library,
                    chainId,
                    account,
                    activate,
                    deactivate,
                    active
                  })

            disconnect()
            }}>Disconnect</a>
           {active ? (
              <CheckCircleIcon color="green" />
            ) : (
              <WarningIcon color="#cd5700" />
            )}
          </>
            
          )}

            <div></div>

            {/* <a style={{ padding: '10px 15px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#19FDA6'}} href={'https://airtable.com/shrtnvjRsLibyYcOD'} 
            
            
              onClick={() => {
                // console.log('ppp')
                trackEvent('JoinBeta_Clicked', {
                  library,
                  chainId,
                  account,
                  activate,
                  deactivate,
                  active
                })

              }}
            >Join the revolution</a>
            <div></div> */}

            <a style={{ padding: '10px 15px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#19FDA6'}} href={'https://airtable.com/shr7YBHjb8imXVv7v'} 
            
            
            onClick={() => {
              // console.log('ppp')
              trackEvent('JoinBeta_Clicked', {
                library,
                chainId,
                account,
                activate,
                deactivate,
                active
              })

            }}
          >Post a Bounty</a>
          <div></div>

            {/* <a style={{ padding: '10px 15px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#19FDA6'}} href={'/register'} >Get your own lewk</a>
            <div></div> */}

<div></div>

<a style={{ padding: '10px 15px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#19FDA6'}} href={'/profile'} 


  onClick={() => {
    // console.log('ppp')
    trackEvent('LewkWallet', {
      library,
      chainId,
      account,
      activate,
      deactivate,
      active
    })

  }}
>Your Lewk Wallet</a>
          


            {/* {displayName && displayName} */}

            {/* { displayName && <AvatarDropdown />} */}
          </div>
          <div className="flex items-center space-x-3 xl:hidden">
            {/* <NotifyDropdown /> */}
            {/* <AvatarDropdown /> */}
            <MenuBar />
          </div>
        </div>
      </div>
      <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
    
    </div>
  );
};

export default MainNav2Logged;
