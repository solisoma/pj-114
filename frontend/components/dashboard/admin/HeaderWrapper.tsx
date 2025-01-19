import { HeaderWrapperProps } from "./type";

export const HeaderWrapper = ({ header, text }: HeaderWrapperProps) => {
  return (
    <div className="text-white flex flex-col items-start justify-between w-full p-2 md:flex-row md:items-center">
      <h1 className="text-xl font-poppins tracking-normal text-black-50 md:text-2xl">
        {header}
      </h1>
      {text && (
        <div className="flex items-center text-lg">
          <p className="text-base text-gray-500">{text}</p>
        </div>
      )}
    </div>
  );
};
