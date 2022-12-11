import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Select,
  MenuItem,
  Button,
  FormHelperText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Banner from "../../../components/Banner";
import Header from "../../../components/Header";
import Line from "../../../components/Line";
import { updateUserInformation } from "../../../services/api/index";
import { getProvincesAndDistrict, postImage } from "../../../services/common";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateAuth } from "../../../redux/userReducer";
import Path from "../../../route/Path";
import blank_avatar from "../../../assets/images/blank.png";

export default function UserEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [birthDay, setBirthDay] = useState(31);
  const ALL_YEARS = new Date().getFullYear();
  const userInfo = useSelector((state) => state.user.auth);
  const [getState, setGetState] = useState({
    loading: true,
    error: null,
    provinces: [],
    district: [],
  });

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("user's name is required"),
    email: Yup.string()
      .required("user's email is required")
      .email("email is not valid"),
    birth_year: Yup.number().required("user's birthday of birth is required"),
    birth_month: Yup.number().required("user's birthday of birth is required"),
    birth_day: Yup.number().required("user's day of birthday is required"),
    phone: Yup.string()
      .required("user's phone number is required")
      .matches(phoneRegExp, "phone number is not valid"),
    gender: Yup.number().required("user's gender is reuiqred"),
    address_prefecture: Yup.string().required("user's address is required"),
    address_district: Yup.string().required("user's address is required"),
    address_address: Yup.string().required("user's address is required"),
  });

  const initialValues = userInfo || {
    user_avatar: "",
    name: "",
    email: "",
    birth_year: "",
    birth_month: "",
    birth_day: "",
    phone: "",
    gender: null,
    address_prefecture: "",
    address_district: "",
    address_address: "",
  };

  const onSubmit = (e) => {
    const info = { ...values };

    info.name = info.name.trim();
    info.email = info.email.trim();
    info.phone = info.phone.trim();

    delete info.access_token;
    delete info.refesh_token;

    updateUserInformation(userInfo.id, info).then((res) => {
      dispatch(updateAuth(values));
      navigate(Path.userInfo);
    });
  };
  const { values, errors, setFieldValue, handleSubmit } = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit,
  });

  const uploadImage = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    postImage(formData).then((res) => {
      setFieldValue(
        "user_avatar",
        process.env.REACT_APP_API_URL + "/" + res.data
      );
    });
    // const reader = new FileReader();
    // console.log(file)

    // reader.readAsDataURL(file);
    // reader.onload = () => {
    //   console.log(reader.result);
    //   setFieldValue("user_avatar", reader.result);
    // };

    // reader.readAsArrayBuffer(file);
    // reader.onload = () => {
    //   const blob = new Blob([reader.result]);
    //   const url = URL.createObjectURL(blob, { type: "image/png" });
    //   setFieldValue("user_avatar", url)
    // };
  };

  useEffect(() => {
    let mounted = true;
    const cleanup = () => {
      mounted = false;
    };
    if (!getState.loading) {
      return;
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
        console.log("fdjghhgfgfmghfjghfjghfjhgf");
        if (!mounted) return;
        setGetState((prev) => ({
          ...prev,
          loading: false,
          error: error.message,
        }));
      });

    return cleanup;
  }, [getState.loading, values]);

  return (
    <div>
      <Header />
      <Banner />
      <div className="w-full flex justify-center bg-primary-grey">
        <div className="w-1200 relative -top-12 bg-white p-6 rounded">
          <div>
            <p className=" mb-10 font-bold text-3xl">User information</p>
            <form onSubmit={handleSubmit}>
              <div className="flex items-start">
                <p className="basis-1/3">Avatar : </p>
                <div className="basis-3/4 flex items-center gap-10">
                  <img
                    src={values.user_avatar || blank_avatar}
                    alt="avatar"
                    className=" aspect-square rounded-full w-[100px]"
                  />
                  <Button variant="contained" component="label">
                    Change avatar
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      hidden
                      onChange={uploadImage}
                    />
                  </Button>
                </div>
              </div>

              <Line />

              <div className="flex items-start">
                <p className="basis-1/3">Name : </p>
                <div className="basis-3/4">
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

              <Line />

              <div className="flex items-start">
                <p className="basis-1/3">Gender : </p>
                <div className="basis-3/4 flex flex-col">
                  <FormControl>
                    <RadioGroup
                      value={values.gender}
                      onChange={(e) => setFieldValue("gender", e.target.value)}
                    >
                      <div className="flex">
                        <FormControlLabel
                          control={<Radio value={0} />}
                          label="Female"
                        />
                        <FormControlLabel
                          control={<Radio value={1} />}
                          label="Male"
                        />
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormHelperText
                    className="w-full"
                    error={Boolean(errors.gender)}
                  >
                    {errors.gender}
                  </FormHelperText>
                </div>
              </div>

              <Line />

              <div className="flex items-start">
                <p className="basis-1/3">Day of birth :</p>
                <div className=" basis-3/4 flex flex-col">
                  <div className="flex gap-2 w-full">
                    <div className="w-1/3">
                      <p>Year</p>
                      <FormControl size="small" fullWidth>
                        <Select
                          error={Boolean(errors.birth_year)}
                          displayEmpty
                          value={values.birth_year}
                          onChange={(e) =>
                            setFieldValue("birth_year", e.target.value)
                          }
                        >
                          <MenuItem value="" disabled>
                            -
                          </MenuItem>
                          {new Array(100).fill(ALL_YEARS).map((_, i) => (
                            <MenuItem key={i + 1} value={ALL_YEARS - i}>
                              {ALL_YEARS - i}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>

                    <div className="w-1/3">
                      <p>Month</p>
                      <FormControl size="small" fullWidth>
                        <Select
                          error={Boolean(errors.birth_month)}
                          displayEmpty
                          value={values.birth_month}
                          onChange={(e) => {
                            setFieldValue("birth_month", e.target.value);
                            setBirthDay(
                              new Date(
                                values.birth_year || new Date().getFullYear(),
                                e.target.value,
                                0
                              ).getDate()
                            );
                          }}
                        >
                          <MenuItem value="" disabled>
                            -
                          </MenuItem>
                          {new Array(12).fill(0).map((_, i) => (
                            <MenuItem key={i + 1} value={i + 1}>
                              {i + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>

                    <div className="w-1/3">
                      <p>Day</p>
                      <FormControl size="small" fullWidth>
                        <Select
                          error={Boolean(errors.birth_day)}
                          value={values.birth_day}
                          onChange={(e) =>
                            setFieldValue("birth_day", e.target.value)
                          }
                        >
                          <MenuItem value="" disabled>
                            -
                          </MenuItem>
                          {new Array(birthDay).fill(0).map((_, i) => (
                            <MenuItem key={i + 1} value={i + 1}>
                              {i + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className="w-full">
                    <FormHelperText
                      error={Boolean(
                        errors.birth_year ||
                          errors.birth_month ||
                          errors.birth_day
                      )}
                    >
                      {errors.birth_year ||
                        errors.birth_month ||
                        errors.birth_day}
                    </FormHelperText>
                  </div>
                </div>
              </div>

              <Line />

              <div className="flex items-start">
                <p className="basis-1/3">Email :</p>
                <div className="basis-3/4">
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

              <Line />

              <div className="flex items-start">
                <p className="basis-1/3">Address :</p>
                <div className="basis-3/4">
                  <div className="w-full">
                    <div className=" flex gap-2 mb-6">
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
                      <p>Address</p>
                      <TextField
                        error={Boolean(errors.address_address)}
                        onChange={(e) =>
                          setFieldValue("address_address", e.target.value)
                        }
                        value={values.address_address}
                        size="small"
                        fullWidth
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <FormHelperText
                      error={Boolean(
                        errors.address_address ||
                          errors.address_district ||
                          errors.address_prefecture
                      )}
                    >
                      {errors.address_address ||
                        errors.address_district ||
                        errors.address_prefecture}
                    </FormHelperText>
                  </div>
                </div>
              </div>

              <Line />

              <div className="flex items-start">
                <p className="basis-1/3">Phone number :</p>
                <div className="basis-3/4">
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
              </div>

              <Line />

              <div className="flex justify-center">
                <Button type="submit" variant="contained">
                  Save changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
