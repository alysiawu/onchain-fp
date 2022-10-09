import React, { FC, useState, useEffect } from "react";
import ButtonCircle from "shared/Button/ButtonCircle";

import NcImage from "shared/NcImage/NcImage";
// import Badge from "shared/Badge/Badge";
import Input from "shared/Input/Input";
import { ArrowSmRightIcon } from "@heroicons/react/outline";
// import { airtaleBase } from "containers/PageHome/helpers";

export interface SectionSubscribe2Props {
  className?: string;
}

const CommunityOverNFTHero: FC<SectionSubscribe2Props> = ({ className = "" }) => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const [width, setWidth] = useState<number>(window.innerWidth);
    
  function handleWindowSizeChange() {
      setWidth(window.innerWidth);
  }
  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);
  
  const isMobile = width <= 768;


  return (
    <div
      className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row lg:items-center ${className}`}
      data-nc-id="SectionSubscribe2"
    >
        <div className="flex-grow">
        <NcImage src={'https://i.postimg.cc/bwvZWHqt/ezgif-com-gif-maker-3.gif'} 
          style={{
          padding: `${isMobile ? '100px': '100px 200px 100px 0px'}`,
          borderRadius: '50px'
            // width: '500px'
          }}
        />
      </div>
      <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mr-10 lg:w-2/5">


        <h2 className="font-semibold text-3xl md:text-4xl 2xl:text-5xl font-semibold xl:text-6xl  text-center !leading-[114%] mb-10" style={{
          fontSize: '5rem'
        }}>
          {/* Comment, React, and Curate NFTs */}
          Community Over NFT
      </h2>


        {/* <h2 className="font-semibold text-4xl"> new feature drops!</h2> */}
        <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
          {/* Subcribe to our super-exclusive drop list and be the first to know
          abour upcoming drops */}

          
        </span>
        {/* <ul className="space-y-4 mt-10"> */}
          {/* <li className="flex items-center space-x-4">
            <Badge name="01" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Get more discount
            </span>
          </li> */}
          {/* <li className="flex items-center space-x-4">
            <Badge color="red" name="02" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Get premium magazines
            </span>
          </li> */}
        {/* </ul> */}
        {/* <form className="mt-10 relative max-w-sm">
          {subscribed && <div style={{
            margin: '10px 0px'
          }}>You are on the waitlist!</div>}
          <Input
            required
            aria-required
            placeholder="Enter your email"
            type="email"
            rounded="rounded-full"
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
          <ButtonCircle
 
            className="absolute transform top-1/2 -translate-y-1/2 right-1"
            style={{
              background: '#19FDA6',
              color: '#000'
            }}
          >
            <ArrowSmRightIcon className="w-6 h-6" 
            
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
            />
          </ButtonCircle>
        </form> */}
      </div>
    
    </div>
  );
};

export default CommunityOverNFTHero;
