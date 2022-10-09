import React, { FC, useEffect, useState } from "react";
// import { useLocation } from 'react-router-dom'
// import { ethers } from 'ethers'
// import Web3Modal from 'web3modal'
// import { marketplace as marketplaceAddress } from '../../utils/constants'
// import marketplaceAbi from '../../artifacts/marketplace.json'

// import Avatar from "shared/Avatar/Avatar";
// import Badge from "shared/Badge/Badge";
// import ButtonPrimary from "shared/Button/ButtonPrimary";
// import ButtonSecondary from "shared/Button/ButtonSecondary";
// import NcImage from "shared/NcImage/NcImage";
// import LikeSaveBtns from "./LikeSaveBtns";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSliderCategories from "components/SectionSliderCategories/SectionSliderCategories";
// import VerifyIcon from "components/VerifyIcon";
// import { nftsLargeImgs, personNames } from "contains/fakeData";
// import TimeCountDown from "./TimeCountDown";
// import TabDetail from "./TabDetail";
// import collectionPng from "images/nfts/collection.png";
// import ItemTypeVideoIcon from "components/ItemTypeVideoIcon";
// import LikeButton from "components/LikeButton";
// import AccordionInfo from "./AccordionInfo";
// import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
// import { CommunityCard } from "./CommunityCard";
import CommunityRow from "components/SectionSliderCategories/CommunityRow";

export interface NftDetailPageProps {
  className?: string;
  isPreviewMode?: boolean;
}

const CommunitiesPage: FC<NftDetailPageProps> = ({
  className = "",
  isPreviewMode,
}) => {

  const [educationCommunities, setEducationCommunities] = useState()

useEffect(() => {
  var Airtable = require('airtable');
  const airAPI = 'keyDr90Ny9XSuy819'
  const airtaleBase = new Airtable({apiKey: airAPI}).base('appfZedSta1s4n06f');
  let educationCommunities: React.SetStateAction<any>[] = []
  let entertainmentCommunities = []
  let leisureCommunities = []

  airtaleBase('Web3Communities').select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 3,
    view: "Grid view"
}).eachPage(function page(records: any[], fetchNextPage: () => void) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        console.log('Retrieved', record.get('Name'));
        console.log('---record', record)
        if (record.get('Category') === 'Education') {
          // @ts-ignore
          educationCommunities.push({
            name: record.get('Name')
          })
        } else if (record.get('Category') === 'Entertaiment') {
          entertainmentCommunities.push({
            name: record.get('Name')
          })
        } else if (record.get('Category') === 'Leisure') {
          leisureCommunities.push({
            name: record.get('Name')
          })
        }

       
    });
 // @ts-ignore
    setEducationCommunities(educationCommunities)
    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    // fetchNextPage();

}, function done(err: any) {
    if (err) { console.error(err); return; }
});


}, [])

