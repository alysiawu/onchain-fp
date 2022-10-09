import { useState } from 'react'
import Input from "shared/Input/Input";
import { trackEvent } from 'utils/tracking';
import './index.css'

const SubscribeForm = () => {

    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    return (
        <>
              {subscribed && <div style={{
          margin: '10px 0px'
        }}>You are on the waitlist!</div>}
        
      
        <form className="mt-10 relative flex " style={{
            textAlign: 'center',
            alignItems: 'center',
            margin: '0 auto'
        }}>
  
        <div>
        <Input
        style={{
            padding: '25px 50px', fontSize: '20px',  width: '300px',
            marginRight: '50px'
        }}
          required
          aria-required
          placeholder="Enter your email"
          type="email"
          rounded="rounded-full"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />

        </div>
      
        <div>

            
        </div>
            
    <a style={{  animation: 'glow 1s infinite',
                         transition:'0.5s',
                         color: '#19FDA6',
                         backgroundColor:'rgba(156, 161, 160,0.3)',
                        //  'boxShadow': '0 0 50px #19FDA6',
                          borderRadius: '35px', 
                          // color: '#111',
                           padding: '15px 25px',
                           cursor: 'pointer'}} 
    
    // href={'https://airtable.com/shr8LtmwYtzXAELuQ'} 


onClick={() => {
// console.log('ppp')
trackEvent('JoinBeta_Clicked', {
    email
//   library,
//   chainId,
//   account,
//   activate,
//   deactivate,
//   active
})

var Airtable = require('airtable');
const airAPI = 'keyDr90Ny9XSuy819'
const airtaleBase = new Airtable({apiKey: airAPI}).base('appfZedSta1s4n06f');

airtaleBase('subscriberEmail').create([
  {
    "fields": {
      "Email": email
    }
  },

], function(err: any, records: any[]) {
  if (err) {
    console.error(err);
    return;
  }
  setSubscribed(true)
 
});

}}
>Join Beta</a>

          {/* <a className="w-6 h-6" 
          
            onClick={(e) => {
              e.preventDefault()
              // console.log('---email', email)
              var Airtable = require('airtable');
              const airAPI = 'keyDr90Ny9XSuy819'
              const airtaleBase = new Airtable({apiKey: airAPI}).base('appfZedSta1s4n06f');

              airtaleBase('subscriberEmail').create([
                {
                  "fields": {
                    "Email": email
                  }
                },
           
              ], function(err: any, records: any[]) {
                if (err) {
                  console.error(err);
                  return;
                }
                setSubscribed(true)
               
              });

            }}
          /> */}
    
      </form>
      </>
    )
}


export default SubscribeForm