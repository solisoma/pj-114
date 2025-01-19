import { ContentPageProps } from "./type";

export const ContentPage = ({
  children,
  flexType,
  height,
  width,
  px,
}: ContentPageProps) => {
  return (
    <div
      className={`${width} flex ${flexType} min-h-[30vh] ${height} ${px} text-white shadow-lg p-2 rounded-lg border border-gray-500`}
    >
      {children}
    </div>
  );
};
