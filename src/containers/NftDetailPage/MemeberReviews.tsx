import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { marketplace as marketplaceAddress } from '../../utils/constants'

export default function AccordionInfo({nft}: {nft?: any}) {
const TextSpan = ({ title, content}: {title: string; content: string}) => {
  if (!title || !content) return (<></>)
  return (
    <div>
        <span>{title}</span>
        <span className="text-base text-neutral-900 dark:text-neutral-100 line-clamp-1">
          {/* 0x50f5474724e0ee42d9a4e711ccfb275809fd6d4a */}
          {content}

        </span>
    
    </div>
   
  )
}
  return (
    <div className="w-full rounded-2xl">
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 font-medium text-left bg-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-500 rounded-lg hover:bg-neutral-200 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75">
              <span>Descriptions</span>
              <ChevronUpIcon
                className={`${
                  open ? "transform rotate-180" : ""
                } w-5 h-5 text-neutral-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel
              className="px-4 pt-4 pb-2 text-neutral-500 text-sm dark:text-neutral-400"
              as="p"
            >
              {/* Tattooed Kitty Gang (“TKG”) is a collection of 666 badass kitty
              gangsters, with symbol of tattoos, living in the Proud Kitty Gang
              (“PKG”) metaverse. Each TKG is an 1/1 ID as gangster member & all
              the joint rights. */}
              {/* Skill NFT seller {nft.seller} */}

            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure defaultOpen as="div" className="mt-5 md:mt-8">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 font-medium text-left bg-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-500 rounded-lg hover:bg-neutral-200 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75">
              <span>Details</span>
              <ChevronUpIcon
                className={`${
                  open ? "transform rotate-180" : ""
                } w-5 h-5 text-neutral-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 flex flex-col text-xs text-neutral-500 dark:text-neutral-400 overflow-hidden">
              {/* <span>2000 x 2000 px.IMAGE(685KB)</span> */}
              <br />
              
              <span>Contract Address</span>
              <span className="text-base text-neutral-900 dark:text-neutral-100 line-clamp-1">
                {/* 0x50f5474724e0ee42d9a4e711ccfb275809fd6d4a */}
                {/* {marketplaceAddress} */}

              </span>


              {/* <TextSpan title='Title' content={nft.metaData.title} /> */}
              <br />
              {/* <TextSpan title='Company' content= {nft.metaData.company} /> */}
              <br />
              {/* <TextSpan title='Year of Experience' content= {nft.metaData.yearOfExperience} /> */}
              <br />
              {/* <TextSpan title='Skill Value Add' content={nft.metaData.skillValueAdd} /> */}
              <br />
              {/* <TextSpan title='Job Family' content={nft.metaData.jobFamily} /> */}
              <br />




              
             
              
              

              <span>Contract Address</span>
              <span className="text-base text-neutral-900 dark:text-neutral-100 line-clamp-1">
                {/* 0x50f5474724e0ee42d9a4e711ccfb275809fd6d4a */}
                {/* {marketplaceAddress} */}

              </span>

              <br />
              <span>Token ID</span>
              <span className="text-base text-neutral-900 dark:text-neutral-100">
                {/* 100300372864 */}
                {/* {nft.tokenId} */}
              </span>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
