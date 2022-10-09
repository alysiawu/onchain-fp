import React, { FC, useEffect, useId, useRef } from "react";
import Heading from "components/Heading/Heading";
import Glide from "@glidejs/glide";
import CardCategory5 from "components/CardCategory5/CardCategory5";
import { nftsCatImgs } from "contains/fakeData";
import CardCategory1 from "components/CardCategory1/CardCategory1";

export interface SectionSliderCategoriesProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
  data: any;

  category: string;
}

const ntfsCatNames = [
  "Arts",
  "Entertainment",
  "Music",
  "News",
  "Science",
  "Sports",
  "Technology",
];

const CommunitiesRow: FC<SectionSliderCategoriesProps> = ({
  heading,
  subHeading = "",
  className = "",
  itemClassName = "",
  data,
  category
}) => {
  const sliderRef = useRef(null);
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");

  const {
      name,
      utitity,
      price,
      link,
      communityId
  } = data

  useEffect(() => {
    if (!sliderRef.current) {
      return;
    }

    const OPTIONS: Glide.Options = {
      perView: 5,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: 4,
        },
        1024: {
          gap: 20,
          perView: 3.4,
        },
        768: {
          gap: 20,
          perView: 3,
        },
        640: {
          gap: 20,
          perView: 2.3,
        },
        500: {
          gap: 20,
          perView: 1.4,
        },
      },
    };

    let slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
    slider.mount();
    // @ts-ignore
    return () => slider.destroy();
  }, [sliderRef, UNIQUE_CLASS]);
  console.log('--data', data)
  return (
    <div className={`nc-SectionSliderCategories ${className}`}>
      <div className={`${UNIQUE_CLASS} flow-root`} ref={sliderRef}>
        <Heading desc={subHeading} hasNextPrev>
          {category}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {(data as {
                name: string;
                image: string;
                utility: string;
                price: string;
                benefits: string;
                link: string;
                communityId: string;
                
            }[]).map((communityData, index) => (
              <li key={index} className={`glide__slide ${itemClassName}`}>
                <CardCategory5
                  index={index}
                  featuredImage={communityData.image}
                  name={communityData.name}
                  link={communityData.link}
                  communityId={communityData.communityId}
      
                benefits={communityData.benefits}
                communityData={communityData}
      

                />
              </li>
            ))}
          </ul>
        </div>
      </div>

  
    </div>
  );
};

export default CommunitiesRow;
