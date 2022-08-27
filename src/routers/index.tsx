import React, { ReactNode } from "react";
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
        <Route path="/" element={<PageHome2 />} />
        <Route path="/#" element={<PageHome2 />} />
        <Route path="/jobs" element={<JobsSearch />} />
        <Route path="/interviewer-onboarding" element={<InterviewerOnboarding />} />


        <Route path="/post-job" element={<PostJob />} />
        <Route path="/quick-apply" element={<QuickApplyTalent />} />
        <Route path="/talent-pitch" element={<TalentPitch />} />
        <Route path="/get-started" element={<TalentStart />} />
        <Route path="/:avatarString" element={<TalentProfilePage />} />

        <Route path="/profile" element={<AuthorPage />} />



        <Route path="/sucess-talent" element={<QuickApplyTalent />} />
        <Route path="/create-onchain-idenity" element={<CreateNFTLock />} />


        <Route path="/create" element={<CreateNFTLock />} />
        <Route path="/create-onchain-idenity" element={<CreateNFTLock />} />
        <Route path="/nft-detail" element={<NftDetailPage2 />} />
        <Route path="/nft-detail/:tokenId" element={<NftDetailPage />} />
        <Route path="/connect-wallet" element={<PageConnectWallet />} />
        <Route path="/search" element={<PageSearch />} />
    

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