// https://medium.com/impact-shakers/learning-daos-how-to-own-your-learning-7721a1f5fb2a
const Education = [
  {
    name: 'Odyssey DAO',
    heading: 'Odyssey DAO',
    image: 'https://miro.medium.com/max/720/0*rSYPFKvhF4u-L2MY',
    benefits: 'Odyssey is a learning DAO creating quality web3 education. They offer different learning paths from basics of Web3, NFTs or DeFi to explaining how to break into web3.',
    reviews: '',
    annualFee: '',
    communityId: 'odysseyDao',
    link: 'https://docs.google.com/forms/d/e/1FAIpQLSctAxl_ctBioJyRBeu0SuR8WjDj976aQlsvnj6zvGlzfef2Cg/viewform'
        },
      {
            name: 'Invisible College',
            heading: 'Invisible College',

            video: 'https://www.invisiblecollege.xyz/IC-Animated.mp4',
            image: 'https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/decentraliens_pfp_1645135184349.gif',
            benefits: 'Courses, Private Discord Server, Topic Deep-Dives, Expert Interviews, Event Library, Market Insights',
            reviews: '',
            annualFee: '',
            link: 'https://www.invisiblecollege.xyz',
            communityId: 'inviscollege',
            website: '',
            twitter: '',
            discord: '',
            quantity: '',
            team: '',
            utility: '',

            },
            // {
            //   name: 'Developer DAO',
            //   heading: 'Invisible College',
  
            //   image: 'https://www.invisiblecollege.xyz/IC-Animated.mp4',
            //   benefits: 'Courses, Private Discord Server, Topic Deep-Dives, Expert Interviews, Event Library, Market Insights',
            //   reviews: '',
            //   annualFee: '',
            //   link: 'https://www.invisiblecollege.xyz',
            //   communityId: 'inviscollege'
            //   },
        
            {
                name: 'Crypto, culture & society',
                heading: 'Crypto, culture & society',
                image: 'https://miro.medium.com/max/720/0*ZLnN-i0tgjaFuDUM',
                benefits: 'Crypto, Culture & Society (CCS) is a learning DAO hosting workshops, electives, and other programming for its members with the goal of exploring the impact of crypto on culture and society.',
                reviews: '',
                annualFee: '',
                link: 'https://cryptosociety.notion.site/Crypto-Culture-Society-01f39bcff26b422183061e6011b16892',
                communityId: 'ccs',
                    },
                    {
                        name: 'RabbitHole',
                        heading: 'Dream DAO',
                        image: 'https://miro.medium.com/max/720/0*oz0ZzlIwImftnOKO',
                        benefits: 'RabbitHole helps anyone learn how to use and contribute to decentralised apps while allowing users to earn tokens based on their on-chain activity.',
                        reviews: '',
                        annualFee: '',
                        link: 'https://rabbithole.gg/'
                        ,
                        communityId: 'rrh',
                    },
            {
                name: 'Dream DAO',
                heading: 'Dream DAO',
                image: 'https://miro.medium.com/max/720/0*kZHgjfsWtp7FN4bQ',
                benefits: 'Powered by Civics Unplugged, the Dream DAO invests in the future of the web3 x social impact ecosystem by providing diverse Gen Zers around the globe with the training, funding, and mentorship they need to leverage the power of web3 to secure a brighter future for humanity.',
                reviews: '',
                annualFee: '',
                link: 'https://www.dreamdao.xyz/',
                communityId: 'dreamdao',
            },
           
]


const Entertainment = [
    {
    
        name: 'EDAO',
        heading: 'edao',
        image: 'https://www.edao.co/images/D.png',
        benefits: 'Incubating brands, creators, sub-cultures, communities, fandom',
        reviews: '',
        annualFee: '',
        link: 'https://www.edao.co/',
        communityId: 'edao',
    },
      {

      name: 'daoentertainment',
      heading: 'daoentertainment',

      image: 'https://www.edao.co/images/frame_12_delay-0.24s.jpg',
      benefits: 'Courses, Private Discord Server, Topic Deep-Dives, Expert Interviews, Event Library, Market Insights',
      reviews: '',
      annualFee: '',
      link: 'https://www.edao.co/',
      communityId: 'daoentertainment',
      },

      {
        name: 'daoentertainment',
        heading: 'daoentertainment',

        image: ' https://www.daoentertainment.com/dist/images/intro_web_dao.mp4',
        benefits: 'Courses, Private Discord Server, Topic Deep-Dives, Expert Interviews, Event Library, Market Insights',
        reviews: '',
        annualFee: '',
        link: 'https://www.daoentertainment.com/',
        
        communityId: 'daoentertainment',
        },
]

