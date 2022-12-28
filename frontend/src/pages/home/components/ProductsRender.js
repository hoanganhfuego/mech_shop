import { useState, forwardRef } from "react";
import { useFormik } from "formik";
import constants from "../../../constants/constants";

import Line from "../../../components/Line";
import CardItem from "./CardItem";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import {
  Button,
  Dialog,
  Slide,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function ProductRender({
  products,
  searchParams,
  setSearchParams,
  typeName,
}) {
  const [open, setOpen] = useState(false);
  const onSubmit = () => {
    const query = {};
    if (values.type) {
      query.type = values.type;
    }
    if (values.product_condition) {
      query.product_condition = values.product_condition;
    }
    if (values.sort_price) {
      query.sort_price = values.sort_price;
    }
    setSearchParams({ ...searchParams, ...query });
    setOpen(false);
  };
  const { values, setFieldValue, handleSubmit } = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    validationSchema: false,
    validate: false,
    initialValues: {
      sort_price: searchParams.sort_price,
      type: searchParams.type,
      product_condition: searchParams.product_condition,
    },
    onSubmit,
  });

  return (
    <div className="w-1200">
      <div className="flex justify-between mb-4">
        <p className="font-medium text-lg">{typeName()}</p>
        <Button
          className="!text-black !normal-case"
          type="button"
          onClick={() => setOpen(true)}
        >
          <FilterAltOutlinedIcon />
          <span>Filter</span>
        </Button>
      </div>
      <div className="flex -m-3 flex-wrap">
        {products.map((item, index) => {
          return (
            <div className="w-1/5 p-3" key={index}>
              <CardItem item={item} />
            </div>
          );
        })}
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        transitionDuration={400}
        fullWidth
        onClose={() => setOpen(false)}
      >
        <form className="p-6" onSubmit={handleSubmit}>
          <p className="font-medium text-lg">Filter</p>

          <div className="py-6">
            <Line />
          </div>

          <div className="flex flex-col">
            <div>
              <p className="font-medium">Sort by price</p>
              <div>
                <FormControl>
                  <RadioGroup
                    value={values.sort_price}
                    onChange={(e) =>
                      setFieldValue("sort_price", e.target.value)
                    }
                  >
                    <div>
                      <FormControlLabel
                        control={<Radio value={"ascending"} />}
                        label="Ascending"
                      />
                      <FormControlLabel
                        control={<Radio value={"descending"} />}
                        label="Descending"
                      />
                    </div>
                  </RadioGroup>
                </FormControl>
              </div>
            </div>

            <div className="py-6">
              <Line />
            </div>

            <div>
              <p className="font-medium">Product type</p>
              <div>
                <FormControl>
                  <RadioGroup
                    value={values.type}
                    onChange={(e) =>
                      setFieldValue("type", Number(e.target.value))
                    }
                  >
                    <div>
                      {constants.productType.productType.map((type) => {
                        return (
                          <FormControlLabel
                            key={type.type}
                            control={<Radio value={type.type} />}
                            label={type.label}
                          />
                        );
                      })}
                    </div>
                  </RadioGroup>
                </FormControl>
              </div>
            </div>

            <div className="py-6">
              <Line />
            </div>

            <div>
              <p className="font-medium">Product condition</p>
              <div>
                <FormControl>
                  <RadioGroup
                    value={values.product_condition}
                    onChange={(e) =>
                      setFieldValue("product_condition", e.target.value)
                    }
                  >
                    <div>
                      <FormControlLabel
                        control={<Radio value="new" />}
                        label="New"
                      />
                      <FormControlLabel
                        control={<Radio value="used" />}
                        label="Used"
                      />
                    </div>
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>

          <div className="py-6">
            <Line />
          </div>

          <div className="flex w-full justify-end">
            <Button type="submit" variant="contained">
              apply
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
