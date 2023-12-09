import { FC } from "react";
import { IconProps } from "./index";
export const CheckCircleIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9286 1.69641C9.19589 1.69641 6.57514 2.78196 4.64285 4.71426C2.71055 6.64655 1.625 9.26731 1.625 12C1.625 13.3531 1.89151 14.6929 2.40931 15.943C2.92712 17.1931 3.68607 18.3289 4.64285 19.2857C5.59962 20.2425 6.73548 21.0014 7.98557 21.5192C9.23565 22.037 10.5755 22.3036 11.9286 22.3036C13.2817 22.3036 14.6215 22.037 15.8716 21.5192C17.1217 21.0014 18.2575 20.2425 19.2143 19.2857C20.1711 18.3289 20.93 17.1931 21.4478 15.943C21.9656 14.6929 22.2321 13.3531 22.2321 12C22.2321 9.26731 21.1466 6.64655 19.2143 4.71426C17.282 2.78196 14.6612 1.69641 11.9286 1.69641ZM3.75896 3.83037C5.92568 1.66366 8.86437 0.446411 11.9286 0.446411C14.9928 0.446411 17.9315 1.66366 20.0982 3.83037C22.2649 5.99709 23.4821 8.93578 23.4821 12C23.4821 13.5172 23.1833 15.0196 22.6027 16.4213C22.0221 17.8231 21.171 19.0967 20.0982 20.1696C19.0253 21.2424 17.7517 22.0935 16.3499 22.6741C14.9482 23.2547 13.4458 23.5536 11.9286 23.5536C10.4113 23.5536 8.90896 23.2547 7.50721 22.6741C6.10547 22.0935 4.83181 21.2424 3.75896 20.1696C2.68611 19.0967 1.83508 17.8231 1.25446 16.4213C0.673842 15.0196 0.375 13.5172 0.375 12C0.375 8.93578 1.59225 5.99709 3.75896 3.83037ZM16.0134 9.12947C16.2574 9.37355 16.2574 9.76927 16.0134 10.0134L11.1562 14.8705C10.9121 15.1146 10.5164 15.1146 10.2723 14.8705L7.84377 12.4419C7.5997 12.1978 7.59969 11.8021 7.84377 11.558C8.08785 11.314 8.48358 11.314 8.72766 11.558L10.7143 13.5447L15.1295 9.12947C15.3736 8.88539 15.7693 8.88539 16.0134 9.12947Z"
      />
    </svg>
  );
};
