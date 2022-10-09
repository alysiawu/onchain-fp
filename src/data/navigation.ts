import { NavItemType } from "shared/Navigation/NavigationItem";
import ncNanoId from "utils/ncNanoId";

const otherPageChildMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Home",
  },
  // {
  //   id: ncNanoId(),
  //   href: "/home2",
  //   name: "Home Demo 2",
  // },
  // {
  //   id: ncNanoId(),
  //   href: "/home3",
  //   name: "Home Demo 3",
  // },
  // {
  //   id: ncNanoId(),
  //   href: "/page-collection",
  //   name: "Collection page",
  // },
  {
    id: ncNanoId(),
    href: "/search",
    name: "Search page",
  },
  {
    id: ncNanoId(),
    href: "/profile",
    name: "Author Profile",
  },
  {
    id: ncNanoId(),
    href: "/nft-detail",
    name: "NFT detail",
  },
  {
    id: ncNanoId(),
    href: "/account",
    name: "Account settings",
  },
  {
    id: ncNanoId(),
    href: "/create",
    name: "Upload Item",
  },
  {
    id: ncNanoId(),
    href: "/connect-wallet",
    name: "Sign in with wallet",
  },

  {
    id: ncNanoId(),
    href: "/about",
    name: "Other Pages",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/about",
        name: "About",
      },
      {
        id: ncNanoId(),
        href: "/contact",
        name: "Contact us",
      },
      {
        id: ncNanoId(),
        href: "/login",
        name: "Login",
      },
      {
        id: ncNanoId(),
        href: "/signup",
        name: "Signup",
      },
      {
        id: ncNanoId(),
        href: "/subscription",
        name: "Subscription",
      },
    ],
  },
  {
    id: ncNanoId(),
    href: "/blog",
    name: "Blog Page",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/blog",
        name: "Blog Page",
      },
      {
        id: ncNanoId(),
        href: "/blog-single",
        name: "Blog Single",
      },
    ],
  },
];

export const NAVIGATION_DEMO_2: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/search",
    name: "Discover",
    // type: "dropdown",
    // children: otherPageChildMenus,
  },
  // {
  //   id: ncNanoId(),
  //   href: "/linkedin",
  //   name: "Log in with Linkedin",
  // },
];
