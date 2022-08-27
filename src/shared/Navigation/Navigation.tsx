import React from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION_DEMO_2 } from "data/navigation";

// You can use provided image shipped by this package or using your own
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
import { useLinkedInContext } from "contexts/linkedinContext";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import axios from "axios";

function Navigation() {
 const {
  // lilogin,
  setCode,
  setErrorMessage,
  // setUserLinkedinProfile
 } = useLinkedInContext()

 function getUserProfile(accessToken: string) {
  const urlToGetLinkedInAccessToken = 'https://www.linkedin.com/oauth/v2/accessToken';
  const urlToGetUserProfile ='https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))'
  const urlToGetUserProfileRaw ='https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))'
  const urlToGetUserEmail = 'https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))';

  console.log('kkkkk')
  let userProfile: { firstName: any; lastName: any; profileImageURL: any; } = {
      firstName: undefined,
      lastName: undefined,
      profileImageURL: undefined
  };
  const config = {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  }
  axios
    .get(urlToGetUserProfile, config)
    .then(response => {
      userProfile.firstName = response.data["localizedFirstName"];
      userProfile.lastName = response.data["localizedLastName"];
      userProfile.profileImageURL = response.data.profilePicture["displayImage~"].elements[0].identifiers[0].identifier;
      // I mean, couldn't they have burried it any deeper?
      console.log('----userProfile', userProfile)
      // setUserLinkedinProfile && setUserLinkedinProfile(userProfile)
    })
    .catch(error => console.log("Error grabbing user profile"))
  return userProfile;
}

const getUserProf = () => {
  return axios.get('localhost:3001/')
}

console.log('---linkedInLogin')

    // https://www.linkedin.com/developers/apps/203549244/products/v2?refreshKey=0
    const { linkedInLogin } = useLinkedIn({
      clientId: '86i32g8cft7xvd',
      redirectUri: `${window.location.origin}/linkedin`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
      onSuccess: (code) => {
        
        console.log('good', code);
        setCode && setCode(code);
        setErrorMessage && setErrorMessage("");

        getUserProfile(code)

      },
      scope: "r_emailaddress r_liteprofile",
      onError: (error) => {
        console.log('bad', error);
        console.log(error);
        setCode &&  setCode("");
        setErrorMessage && setErrorMessage(error.errorMessage);
      },
    });

    
  return (
    <ul className="nc-Navigation hidden lg:flex lg:flex-wrap lg:items-center lg:space-x-1 relative">
      {NAVIGATION_DEMO_2.map((item) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}

    {/* <img
      onClick={linkedInLogin}
      src={linkedin}
      alt="Sign in with Linked In"
      style={{ maxWidth: '180px', cursor: 'pointer' }}
    /> */}

    {/* {!code && <div>No code</div>} */}
    {/* {code && (
        <div>
          <div>Authorization Code: {code}</div>
        </div>
      )} */}
      {/* {errorMessage && <div>{errorMessage}</div>
      } */}
    </ul>
  );
}

export default Navigation;
