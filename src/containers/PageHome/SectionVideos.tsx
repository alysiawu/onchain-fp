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
    title: "Join Future Protocol's Exclusive Talent Club",
    thumbnail:
      "https://i.postimg.cc/KjTWgVMt/splash.png",
  },
];

const SectionVideos: FC<SectionVideosProps> = ({
  videos = VIDEOS_DEMO,
  className = "",
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
            src="https://www.youtube.com/embed/Klcf7EqlEkM" title="YouTube video player" 
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
    <div className={`nc-SectionVideos ${className}`}>
      <Heading
        desc='Turn the data you have into currency.'
      >
        Future Protocol's Exclusive Club
      </Heading>
      <a style={{background: '#39f889', padding: '12px', 'boxShadow': '0 0 50px #39f889', borderRadius: '20px', color: '#111'}} href={'https://discord.gg/bGq3zG7t77'} >Join our Discord for updates</a>

      <div className="flex flex-col relative sm:pr-4 sm:py-4 md:pr-6 md:py-6 xl:pr-14 xl:py-14 lg:flex-row">
        <div className="absolute -top-4 -bottom-4 -right-4 w-2/3 rounded-3xl bg-primary-100 z-0 sm:rounded-[50px] md:top-0 md:bottom-0 md:right-0 xl:w-7/12 dark:bg-neutral-800/80"></div>
        <div className="flex-grow relative  ">{renderMainVideo()}</div>
      </div>
    </div>
  );
};

export default SectionVideos;
