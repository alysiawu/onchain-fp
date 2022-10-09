import Heading from "shared/Heading/Heading";
import NcImage from "shared/NcImage/NcImage";
import NcPlayIcon from "shared/NcPlayIcon/NcPlayIcon";
import React, { FC, useState } from "react";
import isSafariBrowser from "utils/isSafariBrowser";

export interface VideoType {
  id: string;
  title: string;
  thumbnail: string;
}

export interface SectionVideosProps {
  videos?: VideoType[];
  className?: string;
}

const VIDEOS_DEMO: VideoType[] = [
  {
    id: "RzVvThhjAKw",
    title: "Access the right information from the right people",
    thumbnail:
      "https://i.postimg.cc/SKvKGVBK/Screen-Shot-2022-10-04-at-12-36-54-AM.png",
  },
];

const SectionVideosDemo: FC<SectionVideosProps> = ({
  videos = VIDEOS_DEMO,
  className = "mb-10",
}) => {
  const [isPlay, setIsPlay] = useState(false);
  const [currentVideo] = useState(0);

  const renderMainVideo = () => {
    const video: VideoType = videos[currentVideo];
    return (
      <div
        className="group aspect-w-16 aspect-h-16 sm:aspect-h-9 bg-neutral-800 rounded-3xl overflow-hidden border-4 border-white dark:border-neutral-900 sm:rounded-[50px] sm:border-[10px] z-0"
        title={video.title}
      >
        {isPlay ? (
          // <iframe
          //   src={`https://www.youtube.com/embed/${video.id}?autoplay=1${
          //     isSafariBrowser() ? "&mute=1" : ""
          //   }`}
          //   title={video.title}
          //   frameBorder="0"
          //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          //   allowFullScreen
          //   className="rounded-3xl"
          // ></iframe>

          <iframe 
            src="https://www.youtube.com/embed/QqvopUgrC4k" title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            frameBorder="0" 
            allowFullScreen
            className="rounded-3xl"
          >

          </iframe>
        ) : (
          <>
            <div
              onClick={() => setIsPlay(true)}
              className="cursor-pointer absolute inset-0 flex items-center justify-center z-10"
            >
              <NcPlayIcon />
            </div>
            <NcImage
              containerClassName="absolute inset-0 rounded-3xl overflow-hidden z-0"
              className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-300  "
              src={video.thumbnail}
              title={video.title}
              alt={video.title}
            />
          </>
        )}
      </div>
    );
  };
  // # 1 rule of Websan club is we dont talk about web san club.
  return (
    <div className={`nc-SectionVideos ${className}`} 
    style={{
      
    }}
    >
        <h2 className="font-semibold text-3xl md:text-4xl xl:text-6xl !leading-[114%] mb-10" style={{
          fontSize: '2rem'
        }}>
                     ✨    Monetize your knowledge, information, attention and time ✨
           
      </h2>

      <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 mb-10">
            {/* Starting with compensation data */}
            {/* Upload your W2 and we will pay you $100 */}
            {/* Get by giving */}
            {/* a lewk is a personal style signature so individual it’s almost indivisible from you */}
            {/* A lewk refers to someone’s fashion or style, in particular how someone is different from the norm and other people */}

            {/* A lewk is how your are different from the norm and other people */}
            {/* Bring NFTs from blockchains to you! */}

            Peer to peer value exchange enabled by the blockchain
            {/* , you and your communities. */}
      </span>
      <div className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 mb-10">
            {/* Starting with compensation data */}
            {/* Upload your W2 and we will pay you $100 */}
            {/* Get by giving */}
            {/* a lewk is a personal style signature so individual it’s almost indivisible from you */}
            {/* A lewk refers to someone’s fashion or style, in particular how someone is different from the norm and other people */}

            {/* A lewk is how your are different from the norm and other people */}
            {/* Bring NFTs from blockchains to you! */}
            {/* ❤️ So you can create meaningful interactions between you and your communities. ❤️ */}
      </div>
      <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 mb-10">          
      </span>
      <h2 className="font-semibold text-4xl md:text-5xl xl:text-6xl !leading-[114%] ">

      </h2>

      {/* <Heading
        desc='Bring NFTs from blockchains to you!'
      > */}
        {/* Future Protocol's Exclusive Club */}
        {/* Supercharge your multi-chains NFTs
 */}
      {/* </Heading> */}

    
      {/* <a style={{background: '#19FDA6', padding: '12px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111'}} href={'https://discord.gg/bGq3zG7t77'} >Join our Discord for updates</a> */}

      <div className="flex flex-col relative sm:pr-4 sm:py-4 md:pr-6 md:py-6 xl:pr-14 xl:py-14 lg:flex-row">
        <div className="absolute -top-4 -bottom-4 -right-4 w-2/3 rounded-3xl bg-primary-100 z-0 sm:rounded-[50px] md:top-0 md:bottom-0 md:right-0 xl:w-7/12 dark:bg-neutral-800/80"></div>
        <div className="flex-grow relative  ">{renderMainVideo()}</div>
      </div>
    </div>
  );
};

export default SectionVideosDemo;
