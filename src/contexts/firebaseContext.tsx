import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";

export const AuthContext = React.createContext<
{
    email: string,
    uid: string,
    photoUrl: string,
    displayName: string,
    currentUser?: any,
    signInWithGoogle?: () => void
}>({
    email: '',
    uid: '',
    photoUrl: '',
    displayName: ''
});

export const useFirebaseContext= () => {
    return React.useContext(AuthContext)
}

export const AuthProvider = ({ children }: {children: any}) => {
    
  const [currentUser, setCurrentUser] = useState<{}>({});
  const [email, setEmail] = useState<string>('');
  const [uid, setUid] = useState('')

  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const auth = getAuth();
  // const googleProvider = new app.auth.GoogleAuthProvider()
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    console.log('kkkk')
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
    console.log('--photoURL, displayName, email', photoUrl, displayName, email)
    setDisplayName(displayName)
    setPhotoUrl(photoUrl)
    setEmail(email)
    setUid(uid)


    
    localStorage.setItem('fp_email', email)
    localStorage.setItem('fp_photoUrl', photoUrl)
    localStorage.setItem('fp_displayName', displayName)
    localStorage.setItem('fp_uid', uid)
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

  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } 
    //   else {
    //     setCurrentUser({});
    //   }
    });
    // console.log(currentUser);
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ 
        currentUser,
        uid,
        email,
        photoUrl,
        displayName,
        signInWithGoogle
    }}>
      {children}
    </AuthContext.Provider>
  );
}