import React, { useEffect, useState } from "react";
import { PageWrapper } from "../PageWrapper";
import { HeaderWrapper } from "../number/HeaderWrapper";
import { productDetails, subProductDetails } from "../productDetails/type";
import Details from "./Details";
import {
  delete_sub_product,
  get_sub_product,
  purchase_product,
} from "@/api/product";
import { ImFilesEmpty } from "react-icons/im";
import Modal from "../Modal";
import { DeleteProduct, PurchaseProduct } from "../Utils";

export default function ViewProduct({
  notUser,
  details,
  setShowDetails,
  updateCat,
  refresh,
}: {
  notUser: boolean;
  details: productDetails;
  updateCat: (arg: void) => void;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  refresh?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [products, setProducts] = useState<subProductDetails[]>();
  const [singleProducts, setSingleProducts] = useState<
    subProductDetails & productDetails
  >();
  const [modalDetails, setModalDetails] = useState<{
    show: boolean;
    type: string;
  }>({
    show: false,
    type: "delete",
  });
  const [loading, setLoading] = useState<boolean>(true);

  async function getProducts() {
    const products = await get_sub_product(details.id!);
    setProducts(products);
    setLoading(false);
  }

  function showDelete(product: subProductDetails & productDetails) {
    setSingleProducts(product);
    setModalDetails({ show: true, type: "delete" });
  }

  function showPurchase(product: subProductDetails & productDetails) {
    setSingleProducts(product);
    setModalDetails({ show: true, type: "purchase" });
  }

  async function onDelete() {
    const delete_prod = await delete_sub_product(singleProducts?.id!);
    if (!delete_prod) throw new Error();
    setModalDetails((prev) => {
      return { ...prev, show: false };
    });
    getProducts();
    updateCat();
  }

  async function onPurchase() {
    const purchase_prod = await purchase_product(singleProducts?.id!);
    if (!purchase_prod) throw new Error();
    setModalDetails((prev) => {
      return { ...prev, show: false };
    });
    getProducts();
    updateCat();
    refresh!((prev) => !prev);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <PageWrapper>
      <div className="flex items-center justify-between h-[9%] px-4 w-full">
        <HeaderWrapper header="Products" />
        <button
          className="inline-block w-full bg-btn p-2 rounded-lg text-white md:w-[50%]"
          onClick={() => setShowDetails(false)}
        >
          Go to catalogue
        </button>
      </div>
      <div className="h-[87%] overflow-y-auto text-white remove-scrollbar md:h-[90%]">
        {products && products![0] ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            {products?.map((product) => {
              const { id, ...new_details } = details;
              return (
                <Details
                  show={false}
                  notUser={notUser}
                  details={{ ...product, ...new_details }}
                  showDelete={showDelete}
                  showPurchase={showPurchase}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-2 text-center font-semibold text-tex h-[80%] w-full">
            {loading ? (
              <span className="loader"></span>
            ) : (
              <>
                <p>No products found for the selected catalogue.</p>
                <ImFilesEmpty className="dropdown-tex" size={40} />
              </>
            )}
          </div>
        )}
      </div>
      <Modal
        show={modalDetails.show}
        setShow={(show) => {
          setModalDetails((prev) => {
            return { ...prev, show };
          });
        }}
        classes="bg-background2 w-[80%] h-[40%] shadow-2xl md:p-[.1vw] rounded-lg md:w-[30%]"
      >
        {modalDetails.type === "delete" ? (
          <DeleteProduct onDelete={onDelete} />
        ) : (
          <PurchaseProduct onPurchase={onPurchase} />
        )}
      </Modal>
    </PageWrapper>
  );
}
