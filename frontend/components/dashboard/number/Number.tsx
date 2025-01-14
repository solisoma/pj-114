"use client";
import { PageWrapper } from "../PageWrapper";
import { HeaderWrapper } from "./HeaderWrapper";
import { ContentPage } from "./ContentPage";
import { ProductTableContainer } from "./NumberTable";
import SMSOrder from "./SMSOrder";
import { useEffect, useState } from "react";
import { NumberType } from "@/api/type";
import { get_number } from "@/api/order";
import { toast } from "react-toastify";
import { check_sms, req_number } from "@/api/get.number";
import { Provider, ReqNumberType } from "./type";
import Modal from "../Pop";
import ProviderPop from "./Provider";

const Product = ({
  refresh,
}: {
  refresh?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [mainData, setMainData] = useState<NumberType[]>();
  const [tableData, setTableData] = useState<NumberType[]>();
  const [check, setCheck] = useState<boolean>(false);
  const [provider, setProvider] = useState<Provider>("hermes");
  const [showProvider, setShowProvider] = useState<boolean>(false);
  const [sort, setSort] = useState<string>();

  async function getNumbers() {
    const numbers = await get_number();
    if (!numbers) {
      toast.info("An error occurred while fetching numbers");
      return;
    }
    setMainData(numbers as NumberType[]);
    setTableData(numbers as NumberType[]);
  }

  async function switchProvider(prov: Provider) {
    localStorage.setItem("provider", prov);
    setProvider(prov);
    setShowProvider(false);
  }

  async function handleSubmit(details: ReqNumberType): Promise<void> {
    const req_num = await req_number(details, provider);
    if (!req_num.success) {
      toast.info(req_num.msg);
      return;
    }
    toast.success("Order purchased successfully");
    getNumbers();
    refresh!((prev) => !prev);
  }

  async function checkSms() {
    let newSms = false;
    if (tableData)
      for (let i = 0; i < tableData?.length; i++) {
        if (tableData[i].status === "awaiting") {
          const check = await check_sms({
            id: tableData[i].id,
            activate_id: tableData[i].activation_id,
            provider,
          });
          console.log(check, !newSms);
          newSms = true;
        }
      }
    if (newSms) getNumbers();
  }

  function filterNumber({ target: { value } }: { target: { value: string } }) {
    if (mainData)
      if (sort === "country") {
        const regex = new RegExp(value, "ig");
        const newData = mainData.filter((data) => data.country.match(regex));
        setTableData([...newData]);
      } else {
        const regex = new RegExp(value, "ig");
        const newData = mainData.filter((data) => data.service.match(regex));
        setTableData([...newData]);
      }
  }

  useEffect(() => {
    checkSms();
  }, [check]);

  useEffect(() => {
    getNumbers();
    const interval = setInterval(() => setCheck((prev) => !prev), 4000);
    const get_provider = localStorage.getItem("provider");
    if (!get_provider) localStorage.setItem("provider", "hermes");
    setProvider((get_provider || "hermes") as Provider);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <PageWrapper>
        <div className="flex flex-col gap-4 h-full md:gap-2">
          <div className="flex justify-between items-center h-[9%]">
            <HeaderWrapper header="Order Sms" />
            <button
              onClick={() => setShowProvider(true)}
              className="flex items-center justify-center gap-4 bg-transparent rounded-lg py-2 px-4"
            >
              <div className="flex flex-col items-start">
                <p className="text-tex font-bold text-sm">PROVIDER</p>
                <p className="text-white font-semibold text-sm">
                  {provider.charAt(0).toUpperCase() +
                    provider.slice(1).toLowerCase()}
                </p>
              </div>
              <p className="text-blue-400 transition transform duration-300 hover:scale-110">
                Switch
              </p>
            </button>
          </div>
          <div className="h-[92%] overflow-y-scroll flex gap-3 flex-col remove-scrollbar md:flex-row md:overflow-y-hidden">
            <div className="w-full h-auto remove-scrollbar md:overflow-y-scroll md:w-[30%] md:h-full">
              <ContentPage width="md:min-h-full -w-full" flexType="flex-col">
                <SMSOrder handleSubmit={handleSubmit} provider={provider} />
              </ContentPage>
            </div>
            <div className="w-full h-auto md:w-[70%] md:h-full">
              <ContentPage width="w-full h-full" flexType="flex-col">
                <div className="w-full h-auto flex items-center justify-center">
                  <div className="w-full flex flex-col items-start px-2 gap-4">
                    <div className="border-b w-full border-gray-800">
                      <h1 className="text-lg font-bold"> Pending SMS</h1>
                    </div>
                    <p className="text-[0.9rem]">
                      A list of all your pending SMS. Sometimes a phone number
                      has to be activated, this could mean it can take up to 3
                      minutes to receive an SMS verification.
                    </p>
                    <div className="flex gap-2 items-center justify-between pb-4 w-full">
                      <div>
                        <input
                          type="text"
                          placeholder="Type to filter"
                          onChange={filterNumber}
                          name="max_price"
                          className="outline-none p-2 border border-gray-400 rounded-lg w-full bg-background2"
                        />
                      </div>
                      <div>
                        <select
                          onChange={(e) => setSort(e.target.value)}
                          className="outline-none p-2 border border-gray-400 text-white bg-background2 rounded-lg"
                        >
                          <option value="">sort by</option>
                          <option value="country">country</option>
                          <option value="service">service</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <ProductTableContainer
                  refresh={refresh}
                  tableData={tableData || []}
                  provider={provider}
                />
              </ContentPage>
            </div>
          </div>
        </div>
        <Modal
          styleString="bg-background2"
          visible={showProvider}
          setVisible={setShowProvider}
        >
          <ProviderPop onSelect={switchProvider} />
        </Modal>
      </PageWrapper>
    </>
  );
};
export default Product;
