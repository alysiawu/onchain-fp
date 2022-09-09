import React from "react";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Logo from "shared/Logo/Logo";
import { Disclosure } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { NavItemType } from "./NavigationItem";
import { NAVIGATION_DEMO_2 } from "data/navigation";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import SocialsList from "shared/SocialsList/SocialsList";
import { ChevronDownIcon } from "@heroicons/react/solid";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { trackEvent } from "utils/tracking";
import {  useNavigate } from "react-router-dom";

export interface NavMobileProps {
  data?: NavItemType[];
  onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({
  data = NAVIGATION_DEMO_2,
  onClickClose,
}) => {
  const navigate  = useNavigate()
  const _renderMenuChild = (item: NavItemType) => {
    return (
      <ul className="nav-mobile-sub-menu pl-6 pb-1 text-base">
        {item.children?.map((i, index) => (
          <Disclosure key={i.href + index} as="li">
            <NavLink
              // exact
              // strict
              to={{
                pathname: i.href || undefined,
              }}
              className="flex px-4 py-2.5 text-neutral-900 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-[2px]"
              // activeClassName="text-secondary"
            >
              <span
                className={!i.children ? "block w-full" : ""}
                onClick={onClickClose}
              >
                {i.name}
              </span>
              {i.children && (
                <span
                  className="block flex-grow"
                  onClick={(e) => e.preventDefault()}
                >
                  <Disclosure.Button
                    as="span"
                    className="flex justify-end flex-grow"
                  >
                    <ChevronDownIcon
                      className="ml-2 h-4 w-4 text-neutral-500"
                      aria-hidden="true"
                    />
                  </Disclosure.Button>
                </span>
              )}
            </NavLink>
            {i.children && (
              <Disclosure.Panel>{_renderMenuChild(i)}</Disclosure.Panel>
            )}
          </Disclosure>
        ))}
      </ul>
    );
  };

  const _renderItem = (item: NavItemType, index: number) => {
    return (
      <Disclosure
        key={item.id}
        as="li"
        className="text-neutral-900 dark:text-white"
      >
        <NavLink
          // exact
          // strict
          className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
          to={{
            pathname: item.href || undefined,
          }}
          // activeClassName="text-secondary"
        >
          <span
            className={!item.children ? "block w-full" : ""}
            onClick={onClickClose}
          >
            {item.name}
          </span>
          {item.children && (
            <span
              className="block flex-grow"
              onClick={(e) => e.preventDefault()}
            >
              <Disclosure.Button
                as="span"
                className="flex justify-end flex-grow"
              >
                <ChevronDownIcon
                  className="ml-2 h-4 w-4 text-neutral-500"
                  aria-hidden="true"
                />
              </Disclosure.Button>
            </span>
          )}
        </NavLink>
        {item.children && (
          <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
        )}
      </Disclosure>
    );
  };

  const clickQuickApply = () => {


     
    trackEvent('MobileNav_ClickRequest', {
       
    })

    navigate('/referral-req', {
        state: {
            oppo: {

            }
        }
    })
    
}


const goToQuickApply = () => {


     


  navigate('/quick-apply', {
      state: {
          oppo: {

          }
      }
  })
  
}


const MenuItem = ({ copy, link}: {copy: string; link: string}) => {

  return (
    <div className="flex items-center py-3 justify-between px-5">
        <a style={{background: '#39f889', padding: '10px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}} href={link} > {copy}</a>
    </div>
  )
}
  return (
    <div className="overflow-y-auto w-full max-w-sm h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
      <div className="py-6 px-5">
        <Logo />
        <div className="flex flex-col mt-5 text-neutral-700 dark:text-neutral-300 text-sm">
          <span>
            From cog in the wheel to owning your destiny! 
    
          </span>
          <span>
           
          At Future Protocol, we bring your professional identity on chain and showoff your expertise and knowledge, and guide you on web3 learning journey. 
          </span>

          <div className="flex justify-between items-center mt-4">
            <SocialsList itemClass="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xl" />
            <span className="block">
              <SwitchDarkMode className="bg-neutral-100 dark:bg-neutral-800" />
            </span>
          </div>
        </div>
        <span className="absolute right-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>
      </div>
      {/* <ul className="flex flex-col py-6 px-2 space-y-1">
        {data.map(_renderItem)}
      </ul> */}
  

                
            <MenuItem  copy="Our Why" link='/our-why'/>
          

            <MenuItem  copy="Join our Community" link='https://discord.gg/bGq3zG7t77'/>

            <MenuItem  copy="Mint your achievement" link='/create'/>   
            <MenuItem  copy="Exlpore" link='/search'/> 


                
      <MenuItem  copy="Interview2Earn" link='/interviewer-onboarding'/>
      <MenuItem  copy="Join our Talent Nation" link='/quick-apply'/>
      <MenuItem  copy="Partner & Investor" link='https://zcal.co/i/QJ9_dMGJ'/>
      <MenuItem  copy="Join our Discord & Grow together" link='https://discord.gg/bGq3zG7t77'/>



       <div className="flex flex-col mt-5 text-neutral-700 dark:text-neutral-300 text-xl">
          <span>
            Talent
          </span>
      </div>
{/* 
      <div className="flex items-center py-3 justify-between px-5">
        <a style={{background: '#39f889', padding: '10px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}} href={'/'} ></a>
      </div> */}
      <MenuItem  copy="Role Based Referral Request" link="/request-a-referral"/>
      <MenuItem  copy="Talk to Hiring Managers" link="/hiring-managers"/>
      <MenuItem  copy="Talk to Industry Insiders" link="/industry-insiders"/>

      {/* <a style={{background: '#39f889', padding: '10px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}} href={'/request-a-referral'} >Talk to Hiring Managers</a> */}
      <MenuItem  copy="Available Referrals Opportunities" link="/referral-oppos"/>
      <MenuItem  copy="Claim Your Personal Resume Page" link="/claim"/>
      <MenuItem  copy="Create Skill NFT" link="/create"/>
      <MenuItem  copy="Create Achievement NFT" link="/create"/>
      <MenuItem  copy="Fast Track" link="/talent-pitch"/>
      <MenuItem  copy="Join Web三DAO" link="https://www.web3talents.co/"/>

      {/* <div className="flex items-center py-3 justify-between px-5">
        <a style={{background: '#39f889', padding: '10px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}} href={'/claim'} >Claim Your Personal Resume Page</a>
      </div>
      <div className="flex items-center py-3 justify-between px-5">
          <a style={{background: '#39f889', padding: '10px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}} href={'/create'} > Create Skill NFT</a>
      </div> */}


      

      <div className="flex flex-col mt-5 text-neutral-700 dark:text-neutral-300 text-xl">
          <span>
           Hiring
          </span>
      </div>

      <MenuItem  copy="Post a Referral Bounty" link="/referral"/>
      {/* <MenuItem  copy="Join Web3Recruits" link="/claim"/>
      <MenuItem  copy="Create Skill NFT" link="/create"/>
      <MenuItem  copy="Create Achievement NFT" link="/create"/> */}
      <MenuItem  copy="Join Web3Recruits" link="''https://www.web3recruits.xyz/"/>



      <div className="flex flex-col mt-5 text-neutral-700 dark:text-neutral-300 text-xl">
          <span>
            {/* Advocate & Connect & Earn */}
            Community
          </span>
      </div>

      {/* <MenuItem  copy="Refer2Earn" link="/referral"/> */}
      {/* <MenuItem  copy="Join Web3Recruits" link="/claim"/>
      <MenuItem  copy="Create Skill NFT" link="/create"/>
      <MenuItem  copy="Create Achievement NFT" link="/create"/> */}
     
      <MenuItem  copy="Interview2Earn" link='/interviewer-onboarding'/>
      <MenuItem  copy="Join our Talent Nation" link='/quick-apply'/>
      <MenuItem  copy="Partner & Investor" link='https://zcal.co/i/QJ9_dMGJ'/>
      <MenuItem  copy="Join our Discord & Grow together" link='https://discord.gg/bGq3zG7t77'/>

      {/* <MenuItem  copy="Join our Pool" link='quick-apply'/> */}

      {/* <div className="flex items-center py-3 justify-between px-5">
        <a style={{background: '#39f889', padding: '10px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}} href={'/referral-oppos'} >Request Referrals</a>
        <div></div>
      </div> */}

{/*   
      <div className="flex items-center py-3 justify-between px-5">
        <a style={{background: '#39f889', padding: '10px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}} href={'/referral'} >Refer2Earn</a>
        <div></div>
      </div> */}

      {/* <div className="flex items-center justify-between py-3 px-5 space-x-2">
          <a style={{background: '#39f889', padding: '10px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}} href={'/quick-apply'} >Join our Pool</a>
          <div></div>
      </div> */}


      {/* <div className="flex items-center justify-between py-3 px-5 space-x-2">
        <a style={{background: '#39f889', padding: '10px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}} href={'/interviewer-onboarding'} >Be an Interviewer</a>
            <div></div>
      </div> */}

      
      {/* <div className="flex items-center justify-between py-3 px-5 space-x-2">
        <a style={{background: '#39f889', padding: '10px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}} href={'https://www.web3recruits.xyz/'} >Web三DAO</a>
            <div></div>
      </div> */}
{/* 
      <div className="flex items-center justify-between py-3 px-5 space-x-2">
         <a style={{background: '#39f889', padding: '10px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}} href={'/post-referral-bounty'} >Post a Referral Bounty</a>
            <div></div>
      </div> */}

      <div className="flex items-center justify-between py-3 px-5 space-x-2">
        <a style={{background: '#39f889', padding: '10px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}} href={'https://discord.gg/bGq3zG7t77'} >Join our Discord</a>
        <div></div>
      </div>

      <div className="flex items-center justify-between py-3 px-5 space-x-2">
          <a style={{background: '#39f889', padding: '10px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}} href={'/connect-wallet'} >Connect Wallet</a>
          <div></div>
      </div>


   


      {/* <div className="pt-2 flex flex-col sm:flex-row space-y-3 sm:space-y-0 space-x-0 sm:space-x-3 "> */}

      {/* <a style={{background: '#39f889', padding: '10px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}} href='/quick-apply' >Done</a> */}
      {/* </div> */}
        <div className="flex items-center justify-between py-6 px-5 space-x-2">
      {/* <a style={{background: '#39f889', padding: '12px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}} onClick={clickQuickApply} >Request Referral</a> */}
        {/* <ButtonPrimary href={"/create"} className="!px-10">
          Create Skill NFT
        </ButtonPrimary> */}

{/* <a style={{background: '#39f889', padding: '10px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}} href={'/create'} > Create Skill NFT</a>
            <div></div> */}
{/* 
            <a style={{background: '#39f889', padding: '10px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}} href={'/connect-wallet'} >Connect Wallet</a>
            <div></div> */}
        {/* <ButtonSecondary href={"/connect-wallet"} className="flex-1">
          Connect Wallet
        </ButtonSecondary> */}
      </div>
    </div>
  );
};

export default NavMobile;
