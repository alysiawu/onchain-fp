import React, { Dispatch, SetStateAction, useEffect, useState, useContext } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    // providerOptions // required
    // cacheProvider: true,
  });
  
const AccountContext: React.Context<{
    currentAccount?: string | undefined;
    connectWallet?: () => Promise<void>;
}> = React.createContext({

});

export const useAccountContext= () => {
    return useContext(AccountContext)
}


  
// https://codesandbox.io/s/j43b10?file=/src/App.js:606-1069
export const AccountContextProvider: React.FC<{ children: any}> = ({ children }) => {
    // const [provider, setProvider] = useState();
    // const [library, setLibrary] = useState();
    // const [signature, setSignature] = useState("");
    // const [error, setError] = useState("");
    // const [chainId, setChainId] = useState();
    // const [network, setNetwork] = useState();
    // const [message, setMessage] = useState("");
    // const [signedMessage, setSignedMessage] = useState("");
    // const [verified, setVerified] = useState();

    const [currentAccount, setCurrentAccount] = useState<string | undefined>(undefined)

    const connectWallet = async () => {
        // console.log('herer')
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        // const signer = provider.getSigner();
        const accounts = await provider.listAccounts()
        setCurrentAccount(accounts[0])
        localStorage.setItem('currentWallet', accounts[0])
    }
    // const [_connectWallet, setConnectWallet] = useState(connectWallet)
      useEffect(() => { 
        // connectWallet() 
      }, [])


//   const connectWallet = async () => {
//     try {
//       const provider = await web3Modal.connect();
//       const library = new ethers.providers.Web3Provider(provider);
//       const accounts = await library.listAccounts();
//       const network = await library.getNetwork();
//       setProvider(provider);
//     //   setLibrary(library);
//       if (accounts) setAccount(accounts[0]);
//     //   setChainId(network.chainId);
//     } catch (error) {
//     //   setError(error);
//     }
//   };

    return (
        <AccountContext.Provider
            value={{
                currentAccount,
                connectWallet,
            }}
        >
        {children}
        </AccountContext.Provider>
    )
}