const WomanBuilt = [
    {
        // gif
        // 
        name: 'World of Woman',
        // image: 'https://i.seadn.io/gae/GHhptRLebBOWOy8kfXpYCVqsqdes-1-6I_jbuRnGTHHW6TD63CtciH75Dotfu2u8v6EmkWt-tjhkFRVLxRUwgMfKqqy5W24AolJayeo?auto=format&w=3840',

        image: 'https://i.seadn.io/gae/EFAQpIktMBU5SU0TqSdPWZ4byHr3hFirL_mATsR8KWhM5z-GJljX8E73V933lkyKgv2SAFlfRRjGsWvWbQQmJAwu3F2FDXVa1C9F?auto=format&w=256',
        benefits: 'You’ll find people from around the world in the WoW community – from avid NFT collectors to first time collectors, web3 builders and artists, to people who are new to the decentralized web and want to be part of a mission-driven community.',
        reviews: '',
        annualFee: '',
        link: '',
        communityId: 'wow',
            },

            {
              // gif
              // 
              name: 'Women Rise',
              // image: 'https://i.seadn.io/gae/GHhptRLebBOWOy8kfXpYCVqsqdes-1-6I_jbuRnGTHHW6TD63CtciH75Dotfu2u8v6EmkWt-tjhkFRVLxRUwgMfKqqy5W24AolJayeo?auto=format&w=3840',
      
              image: 'https://pbs.twimg.com/profile_images/1451626184064880656/6QgJVkp0_400x400.jpg',
              benefits: 'You’ll find people from around the world in the WoW community – from avid NFT collectors to first time collectors, web3 builders and artists, to people who are new to the decentralized web and want to be part of a mission-driven community.',
              reviews: '',
              annualFee: '',
              link: '',
              communityId: 'wow',
                  },

            
            {
                name: 'Women\'s Creative Collective',
                image: 'https://i.seadn.io/gcs/files/2e815428157b7db5bed95e3143824eb5.gif?auto=format&w=256',
                benefits: 'Women’s Creative Collective (WCC) is on a mission to produce a sustainable Global Brand that allows the NFT holder to experience the process of building a Collaborative Brand where creative meets retail on the blockchain! Our goal is to have the community collectively influence and shape the WCC phygital (digital-physical) style.',
                reviews: '',
                annualFee: '',
                link: '',
                communityId: 'wcc',
                    },
                    // {
                    //     name: 'Women\'s Creative Collective',
                    //     image: '',
                    //     benefits: '',
                    //     reviews: '',
                    //     annualFee: '',
                    //     link: 'https://www.edao.co/'
                    //         },
                         
]


// const Fashion = [
//     {
//         name: 'Women\'s Creative Collective',
//         image: '',
//         benefits: '',
//         reviews: '',
//         annualFee: '',
//             },
// ]

// const Gaming = [
// {

// },
// ]


const SciTech = [

{
  name: 'LinksDAO',
  image: ' https://cdn.discordapp.com/discovery-splashes/872804414107312158/4d8660f2c97240988917a9bacda444c7.jpg?size=2048',
  benefits: 'LinksDAO NFTs will allow for community access, governance, a wide variety of perks, and games in the near term. They will be the key to unlocking membership at LinksDAO\'s first golf & leisure club.',
  reviews: '',
  annualFee: '',
  link: 'https://www.edao.co/',
  communityId: 'linksdao',
      },
      {
        name: 'Dappnode',
        image: 'https://cdn.discordapp.com/discovery-splashes/747647430450741309/642eb5d361f54756ee416375f35f6670.jpg?size=2048',
        benefits: 'Dappnode is your gateway to Web3 and Crypto Infra. It allows anyone to run nodes and earn with validators very easily.',
        reviews: '',
        annualFee: '',
        link: 'https://www.edao.co/',
        communityId: 'linksdao',
            },

            {
              name: 'The Dapp List',
              image: 'https://cdn.discordapp.com/discovery-splashes/739748074989289538/ccf6cacaedb5da8289f656152fc2ec07.jpg?size=2048',
              benefits: 'Dappnode is your gateway to Web3 and Crypto Infra. It allows anyone to run nodes and earn with validators very easily.',
              reviews: '',
              annualFee: '',
              link: 'https://www.edao.co/',
              communityId: 'linksdao',
                  },
      

 

]
const Music = [
  {
    name: 'Versette AI',
    image: 'https://cdn.discordapp.com/discovery-splashes/912575526944768051/9a910ec15d230dc3165fdec37b2ee28e.jpg?size=2048',
    benefits: 'Dappnode is your gateway to Web3 and Crypto Infra. It allows anyone to run nodes and earn with validators very easily.',
    reviews: '',
    annualFee: '',
    link: 'https://www.edao.co/',
    communityId: 'linksdao',
        },
        {
          name: 'Mona',
          image: 'https://cdn.discordapp.com/discovery-splashes/821806953981542468/81c7dd41cc649da0bbe0e7d556547b81.jpg?size=2048',
          benefits: 'Dappnode is your gateway to Web3 and Crypto Infra. It allows anyone to run nodes and earn with validators very easily.',
          reviews: '',
          annualFee: '',
          link: 'https://www.edao.co/',
          communityId: 'linksdao',
              },
              {
                name: 'TRAKTRAIN',
                image: 'https://cdn.discordapp.com/discovery-splashes/896434540774588427/eb0d093b4aa2a988778eba4d62a6c99f.jpg?size=2048',
                benefits: 'Dappnode is your gateway to Web3 and Crypto Infra. It allows anyone to run nodes and earn with validators very easily.',
                reviews: '',
                annualFee: '',
                link: 'https://www.edao.co/',
                communityId: 'linksdao',
                    },

]

