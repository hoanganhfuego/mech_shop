import UseGetSearchParams from "../../../ultis/queryParams";
import { checkoutValidationSchema } from "../../../validation/userValidation";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { getProvincesAndDistrict } from "../../../services/common";
import { placeOrder } from "../../../services/api/index";

import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  Button,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import Line from "../../../components/Line";
import DotLine from "../../../components/DotLine";
import { useSelector } from "react-redux";
import Order from "./Order";

export default function CheckOut() {
  const auth = useSelector((state) => state.user.auth);
  const [searchParams] = UseGetSearchParams();
  const [getState, setGetState] = useState({
    loading: true,
    error: null,
    provinces: [],
    district: [],
    product: JSON.parse(searchParams.selectList),
  });

  const [sendState, setSendState] = useState({
    loading: false,
    error: "",
  });

  const initialValues = auth
    ? { ...auth, message: "" }
    : {
        buyer_id: "",
        name: "",
        email: "",
        phone: "",
        address_prefecture: "",
        address_district: "",
        address_street: "",
        message: "",
      };

  const onSubmit = () => {
    setSendState((prev) => ({ ...prev, loading: true }));
  };

  const { values, errors, setFieldValue, handleSubmit } = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    initialValues,
    enableReinitialize: true,
    validationSchema: checkoutValidationSchema,
    onSubmit,
  });

  const totalPrice = () => {
    return getState.product.reduce((acc, curr) => {
      return acc + curr.product_price * curr.cart_quantity;
    }, 0);
  };

  useEffect(() => {
    let mounted = true;
    const cleanup = () => {
      mounted = false;
    };
    if (!sendState.loading) {
      return cleanup;
    }

    const info = { ...values };

    info.buyer_id = info?.id;

    delete info.id;
    delete info.access_token;
    delete info.refresh_token;
    delete info.birth_day;
    delete info.birth_month;
    delete info.birth_year;
    delete info.gender;
    delete info.product;
    delete info.user_avatar;

    placeOrder({ product: getState.product, ...info })
      .then(() => {
        if (!mounted) return;
        setSendState((prev) => ({ ...prev, loading: false }));
      })
      .catch((error) => {
        if (!mounted) return;
        setSendState((prev) => ({
          error: error?.response?.data?.message,
          loading: false,
        }));
      });

    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendState.loading]);

  useEffect(() => {
    let mounted = true;
    const cleanup = () => {
      mounted = false;
    };
    if (!getState.loading) {
      return cleanup;
    }

    getProvincesAndDistrict()
      .then((provincesAndDistrictRes) => {
        if (!mounted) return;
        const provinces = provincesAndDistrictRes.data.map((item) => {
          return {
            name: item.name,
            code: item.code - 1,
            districts: item.districts,
          };
        });
        const district = values.address_prefecture
          ? provinces.find((pro) => pro.name === values.address_prefecture)
              .districts
          : provinces[0].districts;
        setGetState((prev) => ({
          ...prev,
          loading: false,
          provinces,
          district,
        }));
      })
      .catch((error) => {
        if (!mounted) return;
        setGetState((prev) => ({
          ...prev,
          loading: false,
          error: error.response?.data?.message,
        }));
      });

    return cleanup;
  }, [getState.loading, values]);

  return (
    <div className="flex flex-col gap-6 w-1200 relative -top-12 rounded">
      <div className="rounded bg-white w-full p-6">
        <div>
          <p className=" mb-10 font-bold text-3xl">Check Out</p>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex gap-4">
              <div className="w-2/3">
                <p className="mb-4 font-medium text-lg">Buyer information</p>

                <div className="flex items-start">
                  <div className="basis-3/4">
                    <p>
                      Your name:{" "}
                      <span className="text-primary-red">*required</span>
                    </p>
                    <TextField
                      onChange={(e) => setFieldValue("name", e.target.value)}
                      error={Boolean(errors.name)}
                      helperText={errors.name}
                      value={values.name}
                      size="small"
                      className="!max-w-sm"
                      fullWidth
                    />
                  </div>
                </div>

                <div className="py-6">
                  <Line />
                </div>

                <div className="flex items-start">
                  <div className="basis-3/4">
                    <p>
                      Email: <span className="text-primary-red">*required</span>
                    </p>
                    <TextField
                      error={Boolean(errors.email)}
                      helperText={errors.email}
                      onChange={(e) => setFieldValue("email", e.target.value)}
                      value={values.email}
                      size="small"
                      className="!max-w-sm"
                      fullWidth
                    />
                  </div>
                </div>

                <div className="py-6">
                  <Line />
                </div>

                <div className="flex flex-col items-start">
                  <p className="mb-4">
                    Address: <span className="text-primary-red">*required</span>
                  </p>
                  <div className="w-full">
                    <div className=" flex gap-4 mb-6">
                      <div className="basis-1/2">
                        <p>Prefecture</p>
                        <FormControl size="small" fullWidth>
                          <Select
                            error={Boolean(errors.address_prefecture)}
                            onChange={(e) => {
                              const prefecture = getState.provinces.find(
                                (province) => province.name === e.target.value
                              );
                              setFieldValue(
                                "address_prefecture",
                                e.target.value
                              );
                              setGetState((prev) => ({
                                ...prev,
                                district: prefecture.districts,
                              }));
                            }}
                            value={values.address_prefecture}
                            displayEmpty
                          >
                            <MenuItem value="" disabled>
                              -
                            </MenuItem>
                            {getState.provinces.map((province, i) => (
                              <MenuItem key={i + 1} value={province.name}>
                                {province.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>

                      <div className="basis-1/2">
                        <p>District</p>
                        <FormControl size="small" fullWidth>
                          <Select
                            error={Boolean(errors.address_district)}
                            onChange={(e) =>
                              setFieldValue("address_district", e.target.value)
                            }
                            value={values.address_district}
                            displayEmpty
                          >
                            <MenuItem value="" disabled>
                              -
                            </MenuItem>
                            {getState.district.map((district, i) => (
                              <MenuItem key={i + 1} value={district.name}>
                                {district.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                    <div className="">
                      <p>Street</p>
                      <TextField
                        error={Boolean(errors.address_street)}
                        onChange={(e) =>
                          setFieldValue("address_street", e.target.value)
                        }
                        value={values.address_street}
                        size="small"
                        fullWidth
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <FormHelperText
                      error={Boolean(
                        errors.address_street ||
                          errors.address_district ||
                          errors.address_prefecture
                      )}
                    >
                      {errors.address_street ||
                        errors.address_district ||
                        errors.address_prefecture}
                    </FormHelperText>
                  </div>
                </div>

                <div className="py-6">
                  <Line />
                </div>

                <div className="flex flex-col items-start">
                  <p>
                    Phone number:{" "}
                    <span className="text-primary-red">*required</span>
                  </p>
                  <TextField
                    helperText={errors.phone}
                    error={Boolean(errors.phone)}
                    onChange={(e) => setFieldValue("phone", e.target.value)}
                    value={values.phone}
                    size="small"
                    className="!max-w-sm"
                    fullWidth
                  />
                </div>

                <div className="py-6">
                  <Line />
                </div>

                <div className="flex flex-col items-start">
                  <p>
                    Message for owner:
                    <span className="text-primary-red">*optinal</span>
                  </p>
                  <TextField
                    multiline={true}
                    rows={4}
                    onChange={(e) => setFieldValue("message", e.target.value)}
                    value={values.message}
                    size="small"
                    fullWidth
                  />
                </div>
              </div>

              <hr className="bg-primary-pink w-[2px] h-auto mx-4 my-12" />

              <div className="w-1/3">
                <p className="mb-4 font-medium text-lg">Order information</p>
                <div className="flex gap-4 flex-col h-full max-h-[600px] overflow-y-scroll px-1 scrollbar">
                  {getState.product.map((item) => {
                    return <Order key={item.cart_id} product={item} />;
                  })}
                </div>
              </div>
            </div>

            <div className="py-6">
              <DotLine />
            </div>

            <div className="flex gap-4 justify-end items-center">
              <p className="font-medium text-lg">
                Total Price: {totalPrice()} $
              </p>
              <Button type="submit" variant="contained" className="!w-36 !h-10">
                {sendState.loading ? (
                  <CircularProgress className="!text-white" size={30} />
                ) : (
                  "Place order"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
