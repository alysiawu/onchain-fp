// import React from "react";
import ReactDOM from "react-dom/client";
//
import "./styles/index.scss";
import "./index.css";
import "./fonts/line-awesome-1.3.0/css/line-awesome.css";
import "rc-slider/assets/index.css";

//
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { persistor, store } from "app/store";
import { PersistGate } from "redux-persist/integration/react";
import { LinkedinContextProvider } from "contexts/linkedinContext";
import { AccountContextProvider } from "contexts/accountContext";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './contexts/firebase'
import { AuthProvider } from "contexts/firebaseContext";
import { ChakraProvider } from "@chakra-ui/react";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from '@ethersproject/providers'
import { ethers } from "ethers";

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const getLibrary = (provider: any) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

root.render(
  // <React.StrictMode>
  <ChakraProvider>
     <Web3ReactProvider getLibrary={getLibrary}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LinkedinContextProvider>
          <AccountContextProvider>

            <AuthProvider>

              <App />
            </AuthProvider>
        
          </AccountContextProvider>
            
        </LinkedinContextProvider>
      </PersistGate>
    </Provider>
    </Web3ReactProvider>
  </ChakraProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
