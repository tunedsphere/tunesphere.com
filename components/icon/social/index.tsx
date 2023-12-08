import React, { FC, SVGProps } from "react";
import { RefAttributes } from "react";

import { AppleIcon } from "./Apple";
import { DiscordIcon } from "./Discord";
import { FacebookIcon } from "./Facebook";
import { GitHubIcon } from "./GitHub";
import { ReactIcon } from "./React";
import { GoogleIcon } from "./Google";

export type IconName =
  | "discord"
  | "facebook"
  | "github"
  | "react"
  | "google"
  | "apple";

const iconMap = {
  apple: AppleIcon,
  discord: DiscordIcon,
  facebook: FacebookIcon,
  github: GitHubIcon,
  google: GoogleIcon,
  react: ReactIcon,
};
type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
type ComponentAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;

export interface IconProps extends ComponentAttributes {
  size?: number;
}
export const SocialIcon: FC<{ name: IconName } & IconProps> = ({
  name,
  ...props
}) => {
  console.log("Props passed to SocialIcon:", props);
  const IconComponent = iconMap[name];
  if (!IconComponent) {
    console.error(`Icon "${name}" not found`);
    return null;
  }
  return <IconComponent {...props} />;
};
