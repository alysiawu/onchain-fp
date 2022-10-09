import React, { FC, useState, useEffect } from "react";
// import ButtonPrimary from "shared/Button/ButtonPrimary";
// import imagePng from "images/hero3.png";
// import HeroSearchForm from "components/HeroSearchForm/HeroSearchForm";
import Input from "shared/Input/Input";

export interface SectionHero3Props {
  className?: string;
}

const SectionHero3: FC<SectionHero3Props> = ({ className = "" }) => {
  const [userName, setUserName] = useState('')

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
      className={`nc-SectionHero3 relative ${className}`}
      data-nc-id="SectionHero3"
    >
      <div className="mt-10 lg:mt-0 lg:absolute lg:container z-10 inset-x-0 top-[10%] sm:top-[20%]">
        <div className="flex flex-col space-y-5 xl:space-y-8 text-center">
          <span className="sm:text-lg md:text-xl font-semibold text-neutral-300">
            {/* Create, Explore, & Collect Digital Art NFTs. */}
            {/* Own your identity as reputation tokens */}
          
            
            {/* Capture your achievements better than LinkedIn! */}
            {/* professional  */}
         
            {/* Capture community contributions as peer-verified non-transferable tokens. */}
          </span>
        
          <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl !leading-[115%] text-neutral-300">
            {/* Buy, sell, and showcase NFTs
             */}
            {/* Mint your achievements */}
            {/* Manage all your NFTs all in one place */}
            {/* Every NFT you own */}
            Privacy and safety focused, 
          </h2>
          <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl !leading-[115%] text-neutral-300">
            {/* Buy, sell, and showcase NFTs
             */}
            {/* Mint your achievements */}
            {/* Manage all your NFTs all in one place */}
            {/* All in one place */}
          </h2>
          <span className="sm:text-lg md:text-xl font-semibold text-neutral-300">
            {/* Create, Explore, & Collect Digital Art NFTs. */}
            An app you can trust
          </span>
          <span className="sm:text-lg md:text-xl font-semibold text-neutral-300">
            {/* Create, Explore, & Collect Digital Art NFTs. */}
            {/* Turn your 'resume' to achievement tokens */}
           
           
          </span>
          <span className="sm:text-lg md:text-xl font-semibold text-neutral-300">
            {/* Create, Explore, & Collect Digital Art NFTs. */}

          
          </span>
         
          {/* <ButtonPrimary
            sizeClass="px-6 py-3 lg:px-8 lg:py-4"
            fontSize="text-sm sm:text-base lg:text-lg font-medium"
          >
            Start your search
          </ButtonPrimary> */}
                {/* <a style={{background: '#19FDA6', padding: '12px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'https://discord.gg/bGq3zG7t77'} >Join our Community</a> */}

            
                   
          

              <div></div>
           

              {/* <a style={{background: '#19FDA6', padding: '20px 40px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '35px', color: '#111'}} href={'/connect-wallet'} >Sign in with wallet</a> */}
       

            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-x-5">
            {/* Create, Explore, & Collect Digital Art NFTs. */}
            <div style={{position: 'relative', }} className="">
              <div
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '10px',
                  // padding: '10px',
                  color: 'grey',
              }}
              >
              {/* futureprotocol.co/ */}
              lewk.app/

              </div>
              <Input
                style={{
                  padding: '10px',
                  width: '250px',
                  paddingLeft: '90px',
                paddingTop: '10px'
                }}
                // autoFocus
                      // ref={inputRef}
                type='text'
                placeholder="yourname"
                onChange={
                  (e) => {
                    setUserName(e.target.value)
                  }
                }
              />
            </div>
            
                   <div style={{
                     marginTop: `${isMobile ? '150px' : '0px'}`,
                     position: 'relative',
                   }}>
                   <a style={{
                   
                    //  background: `${userName ? '#19FDA6' : ''}`,  
                     animation: 'glow 1s infinite',
                     transition:'0.5s',
                     color: '#19FDA6',
                     backgroundColor:'rgba(156, 161, 160,0.3)',
                    //  'boxShadow': '0 0 50px #19FDA6',
                      borderRadius: '35px', 
                      // color: '#111',
                       padding: '15px 25px'
                      }} 
                   className="p-5 sm:space-y-0 "
                 
                   href={userName ?  `/register?username=${userName}`: 'javascript:void(0)'
    } >Claim your own lewk</a>

                   </div>
                 
                      
          </div>
            

         
         
            <span className="sm:text-lg md:text-xl font-semibold text-neutral-300">
            {/* Create, Explore, & Collect Digital Art NFTs. */}

          
          </span>
            {/* <a className="sm:text-lg md:text-xl font-semibold text-neutral-300" href='/our-why'> */}
            {/* Create, Explore, & Collect Digital Art NFTs. */}

             {/* Check out our WHY
          </a> */}
            {/* <div>   <a style={{padding: '20px 40px', borderRadius: '35px', color: 'white'}} href={'https://testnet.futureprototocol.co'} >Try me on testnet</a></div> */}

        </div>
        {/* <HeroSearchForm className="mt-5 lg:mt-24 2xl:mt-40" /> */}
        
      </div>
      {/* <div className="relative aspect-w-4 aspect-h-3 sm:aspect-w-16 sm:aspect-h-9"> */}
        
        {/* <img
          className="absolute inset-0 object-cover rounded-[32px]"
          src={imagePng}
          alt="hero"
        /> */}
      {/* </div> */}
    </div>
  );
};

export default SectionHero3;
