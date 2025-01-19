import { ReactNode } from "react";

export type ContentPageProps = {
  children: ReactNode;
  flexType: string;
  height?: string;
  width: string;
  px?: string;
};

export type HeaderWrapperProps = {
  header: string | React.JSX.Element;
  link?: string;
  text?: string;
  url?: string;
};
