import React, { FC } from "react";
import NcImage from "shared/NcImage/NcImage";
import data_money from "images/data_money.gif";
// import rightLargeImgDark from "images/rightLargeImgDark.jpeg";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Logo from "shared/Logo/Logo";
// import ButtonSecondary from "shared/Button/ButtonSecondary";

export interface SectionBecomeAnAuthorProps {
  className?: string;
}

const SectionBecomeAnAuthor: FC<SectionBecomeAnAuthorProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`nc-SectionBecomeAnAuthor relative flex flex-col lg:flex-row items-center  ${className}`}
      data-nc-id="SectionBecomeAnAuthor"
    >
      <div className="flex-shrink-0 mb-16 lg:mb-0 lg:mr-10 lg:w-2/5">
        {/* <Logo className="w-28" /> */}
        <h2 className="font-semibold text-3xl sm:text-4xl xl:text-6xl mt-6 sm:mt-10 !leading-[1.112] tracking-tight">
        {/* a protocol to help Talent building their first on chain professional identity with composable NFTs, or in a sense  */}
        Build your first 
        skills wallet

          {/* Talent Nation by Future Protocol */}
        </h2>
        <span className="block mt-6 text-neutral-500 dark:text-neutral-400 ">
          {/* Take control of your negotiation power */}
        </span>
        <div className="flex space-x-2 sm:space-x-5 mt-6 sm:mt-12">
          {/* <ButtonPrimary href="/create" className="" >
            Create Salary NFT
          </ButtonPrimary> */}

          <a style={{background: '#39ff14', padding: '12px', 'boxShadow': '0 0 50px #39ff14', borderRadius: '20px', color: '#111'}} href={'https://discord.gg/bGq3zG7t77'} >Join our Discord for updates</a>
          {/* <ButtonSecondary href="/search" className="">
            Discover more
          </ButtonSecondary> */}
        </div>
      </div>
      <div className="flex-grow">
        <NcImage containerClassName="block dark:hidden" src={data_money} />
        <NcImage
          containerClassName="hidden dark:block"
          src={data_money}
        />
      </div>
    </div>
  );
};

export default SectionBecomeAnAuthor;
