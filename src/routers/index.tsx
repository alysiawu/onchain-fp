import React, { ReactNode, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "shared/Footer/Footer";
import PageHome from "containers/PageHome/PageHome";
import Page404 from "containers/Page404/Page404";
import AuthorPage from "containers/AuthorPage/AuthorPage";
import AccountPage from "containers/AccountPage/AccountPage";
import PageContact from "containers/PageContact/PageContact";
import PageAbout from "containers/PageAbout/PageAbout";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageLogin from "containers/PageLogin/PageLogin";
import PageSubcription from "containers/PageSubcription/PageSubcription";
import BlogPage from "containers/BlogPage/BlogPage";
import BlogSingle from "containers/BlogPage/BlogSingle";
import SiteHeader from "containers/SiteHeader";
import NftDetailPage from "containers/NftDetailPage/NftDetailPage";
import NftDetailPage2 from "containers/NftDetailPage/NftDetailPage2";
import PageCollection from "containers/PageCollection";
import PageSearch from "containers/PageSearch";
import JobsSearch from "containers/JobsSearch";
import TalentStart from "containers/TalentStart";

import PageUploadItem from "containers/PageUploadItem";
import CreateNFTLock from "containers/CreateNFTLock";
import QuickApplyTalent from "containers/QuickApplyTalent";

import TalentPitch from "containers/TalentPitch";
import PostJob from "containers/PostJob";
import PageConnectWallet from "containers/PageConnectWallet";
import PageHome2 from "containers/PageHome/PageHome2";
// import PageHome3 from "containers/PageHome/PageHome3";
// import Create from "containers/Create/Create";
import { LinkedInCallback } from 'react-linkedin-login-oauth2';
import InterviewerOnboarding from "containers/InterviewerOnboarding";
import TalentProfilePage from "containers/AuthorPage/TalentProfilePage";
import Claim from "containers/Claim";
import Why from "containers/Why";
import PostReferralBounty from "containers/PostReferralBounty";
import Home from "containers/PageHome/Home0830";
// import SearchPro from "containers/SearchPro";
import SearchProPage from "containers/SearchPro";
import PostReferral from "containers/Referral";
import ReferralOppos from "containers/ReferralOppos";
import ReferralRequest from "containers/RequestReferral";
import HiringManagersPage from "containers/HiringManagersPage";
import RoleBasedReferralRequest from "containers/RoleBasedReferralRequest";
import IndustryInsidersPage from "containers/IndustryInsiders";
import ExpertsPage from "containers/ExpertsPage";
import ExpertDetailPage from "containers/ExpertDetailPage";
import JobSeekersPage from "containers/JobSeekersPage";
import PageHome3 from "containers/PageHome/PageHome3";
import Register from "containers/Register";
import PageHomeBeta from "containers/PageHome/PageHomeBeta";
import WalletPage from "containers/AuthorPage/WalletPage";
import NftDetailCurationPage from "containers/NftDetailPage/NFTDetailCurationPage";
import CommunitiesPage from "containers/NftDetailPage/CommunitiesPage";
import CommunityDetailPage from "containers/NftDetailPage/CommunityDetailPage";
import GatedPage from "containers/AuthorPage/GatedPage";
import GatedPage2 from "containers/PageHome/GatedPage2";
import GatedPageWithSlug from "containers/AuthorPage/GatedPagWithSlug";
import GatedTestPage from "containers/AuthorPage/GatedTest";
import GatedTimePage from "containers/AuthorPage/GatedTimePage";
import MintLewk from "containers/MintLewk";
import KnowledgeInfluencers from "containers/PageHome/HomeKnowlegdeInfluncers";
import PeopleSearch from "containers/PeopleSearch";
import CreateLink from "containers/CreateLink";
import GatingCondition from "containers/GatingCondition";
import Success from "containers/Success";
import NewHome from "containers/PageHome/NewHome";
import GatedLinks from "containers/AuthorPage/GatedLinks";
import ReferralBountyHome from "containers/PageHome/ReferralBountyHome";
import JobDetail from "containers/NftDetailPage/JobDetailPage";
import JobDetailPage from "containers/NftDetailPage/JobDetailPage";

// import Openings from "containers/Openings";

export const pages: Page[] = [
  // { path: "/", exact: true, component: PageHome2 },
  // { path: "/#", exact: true, component: PageHome2 },
  // { path: "/linkedin", exact: true, component: LinkedInCallback },
  // { path: "/create", exact: true, component: Create },
  // { path: "/home2", exact: true, component: PageHome },
  // { path: "/home3", exact: true, component: PageHome3 },
  //
  { path: "/home-header-2", exact: true, component: PageHome },
  // { path: "/nft-detail", component: NftDetailPage },
  // { path: "/page-collection", component: PageCollection },
  // { path: "/search", component: PageSearch },
  // { path: "/profile", component: AuthorPage },
  // { path: "/account", component: AccountPage },
  // { path: "/create", component: PageUploadItem },
  // { path: "/connect-wallet", component: PageConnectWallet },
  //
  // { path: "/blog", component: BlogPage },
  // { path: "/blog-single", component: BlogSingle },
  //
  // { path: "/contact", component: PageContact },
  // { path: "/about", component: PageAbout },
  // { path: "/signup", component: PageSignUp },
  // { path: "/login", component: PageLogin },
  // { path: "/subscription", component: PageSubcription },
];

const App = () => {



  return (
    
    <BrowserRouter basename="/">
      <ScrollToTop />
      <SiteHeader />
      <Routes>
        <Route path="/lewk" element={<NewHome />} />
        <Route path="/" element={<ReferralOppos />} />
        <Route path="/role/:uuid" element={<JobDetailPage />} />
        <Route path="/bountyhome" element={<ReferralBountyHome />} />
        <Route path="/oldhome" element={<KnowledgeInfluencers />} />
        <Route path="/create-link" element={<CreateLink />} />
        <Route path="/gate-condition" element={<GatingCondition />} />
        <Route path=":pageSlug" element={<GatedLinks />} />




        <Route path="/beta" element={<PageHomeBeta />} />
        <Route path="/mint-lewk" element={<MintLewk />} />
        <Route path="/connect" element={<PeopleSearch />} />
        <Route path="/success" element={<Success />} />
  
     
        <Route path="/madskullz" element={<NftDetailCurationPage />} />
        
        {/* <Route path="/" element={<PageHome2 />} /> */}
        {/* <Route path="/roof" element={<PageHomeBeta />} /> */}
        {/* <Route path="/#" element={<PageHome2 />} /> */}
        <Route path="/request-a-referral" element={<RoleBasedReferralRequest />} />
        <Route path="/communities" element={<CommunitiesPage />} />
        <Route path="/community/:communityId" element={<CommunityDetailPage />} />


        <Route path="/hiring-managers" element={<HiringManagersPage />} />
        <Route path="/experts" element={<ExpertsPage />} />
        <Route path="/talent" element={<JobSeekersPage />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/free-mint" element={<FreeMintPage />} /> */}
        <Route path="/expert/:expertId/:index" element={<ExpertDetailPage />} />

        <Route path="/person/:personId" element={<ExpertDetailPage />} />

        <Route path="/marketplace" element={<PageSearch />} />



        <Route path="/industry-insiders" element={<IndustryInsidersPage />} />
       


        <Route path="/jobs" element={<JobsSearch />} />
        <Route path="/our-why" element={<Why />} />
        {/* <Route path="/openings" element={<Openings />} /> */}
        <Route path="/interviewer-onboarding" element={<InterviewerOnboarding />} />
        <Route path="/search-pro" element={<SearchProPage />} />
        <Route path="/referral-oppos" element={<ReferralOppos />} />
        <Route path="/referral-req" element={<ReferralRequest />} />
     
        <Route path="/post-referral-bounty" element={<PostReferralBounty />} />
        <Route path="/prb" element={<PostReferralBounty />} />
        
        <Route path="/referral" element={<PostReferral />} />
        <Route path="/quick-apply" element={<QuickApplyTalent />} />
        <Route path="/talent-pitch" element={<TalentPitch />} />
        <Route path="/get-started" element={<TalentStart />} />
        <Route path="/profile/:avatarString" element={<TalentProfilePage />} />
        <Route path="/meet/:pageSlug" element={<GatedTimePage />} />
  
        <Route path="/gated" element={<GatedPage />} />
        <Route path="/gated-test" element={<GatedTestPage />} />

        <Route path="/wallet/:walletAddress" element={<WalletPage />} />
        <Route path="/:chain/:contractAddress/:tokenId" element={<NftDetailCurationPage />} />


        <Route path="/profile" element={<AuthorPage />} />

        <Route path="/claim" element={<Claim />} />



        <Route path="/success-talent" element={<QuickApplyTalent />} />
        <Route path="/create-onchain-idenity" element={<CreateNFTLock />} />


        <Route path="/create" element={<CreateNFTLock />} />
        <Route path="/gate" element={<CreateNFTLock />} />
        <Route path="/create-onchain-idenity" element={<CreateNFTLock />} />
        <Route path="/nft-detail" element={<NftDetailPage2 />} />
        <Route path="/nft-detail/:tokenId" element={<NftDetailPage />} />
        <Route path="/connect-wallet" element={<PageConnectWallet />} />
        <Route path="/search" element={<PageSearch />} />
        <Route path="/marketplace" element={<PageSearch />} />

        <Route path="/talent-profile" element={<AuthorPage />} />

        <Route path="/create-nft" element={<PageUploadItem />} />
      
        <Route path="/linkedin" element={<LinkedInCallback />} />
        <Route path="/page-collection" element={<PageCollection />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/blog-single" element={<BlogSingle />} />
        <Route path="/contact" element={<PageContact />} />
        <Route path="/signup" element={<PageSignUp />} />
        <Route path="/about" element={<PageAbout />} />
        <Route path="/subscription" element={<PageSubcription />} />
        <Route path="/login" element={<PageLogin />} />
     
        {/* {pages.map(({ component, path, exact }) => {
          return (
            <Route
              key={path}
              // component={component}
              element={component as unknown as ReactNode}
              // exact={!!exact}
              path={path}
            />
          );
        })} */}
        <Route element={Page404 as unknown as ReactNode} />
      </Routes>
      <Footer />
   
    </BrowserRouter>
  );
};

export default App;
