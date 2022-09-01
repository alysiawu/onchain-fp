import React, { useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import { FC } from "react";
import PropertyTypeSelect from "./PropertyTypeSelect";
import PriceRangeInput from "./PriceRangeInput";
import ItemTypeSelect from "./ItemTypeSelect";
import ButtonSubmit from "./ButtonSubmit";
import AvatarString from "./AvatartNameInput";
import AvatarSearchSubmit from "./AvatarSearchSubmit";
import { Link } from "react-router-dom";

export interface NftSearchFormProps {
  haveDefaultValue?: boolean;
}

// DEFAULT DATA FOR ARCHIVE PAGE


const PseudonymSearchForm: FC<NftSearchFormProps> = ({
  haveDefaultValue = false,
}) => {
  const [avatarString, setAvatarString] = useState("");

  //
  useEffect(() => {
    if (haveDefaultValue) {
        setAvatarString('');
    }
  }, [haveDefaultValue]);
  //

  const renderForm = () => {
    return (
      <form className="w-full relative xl:mt-8 flex flex-col lg:flex-row rounded-[30px] md:rounded-[36px] lg:rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700 lg:divide-y-0">
        <AvatarString
          defaultValue={avatarString}
          onChange={(e) => setAvatarString(e)}
          className="flex-1 lg:flex-[1.5]"
        />

        {/* <ItemTypeSelect /> */}
        {/* <PropertyTypeSelect /> */}
        {/* <PriceRangeInput /> */}

        <div className="sm:pr-1 md:pr-2 xl:pr-4 flex items-center">
            {/* <AvatarSearchSubmit /> */}
            <Link
                to={`/search-pro?searchTerm=${avatarString}`}
                type="button"
                className="h-14 px-4 md:h-16 w-full md:w-16 rounded-full bg-primary-6000 hover:bg-primary-700 flex items-center justify-center text-neutral-50 focus:outline-none"
                >
                <span className="mr-3 md:hidden">Search</span>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
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
                </svg>
                </Link>
        </div>

        {/* BUTTON SUBMIT OF FORM */}
      </form>
    );
  };

  return renderForm();
};

export default PseudonymSearchForm;
