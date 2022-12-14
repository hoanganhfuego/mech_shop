import { useCallback, useState } from "react";
import ProductCard from "./ProductCard";
import ProductModel from "./ProductModel";
import { updateUserProducts } from "../../../services/api/index";

export default function UserProductUpdate({ products, reloadPage }) {
  const [currentProduct, setCurrentProduct] = useState(undefined);
  const [openEdit, setOpenEdit] = useState(false);

  const onSave = useCallback((user_id, product_id, data) => {
    return updateUserProducts(user_id, product_id, data);
  }, []);

  const getEditProduct = (data) => {
    setCurrentProduct(data);
  };

  const onCloseModel = () => {
    setOpenEdit(false);
  };

  const onOpenModel = () => {
    setOpenEdit(true);
  };

  return (
    <div className="flex flex-col gap-4 mb-10">
      {products.map((product) => {
        return (
          <ProductCard
            reloadPage={reloadPage}
            key={product.product_id}
            product={product}
            onOpenModel={onOpenModel}
            getEditProduct={getEditProduct}
          />
        );
      })}
      <ProductModel
        reloadPage={reloadPage}
        onSave={onSave}
        open={openEdit}
        onCloseModel={onCloseModel}
        product={currentProduct}
      />
    </div>
  );
}
