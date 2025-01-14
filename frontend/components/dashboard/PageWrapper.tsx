import { ReactNode } from "react";

export const PageWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="h-[inherit] w-full">{children}</div>;
};
