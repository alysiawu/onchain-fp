import React, { Dispatch, SetStateAction, useEffect, useState, useContext } from 'react'
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import axios from 'axios'

const defaultValue = {
    code: '',
    // setCode: () => {},
    errorMessage: '',
    email: '',
    firstName: '',
    lastName: '',
    currentJob: {},
    // setUserLinkedinProfile
    // lilogin: () => null,
}

const LinkedinContext: React.Context<{
    code: string;
    setCode?: Dispatch<SetStateAction<string>>;
    errorMessage: string;
    setErrorMessage? : Dispatch<SetStateAction<string>>;
    email: string;
    firstName: string;
    lastName: string;
    currentJob: {};
    setUserLinkedinProfile? : SetStateAction<undefined>;
    lilogin?: SetStateAction<undefined>;
}> 


= React.createContext(defaultValue);

// https://johno.com/using-react-context-with-a-custom-hook#:~:text=React%20Context%20is%20a%20great,implementation%20details%20through%20intermediary%20components.
export const useLinkedInContext= () => {
    return useContext(LinkedinContext)
}


/**
 * Get user first and last name and profile image URL
 * @param accessToken returned from step 2
 */


  
// export useLinkedInContext = LinkedinContext
export const LinkedinContextProvider: React.FC<{ children: any}> = ({ children }) => {

    const [code, setCode] = React.useState("");
    const [lilogin, setLilogin] = useState()
    const [errorMessage, setErrorMessage] = React.useState("");
    const [userLinkedinProfile, setUserLinkedinProfile] = React.useState<SetStateAction<{
        firstName: string,
        lastName: string,
    }>>({
        firstName: '',
        lastName: ''
    });
    // https://www.linkedin.com/developers/apps/203549244/products/v2?refreshKey=0
    // const { linkedInLogin } = useLinkedIn({
    //   clientId: '86i32g8cft7xvd',
    //   redirectUri: `${window.location.origin}/linkedin`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
    //   onSuccess: (code) => {
        
    //     console.log('good', code);
    //     setCode(code);
    //     setErrorMessage("");
    //   },
    //   scope: "r_emailaddress r_liteprofile",
    //   onError: (error) => {
    //     console.log('bad', error);
    //     console.log(error);
    //     setCode("");
    //     setErrorMessage(error.errorMessage);
    //   },
    // });
    // setLilogin(linkedInLogin as any as SetStateAction<undefined>)

  
 
    

    // useEffect(() => {
    //     if (code) {
    //         getUserProfile(code)
    //     }
        
    // }, [code])

    return (
        <LinkedinContext.Provider
            value={{
                ...defaultValue,
                code,
                setCode,
                errorMessage,
                setErrorMessage,
                // setUserLinkedinProfile,
                lilogin,
            }}
        >
        {children}
        </LinkedinContext.Provider>
    )
}

function urlToGetUserProfile(urlToGetUserProfile: any, config: { headers: { Authorization: string; }; }) {
    throw new Error('Function not implemented.');
}
