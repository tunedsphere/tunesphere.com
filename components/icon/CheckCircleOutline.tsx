import { FC } from "react";
import { IconProps } from "./index";
export const CheckCircleOutlineIcon: FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 512 512"
      {...props}
    >
      <path d="M235.3 331.3C229.1 337.6 218.9 337.6 212.7 331.3L148.7 267.3C142.4 261.1 142.4 250.9 148.7 244.7C154.9 238.4 165.1 238.4 171.3 244.7L224 297.4L340.7 180.7C346.9 174.4 357.1 174.4 363.3 180.7C369.6 186.9 369.6 197.1 363.3 203.3L235.3 331.3zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 32C132.3 32 32 132.3 32 256C32 379.7 132.3 480 256 480C379.7 480 480 379.7 480 256C480 132.3 379.7 32 256 32z" />
    </svg>
  );
};
