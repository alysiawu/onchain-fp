// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import dotenv from 'dotenv'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

import "firebase/auth";

import { getStorage } from "firebase/storage";


// dotenv.config()
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAJ8rJczQFGODPqz8_2i2suwMprpksODRI",
//   authDomain: "futurelab-b09d5.firebaseapp.com",
//   projectId: "futurelab-b09d5",
//   storageBucket: "futurelab-b09d5.appspot.com",
//   messagingSenderId: "732987937495",
//   appId: "1:732987937495:web:91f56571cc6c81cb0e5692",
//   measurementId: "G-S4VLLJ5ZRJ"
// };


export const firebaseConfig = {
    apiKey: "AIzaSyAspKtyuilB6Ps5VEdvlo_qitsjML1e-_c",
    authDomain: "futureprotocol-881fc.firebaseapp.com",
    projectId: "futureprotocol-881fc",
    storageBucket: "futureprotocol-881fc.appspot.com",
    messagingSenderId: "1090363946077",
    appId: "1:1090363946077:web:40bac79460480fb2df49b4",
    measurementId: "G-ZWL8NPPKJ1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const _db = getDatabase(app);
export const db = getDatabase()
export const storage = getStorage(app);

// https://dev.to/gathoni/firebase-google-sign-in-with-react-3741

// firebase.initializeApp({
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId:  process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID
// });


// export const auth = app.auth();


export const auth = getAuth();
// const googleProvider = new app.auth.GoogleAuthProvider()
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    console.log('pppp')
  signInWithPopup(auth, provider)
  .then((result) => {
    console.log('9999')
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential && credential.accessToken;
    // // The signed-in user info.
    const user = result.user;
    console.log('---user', user, (user as any).reloadUserInfo,)
    const {  uid } = user
    console.log('---reloadUserInfo', uid,  user.providerData)
    const {photoUrl, displayName, email } = (user as any).reloadUserInfo
    localStorage.setItem('email', email)
    console.log('--photoURL, displayName, email', photoUrl, displayName, email)
    // {
    //     "uid": "ZwKyY89l5IMkv7J1mowuFkAV0Wl2",
    //     "email": "alysiawu886@gmail.com",
    //     "emailVerified": true,
    //     "displayName": "Alysia Wu",
    //     "isAnonymous": false,
    //     "photoURL": "https://lh3.googleusercontent.com/a-/AFdZucq5tTLlLQe-SMT87jXip-SeXkZVBITaYw5knxvAmQ=s96-c",
    //     "providerData": [
    //         {
    //             "providerId": "google.com",
    //             "uid": "110949469599482262860",
    //             "displayName": "Alysia Wu",
    //             "email": "alysiawu886@gmail.com",
    //             "phoneNumber": null,
    //             "photoURL": "https://lh3.googleusercontent.com/a-/AFdZucq5tTLlLQe-SMT87jXip-SeXkZVBITaYw5knxvAmQ=s96-c"
    //         }
    //     ],
    //     "stsTokenManager": {
    //         "refreshToken": "AOEOulbPX48XmhFcfUVIoBvy_02VcReNXlGgCeHI74Ulg_tEl6u-wlW558PDp2MjVTxB52-dq8LC5nOViwE-t-2-R6yFnp6mdQ5oguKBVuEOn-nFXzT3SDQ55JTuIih6YTdZ7vlSmTpvl-dZs-tGtU6vfw8DvAYa-5Rxm3veZUxQOHHqLnxSQoNzhg1305cUtYOeh0MsYbCyYlXQ9KCDfJ8j0sY3NYv4dyNjgT-SMRibSPcqSPoQ1a_5ni-5QRCkB0pAurHbp-_OU-RGjzjvPJ-xhf_WnatyRIGRNgoTbSVVClPjwKsxB4kJE1Pmed0JjcSudlPwW5R-E5VEj2UI_DVs0CTD0-sGkpcgS-ZfjEcyG9PFYzyRC31oo5MQcu2asvsk5SYs4jAV4RlEwZgAUa7otfbJ2wUTMy_cNrGf40XXEcjRdNKgmlKtENBl3N_OLoQ1L9F8W84Y",
    //         "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImE4YmZhNzU2NDk4ZmRjNTZlNmVmODQ4YWY5NTI5ZThiZWZkZDM3NDUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQWx5c2lhIFd1IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BRmRadWNxNXRUTGxMUWUtU01UODdqWGlwLVNlWGtaVkJJVGFZdzVrbnh2QW1RPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2Z1dHVyZXByb3RvY29sLTg4MWZjIiwiYXVkIjoiZnV0dXJlcHJvdG9jb2wtODgxZmMiLCJhdXRoX3RpbWUiOjE2NjEzMzE5MTksInVzZXJfaWQiOiJad0t5WTg5bDVJTWt2N0oxbW93dUZrQVYwV2wyIiwic3ViIjoiWndLeVk4OWw1SU1rdjdKMW1vd3VGa0FWMFdsMiIsImlhdCI6MTY2MTMzMTkxOSwiZXhwIjoxNjYxMzM1NTE5LCJlbWFpbCI6ImFseXNpYXd1ODg2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTEwOTQ5NDY5NTk5NDgyMjYyODYwIl0sImVtYWlsIjpbImFseXNpYXd1ODg2QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.q7FA6NTbemX5CWqCA9IvXIHPYDNQitmIMrgmWknCeb3z8PxouTQURZjuYs6RrIS9HZsDrH2vNLNrdr29ZV1dsAP2DcieI4D3g_XMsUSIDa4Bc8OFa6HoYmohBS30i4z5yiNIUDAD-Hv9c8MziX0DoFCmNyYqk06moRQeZkxm7q3_hOWFd6ilYZalME6AjBFjEYXdPbujMw4WHzunxZdAsJGDM6Q6_Kz2eaWpbYO6I97M-A5xRUGoUedsmJfcE3f38kYukYO7xFGryEskSNNjbs2C31jJJsiTqTAPIgneMAvTOYaj2d6H-kCsPHJ5Oq8zrtWRzYqXwd1B9CxKCEJnsg",
    //         "expirationTime": 1661335519703
    //     },
    //     "createdAt": "1661331873172",
    //     "lastLoginAt": "1661331873173",
    //     "apiKey": "AIzaSyAspKtyuilB6Ps5VEdvlo_qitsjML1e-_c",
    //     "appName": "[DEFAULT]"
    // }



    // ...

  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });


  // auth.signInWithPopup(googleProvider).then((res) => {
  //   console.log(res.user)
  // }).catch((error) => {
  //   console.log(error.message)
  // })
}