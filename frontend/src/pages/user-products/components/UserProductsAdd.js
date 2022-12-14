import { useState } from "react";
import { Button } from "@mui/material";
import ProductModel from "./ProductModel";
import { addUserProducts } from "../../../services/api/index";

export default function UserProductsAdd({ reloadPage }) {
  const [open, setOpen] = useState(false);

  const onSave = (userId, _, data) => {
    return addUserProducts(userId, data);
  };

  const onCloseModel = () => {
    setOpen(false);
  };

  const onOpenModel = () => {
    setOpen(true);
  };

  return (
    <div>
      <div className="flex justify-center">
        <Button variant="outlined" onClick={onOpenModel}>
          add product
        </Button>
      </div>
      <ProductModel
        open={open}
        onCloseModel={onCloseModel}
        reloadPage={reloadPage}
        onSave={onSave}
      />
    </div>
  );
}
