import React, { FC, SVGProps } from "react";
import { RefAttributes } from "react";

import { AppleIcon } from "./Apple";
import { DiscordIcon } from "./Discord";
import { FacebookIcon } from "./Facebook";
import { GitHubIcon } from "./GitHub";
import { ReactIcon } from "./React";
import { GoogleIcon } from "./Google";

export type SocialIconName =
  | "discord"
  | "facebook"
  | "github"
  | "react"
  | "google"
  | "apple";

export const socialIconMap = {
  apple: AppleIcon,
  discord: DiscordIcon,
  facebook: FacebookIcon,
  github: GitHubIcon,
  google: GoogleIcon,
  react: ReactIcon,
};
