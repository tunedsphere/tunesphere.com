import { FC } from "react";
import { IconProps } from "./index";
export const MarkdownIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      viewBox="0 0 416 256"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M30 20C24.4772 20 20 24.4772 20 30V226C20 231.523 24.4772 236 30 236H386C391.523 236 396 231.523 396 226V30C396 24.4772 391.523 20 386 20H30ZM0 30C0 13.4315 13.4315 0 30 0H386C402.569 0 416 13.4315 416 30V226C416 242.569 402.569 256 386 256H30C13.4315 256 0 242.569 0 226V30Z" />
      <path d="M60 196V60H100L140 110L180 60H220V196H180V118L140 168L100 118V196H60ZM310 196L250 130H290V60H330V130H370L310 196Z" />
    </svg>
  );
};
