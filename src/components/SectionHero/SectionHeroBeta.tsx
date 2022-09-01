import React, { FC } from "react";
// import imagePng from "images/hero-right-4.png";
import devprofile from "images/dev_profile.png";
// import ButtonPrimary from "shared/Button/ButtonPrimary";
// import HeroSearchForm from "components/HeroSearchForm/HeroSearchForm";
import { useNavigate } from "react-router-dom";
import FormItem from "components/FormItem";
import Input from "shared/Input/Input";
import HeroSearchForm from "components/HeroSearchForm/HeroSearchForm";

export interface SectionHero2Props {
  children?: React.ReactNode;
  className?: string;
}

const SectionHeroBeta: FC<SectionHero2Props> = ({ className = "", children }) => {
  const navigate = useNavigate()
  return (
    <div
      className={`nc-SectionHero2 flex flex-col-reverse lg:flex-col relative ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 sm:space-y-10 pb-14 lg:pb-36 xl:pb-60 xl:pr-14 lg:mr-10 xl:mr-0">
          <h2 className="font-semibold text-4xl md:text-5xl xl:text-6xl !leading-[114%] ">
            {/* Turn your priced information on chain into capital 💰, pseudonymously ㊙️ */}

            Future is about to put your jobs, professional identity, and reputation on-chain
            {/* A wallet identity based pseudonymous compensation data marketplace to empower fair compensation and equity for decentralized future of work.  */}

          </h2>
          <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            {/* Starting with compensation data */}
            {/* Upload your W2 and we will pay you $100 */}
            {/* Get by giving */}
             <br />{" "}
            {/* Creative your NTFs and sell them */}
          </span>
          {/* <a style={{background: '#39f889', padding: '12px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}} href={'https://discord.gg/bGq3zG7t77'} >Join our Community</a> */}
{/* 
          <FormItem label="Choose your pseudonym  *">
                    <Input 
                        // className={errorInput.avatarString ? 'error' : ''}
                        type='text'
                        placeholder=""
                            defaultValue="" 
                            onChange={
                            (e) => {
                                // checkIsAvarAvail(e.target.value)

                            //     updateFormInput({
                            //     ...formInput,
                            //     avatarString: e.target.value,
                            // })
                            }
                        }
                    />
               
                    </FormItem> */}


                    
          {/* <ButtonPrimary 
          onClick={() => {
            navigate('/connect-wallet')
          }}>
            <span>Join Community</span> */}
            {/* <span> */}
              {/* <svg className="w-5 h-5 ml-2.5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 22L20 20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg> */}
            {/* </span> */}
          {/* </ButtonPrimary> */}
        </div>
        <div className="flex-grow">
          <img className="w-full" src={devprofile} alt="hero" />
        </div>
      </div>

      {/* <div className="z-10 mb-12 lg:mb-0 lg:-mt-20 xl:-mt-48 w-full">
        <HeroSearchForm />
      </div> */}
    </div>
  );
};

export default SectionHeroBeta;
