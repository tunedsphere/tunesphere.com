import React, { FC, SVGProps } from "react";
import { RefAttributes } from "react";

import { ApiIcon } from "./API";
import { ActivityIcon } from "./Activity";
import { BarsIcon } from "./Bars";
import { BrokenLinkIcon } from "./BrokenLink";
import { CalendarIcon } from "./Calendar";
import { CheckCircleIcon } from "./CheckCircle";
import { CheckCircleOutlineIcon } from "./CheckCircleOutline";
import { CheckIcon } from "./Check";
import { ChevronUpIcon } from "./ChevronUp";
import { ChevronDownIcon } from "./ChevronDown";
import { ChevronLeftIcon } from "./ChevronLeft";
import { ChevronRightIcon } from "./ChevronRight";
import { CloseIcon } from "./Close";
import { CodeIcon } from "./Code";
import { CodeLightIcon } from "./CodeLight";
import { CollapseIcon } from "./Collapse";
import { ContentfulIcon } from "./Contentful";
import { ContentlayerIcon } from "./Contentlayer";
import { CrossCircleOutlineIcon } from "./CrossCircleOutline";
import { DatabaseIcon } from "./Database";
import { ExclamationIcon } from "./Exclamation";
import { ExpandIcon } from "./Expand";
import { ExternalLinkIcon } from "./ExternalLink";
import { GearIcon } from "./Gear";
import { InfoIcon } from "./Info";
import { LightningIcon } from "./Lightning";
import { MarkdownIcon } from "./Markdown";
import { MoonIcon } from "./Moon";
import { NotionIcon } from "./Notion";
import { PlayButtonIcon } from "./PlayButton";
import { PlusIcon } from "./Plus";
import { QuestionIcon } from "./Question";
import { RocketIcon } from "./Rocket";
import { SearchIcon } from "./Search";
import { SunIcon } from "./Sun";
import { UserIcon } from "./User";

import { VerticalThreeDotsIcon } from "./VerticalThreeDots";
import { PageLayoutIcon } from "./PageLayout";
import { AlertTriangleIcon } from "./AlertTriangle";
import { CircleIcon } from "./Circle";
import { AddIcon } from "./Add";
import { TrashIcon } from "./Trash";
import { RemoveIcon } from "./Remove";
import { CopyIcon } from "./Copy";
import { MenuIcon } from "./Menu";
import { SpinnerIcon } from "./Spinner";
import { SignIcon } from "./Sign";
import { HomeIcon } from "./Home";
import { FlowerIcon } from "./Flower";
import { GlobeIcon } from "./Globe";
import { ListIcon } from "./List";
import { PlaceholderIcon } from "./Placeholder";
import { WarningIcon } from "./Warning";
import { LogoIcon } from "./Logo";
import { UploadIcon } from "./Upload";
import { CropIcon } from "./Crop";
import { ResetIcon } from "./Reset";
import { FlameIcon } from "./Flame";
import { DashboardIcon } from "./Dashboard";
import { LogoutIcon } from "./Logout";
import { ViewIcon } from "./View";
import { HideIcon } from "./Hide";
import { EditIcon } from "./Edit";
import { GripIcon } from "./Grip";

import { ShopIconName, shopIconMap } from "./shop";
import { SocialIconName, socialIconMap } from "./social";

export type IconName =
  | ShopIconName
  | SocialIconName
  | "api"
  | "add"
  | "activity"
  | "alert-triangle"
  | "bars"
  | "broken-link"
  | "calendar"
  | "circle"
  | "crop"
  | "copy"
  | "check-circle-outline"
  | "check-circle"
  | "check"
  | "chevron-up"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "close"
  | "code-light"
  | "code"
  | "collapse"
  | "contentful"
  | "contentlayer"
  | "cross-circle-outline"
  | "dashboard"
  | "database"
  | "edit"
  | "exclamation"
  | "expand"
  | "external-link"
  | "flame"
  | "flower"
  | "gear"
  | "globe"
  | "grip"
  | "hide"
  | "home"
  | "info"
  | "lightning"
  | "list"
  | "logo"
  | "logout"
  | "markdown"
  | "menu"
  | "moon"
  | "notion"
  | "placeholder"
  | "play-button"
  | "plus"
  | "question"
  | "reset"
  | "rocket"
  | "search"
  | "sign"
  | "sun"
  | "sign"
  | "spinner"
  | "upload"
  | "user"
  | "vertical-three-dots"
  | "trash"
  | "remove"
  | "page-layout"
  | "view"
  | "warning";

const iconMap = {
  ...shopIconMap,
  ...socialIconMap,
  "alert-triangle": AlertTriangleIcon,
  "broken-link": BrokenLinkIcon,
  "check-circle-outline": CheckCircleOutlineIcon,
  "check-circle": CheckCircleIcon,
  "chevron-down": ChevronDownIcon,
  "chevron-up": ChevronUpIcon,
  "chevron-left": ChevronLeftIcon,
  "chevron-right": ChevronRightIcon,
  "code-light": CodeLightIcon,
  "cross-circle-outline": CrossCircleOutlineIcon,
  "external-link": ExternalLinkIcon,
  "play-button": PlayButtonIcon,
  "vertical-three-dots": VerticalThreeDotsIcon,
  "page-layout": PageLayoutIcon,
  api: ApiIcon,
  add: AddIcon,
  activity: ActivityIcon,
  bars: BarsIcon,
  calendar: CalendarIcon,
  check: CheckIcon,
  close: CloseIcon,
  crop: CropIcon,
  code: CodeIcon,
  copy: CopyIcon,
  collapse: CollapseIcon,
  circle: CircleIcon,
  contentful: ContentfulIcon,
  contentlayer: ContentlayerIcon,
  dashboard: DashboardIcon,
  database: DatabaseIcon,
  edit: EditIcon,
  exclamation: ExclamationIcon,
  expand: ExpandIcon,
  flame: FlameIcon,
  flower: FlowerIcon,
  gear: GearIcon,
  globe: GlobeIcon,
  grip: GripIcon,
  hide: HideIcon,
  home: HomeIcon,
  info: InfoIcon,
  lightning: LightningIcon,
  list: ListIcon,
  logo: LogoIcon,
  logout: LogoutIcon,
  markdown: MarkdownIcon,
  menu: MenuIcon,
  moon: MoonIcon,
  notion: NotionIcon,
  placeholder: PlaceholderIcon,
  plus: PlusIcon,
  question: QuestionIcon,
  reset: ResetIcon,
  rocket: RocketIcon,
  search: SearchIcon,
  sun: SunIcon,
  sign: SignIcon,
  spinner: SpinnerIcon,
  upload: UploadIcon,
  user: UserIcon,
  trash: TrashIcon,
  remove: RemoveIcon,
  view: ViewIcon,
  warning: WarningIcon,
};

type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
type ComponentAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;

export interface IconProps extends ComponentAttributes {}
export const Icon: FC<{ name: IconName } & IconProps> = ({
  name,
  ...props
}) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) {
    console.error(`Icon "${name}" not found`);
    return null;
  }
  return <IconComponent {...props} />;
};
