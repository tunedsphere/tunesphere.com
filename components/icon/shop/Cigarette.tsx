import { FC } from "react";
import { ShopIconsProps } from "./index";
export const CigaretteIcon: FC<ShopIconsProps> = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 12H2v4h16" />
      <path d="M22 12v4" />
      <path d="M7 12v4" />
      <path d="M18 8c0-2.5-2-2.5-2-5" />
      <path d="M22 8c0-2.5-2-2.5-2-5" />
    </svg>
  );
};
