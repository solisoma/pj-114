import React from "react";
import { toast } from "react-toastify";
import { Provider as ProviderType } from "./type";
import { FaBolt } from "react-icons/fa6";
import { SiBlockchaindotcom } from "react-icons/si";

export default function Provider({
  onSelect,
}: {
  onSelect: (prov: ProviderType) => Promise<void>;
}): React.JSX.Element {
  async function selectProvider(provider: ProviderType, name: string) {
    try {
      await onSelect!(provider);
      toast.success(`The ${name} provider has been successfully activated!`);
    } catch (e) {
      toast.error(`The activation of ${name} provider failed`);
    }
  }
  return (
    <div className="flex flex-col gap-4 px-2 h-full">
      <div className="flex justify-between">
        <p className="text-tex font-bold text-xl">Select Provider</p>
      </div>
      <div className="flex flex-col justify-center min-h-[70%] h-auto gap-4 text-white">
        <div
          onClick={() => selectProvider("lokimobile", "LokiMobile")}
          className="flex gap-4 items-center cursor-pointer"
        >
          <SiBlockchaindotcom size={50} color="#4CAF50" />
          <div>
            <h2 className="text-lg font-bold">LokiMobile</h2>
            <p>
              A provider with more than 4000 services offering numbers in over
              200 countries
            </p>
          </div>
        </div>
        <div
          onClick={() => selectProvider("hermes", "Hermes")}
          className="flex gap-4 items-center cursor-pointer"
        >
          <FaBolt size={50} color="#FFD700" />
          <div>
            <h2 className="text-lg font-bold">Hermes</h2>
            <p>
              Very affordable. Recommended for whatsapp and telegram
              verification
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
