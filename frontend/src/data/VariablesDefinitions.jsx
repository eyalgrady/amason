import React from "react";
import slide1 from "../images/free-shipping.jpg";
import slide2 from "../images/beauty.jpg";
import slide3 from "../images/toys.jpg";
import slide4 from "../images/kitchen.jpg";
import slide5 from "../images/books.jpg";

export const IMAGES = [
  { url: slide1, alt: "slide1" },
  { url: slide2, alt: "slide2" },
  { url: slide3, alt: "slide3" },
  { url: slide4, alt: "slide4" },
  { url: slide5, alt: "slide5" },
];

export const RoleTypes = {
  none: 0,
  user: 1,
  business: 2,
  admin: 3,
};

export const checkPermissions = (permissions, userRoleType) => {
  return permissions.includes(userRoleType);
};

export const GeneralContext = React.createContext();
