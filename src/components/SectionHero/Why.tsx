import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import imagePng from "images/hero3.png";
import HeroSearchForm from "components/HeroSearchForm/HeroSearchForm";

export interface SectionHero3Props {
  className?: string;
}

const WhyUseFuture: FC<SectionHero3Props> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionHero3 relative ${className}`}
      data-nc-id="SectionHero3"
    >
      <div className="lg:mt-0 lg:absolute lg:container z-10 inset-x-0 top-[10%] sm:top-[20%]">
        <div className="flex flex-col space-y-5 xl:space-y-8 text-center">
          <span className="sm:text-lg md:text-xl font-semibold text-neutral-300">
            {/* Create, Explore, & Collect Digital Art NFTs. */}
            {/* Turn your 'resume' as achievement tokens */}
            {/* professional  */}
         
            {/* Capture community contributions as peer-verified non-transferable tokens. */}
          </span>
          <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl !leading-[115%] text-neutral-300">
            {/* Buy, sell, and showcase NFTs
             */}
            {/* mint your achievement */}
            Why mint achievement tokens?
          </h2>
          <span className="sm:text-lg md:text-xl font-semibold text-neutral-300">
            {/* Create, Explore, & Collect Digital Art NFTs. */}

            {/* Capture community contributions as peer-verified non-transferable tokens. */}
           


          </span>
          {/* <ButtonPrimary
            sizeClass="px-6 py-3 lg:px-8 lg:py-4"
            fontSize="text-sm sm:text-base lg:text-lg font-medium"
          >
            Start your search
          </ButtonPrimary> */}
                {/* <a style={{background: '#19FDA6', padding: '12px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'https://discord.gg/bGq3zG7t77'} >Join our Community</a> */}
                Allow every class you took and every work you do turned into achievement tokens
            <div>
            <a style={{background: '#19FDA6', padding: '20px 40px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '35px', color: '#111'}} href={'/connect-wallet'} >Sign in with wallet</a>

         
            </div>
              
            {/* <div>   <a style={{padding: '20px 40px', borderRadius: '35px', color: 'white'}} href={'https://testnet.futureprototocol.co'} >Try me on testnet</a></div> */}

        </div>
        {/* <HeroSearchForm className="mt-5 lg:mt-24 2xl:mt-40" /> */}
        
      </div>
      <div className="relative aspect-w-4 aspect-h-3 sm:aspect-w-16 sm:aspect-h-9">
        
        {/* <img
          className="absolute inset-0 object-cover rounded-[32px]"
          src={imagePng}
          alt="hero"
        /> */}
      </div>
    </div>
  );
};

export default WhyUseFuture;
