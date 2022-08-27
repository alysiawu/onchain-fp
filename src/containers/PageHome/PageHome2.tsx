// import React from "react";
// import SectionSliderCategories from "components/SectionSliderCategories/SectionSliderCategories";
// import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
// import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionVideos from "./SectionVideos";
import { Helmet } from "react-helmet";
// import SectionLargeSlider from "./SectionLargeSlider";
// import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionHero2 from "components/SectionHero/SectionHero2";
import dedicated from 'images/dedicated.gif'
import building_future from 'images/building_future.gif'
// import SectionGridFeatureNFT2 from "./SectionGridFeatureNFT2";
// import SectionMagazine8 from "components/SectionMagazine8";
// import SectionSliderCardNftVideo from "components/SectionSliderCardNftVideo";
// import SectionSliderCollections2 from "components/SectionSliderCollections2";

function PageHome() {
  return (
    <div className="nc-PageHome relative overflow-hidden">
      <Helmet>
        <title>Future Protocol: Empower the future of work one data at time</title>
      </Helmet>
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      <div className="container relative mt-5 mb-20 sm:mb-24 lg:mt-20 lg:mb-32">
        {/* SECTION HERO */}
        <SectionHero2 />

        {/* SECTION 2 */}
        {/* <SectionHowItWork className="mt-24 lg:mt-40 xl:mt-48" /> */}
      </div>

      {/* SECTION LAERGE SLIDER */}
   
      <div className="bg-neutral-100/70 dark:bg-black/20 py-20 lg:py-32">
        <div className="container">
       
        {/* WE’RE DEDICATED TO BUILDING 
        A FACELESS NETWORK FOR FOLKS JUMP INTO WEB3 AND RIVE INDIVIDUAL SOLVERIGNTY, FUTURE OF IDENTITY AND BUILDER ECONOMY ... METAVER   */}
        </div>
      </div>

      <div className="flex-grow">
          <img className="w-full" src={dedicated} alt="hero" />
        </div>

      <div className="bg-neutral-100/70 dark:bg-black/20 py-20 lg:py-32">
        <div className="container">
        <div className="relative py-20 lg:py-24">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div>
        {/* WE’RE DEDICATED TO BUILDING 
        A FACELESS NETWORK FOR FOLKS JUMP INTO WEB3 AND RIVE INDIVIDUAL SOLVERIGNTY, FUTURE OF IDENTITY AND BUILDER ECONOMY ... METAVER   */}
        </div>
      </div>
      {/* <div className="bg-neutral-100/70 dark:bg-black/20 py-20 lg:py-32">
        <div className="container"> */}
   
          {/* <SectionLargeSlider /> */}
        {/* </div>
      </div> */}

      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        {/* SECTION 3 */}
        {/* <SectionMagazine8 /> */}

        {/* SECTION */}
        {/* <div className="relative py-20 lg:py-28">
          <BackgroundSection />
          <SectionGridAuthorBox
            sectionStyle="style2"
            data={Array.from("11111111")}
            boxCard="box4"
          />
        </div> */}

        {/* SECTION 4 */}
        {/* <SectionSliderCardNftVideo /> */}

        {/* SECTION */}
        {/* <div className="relative py-20 lg:py-28">
          <BackgroundSection />
          <SectionSliderCollections2 cardStyle="style2" />
        </div> 

        {/* SECTION */}
        {/* <SectionSubscribe2 /> */}

        {/* SECTION */}

        {/* <div className="relative py-20 lg:py-28">
          <BackgroundSection className="bg-neutral-100/70 dark:bg-black/20 " />
          <a style={{background: '#39ff14', padding: '10px', 'boxShadow': '0 0 50px #39ff14', borderRadius: '20px', color: '#111'}} href={'https://discord.gg/bGq3zG7t77'} >Join our Discord</a>
          <SectionGridFeatureNFT2 />
        </div> */}

        {/* SECTION 1 */}
        {/* <SectionSliderCategories /> */}

        {/* SECTION */}

        <div className="flex-grow">
          <img className="w-full" src={building_future} alt="hero" />
     

        </div>

        <div className="flex flex-col lg:flex-row lg:items-center">
   
        <a style={{background: '#39ff14', padding: '12px', 'boxShadow': '0 0 50px #39ff14', borderRadius: '20px', color: '#111'}} href={'mailto:hello@futureprotocol.co'}>Message Us</a>

        </div>

       
        <div className="relative py-20 lg:py-28">

    
          <h2 className="font-semibold text-3xl sm:text-4xl xl:text-6xl mt-6 sm:mt-10 !leading-[1.112] tracking-tight">
          {/* a protocol to help Talent building their first on chain professional identity with composable NFTs, or in a sense  */}
                  {/* WE’RE
          BUILDING
          THE
          FUTURE */}
      Skip the interview by building your on-chain professional reputation?

            {/* Talent Nation by Future Protocol */}
          </h2>
          <span className="block mt-6 text-neutral-800 dark:text-neutral-400 ">
            {/* Take control of your negotiation power */}
            {/* Interested in joining the team or want to reach out? */}
          </span>
          <h2 className="font-semibold text-3xl sm:text-4xl xl:text-6xl mt-6 sm:mt-10 !leading-[1.112] tracking-tight">
          {/* a protocol to help Talent building their first on chain professional identity with composable NFTs, or in a sense  */}
          </h2>
          <a style={{background: '#39ff14', padding: '12px', 'boxShadow': '0 0 50px #39ff14', borderRadius: '20px', color: '#111'}} href={'https://discord.gg/bGq3zG7t77'}>Endorse Us</a>
        </div>
     
      

        {/* <div className="relative py-20 lg:py-24"> */}
          {/* <BackgroundSection /> */}
        
          {/* <SectionBecomeAnAuthor /> */}
        {/* </div> */}

        {/* SECTION */}
        <SectionVideos />
      </div>
    </div>
  );
}

export default PageHome;