const Leisure = [
    {
        name: 'LinksDAO',
        image: 'https://i.seadn.io/gcs/files/6b39ef7da44e9ccd8dc8b02570cabb07.png?auto=format&w=256',
        benefits: 'LinksDAO NFTs will allow for community access, governance, a wide variety of perks, and games in the near term. They will be the key to unlocking membership at LinksDAO\'s first golf & leisure club.',
        reviews: '',
        annualFee: '',
        link: 'https://www.edao.co/',
        communityId: 'linksdao',
            },
]


  return (
    <div
      className={`nc-NftDetailPage  ${className}`}
      data-nc-id="NftDetailPage"
    >
          <div className="container py-24 lg:py-32">
          {/* SECTION 1 */}
          <div className="relative py-24 lg:py-28">
            <BackgroundSection />
            <CommunityRow  data = {Education} category='Education' 
            // subHeading='Learning DAOs — How to own your learning'
             heading='Education' />
          </div>

          <div className="relative py-24 lg:py-28">
            <BackgroundSection />

            <CommunityRow  data = {WomanBuilt} category='Women Built' />
          </div>

          <div className="relative py-24 lg:py-28">
            <BackgroundSection />
            <CommunityRow  data = {Entertainment} category='Entertainment' />
          </div>

          <div className="relative py-24 lg:py-28">
            <BackgroundSection />

            <CommunityRow  data = {SciTech} category='SciTech' />
          </div>
          {/* <div className="relative py-24 lg:py-28">
            <BackgroundSection />
            <CommunityRow  data = {Fashion} category='Fashion' />
          </div> */}
   
       
          <div className="relative py-24 lg:py-28">
            <BackgroundSection />
            <CommunityRow  data = {Music} category='Music' />
          </div>

          <div className="relative py-24 lg:py-28">
            <BackgroundSection />
            <CommunityRow  data = {Leisure} category='Leisure' />
          </div>

          {/* SECTION */}
          {/* <SectionBecomeAnAuthor className="pt-24 lg:pt-32" /> */}
        </div>
        
      {/* MAIn */}
        {/* <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard /> */}
  

      {/* OTHER SECTION */}

      {isPreviewMode && (
        <div className="container py-24 lg:py-32">
          {/* SECTION 1 */}
          <div className="relative py-24 lg:py-28">
            <BackgroundSection />
            <SectionSliderCategories />
          </div>

          {/* SECTION */}
          {/* <SectionBecomeAnAuthor className="pt-24 lg:pt-32" /> */}
        </div>
      )}

      
    </div>
  );
};

export default CommunitiesPage;
