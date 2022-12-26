import {
  Button,
  Dialog,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  TextField,
  InputAdornment,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Line from "../../../components/Line";
import { useFormik } from "formik";
import { useEffect, useState, forwardRef } from "react";
import { postImage } from "../../../services/common";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import constants from "../../../constants/constants";
import Slide from "@mui/material/Slide";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const validationSchema = Yup.object().shape({
  product_name: Yup.string().required("Product's name is required"),
  product_price: Yup.number().required("Product's price is required"),
  product_description: Yup.string()
    .max(400, "Character limit is 200")
    .required(
      "Product's description is required, please make sure that buyers can know how the condition of your key board is"
    ),
  product_images: Yup.array()
    .min(
      6,
      "You must have at least 6 pictures of your keyboard, pictures should be taken from different angles"
    )
    .required("Product's picture is required"),
  product_type: Yup.number().required("Product's type is required"),
  product_quantity: Yup.number().required("Product's quantity is required"),
});

export default function ProductModel({
  open,
  onCloseModel,
  product,
  onSave,
  reloadPage,
}) {
  const auth = useSelector((state) => state.user.auth);

  const [sendState, setSendState] = useState({
    loading: false,
    error: "",
  });

  const onSubmit = () => {
    setSendState((prev) => ({ ...prev, loading: true }));
  };

  const { values, errors, setFieldValue, handleSubmit, resetForm } = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    initialValues: product || {
      product_name: "",
      product_images: [],
      product_price: "",
      product_description: "",
      product_type: "",
      user_avatar: auth.user_avatar,
      user_name: auth.name,
      product_quantity: "",
    },
    onSubmit,
    validationSchema,
    enableReinitialize: true,
  });

  const handleDeleteImage = (index) => {
    const images = [...values.product_images];
    images.splice(index, 1);
    setFieldValue("product_images", images);
  };

  const uploadImage = (e) => {
    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("file", e.target.files[i]);
    }
    postImage(formData).then((res) => {
      const imageUrls = res.data.map((file) => {
        return {
          product_image:
            process.env.REACT_APP_API_URL + file.replaceAll(/\\/g, "/"),
        };
      });
      setFieldValue("product_images", [...values.product_images, ...imageUrls]);
    });
  };

  useEffect(() => {
    let mounted = true;

    const cleanup = () => {
      mounted = false;
    };

    if (!sendState.loading) {
      return cleanup;
    }

    onSave(auth?.id, product?.product_id, values)
      .then(() => {
        if (!mounted) return;
        resetForm();
        onCloseModel();
        reloadPage();
        setSendState({
          loading: false,
          error: "",
        });
      })
      .catch((error) => {
        if (!mounted) return;
        setSendState({
          loading: false,
          error: error.response?.data?.message,
        });
      });

    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendState.loading]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        onCloseModel();
        resetForm();
      }}
      fullWidth
      maxWidth="lg"
      TransitionComponent={Transition}
    >
      <div className=" p-6">
        <div className="flex justify-between mb-8">
          <p className=" uppercase font-medium text-xl">add product</p>
          <Button
            className="!min-w-min relative -top-4 -right-4"
            onClick={onCloseModel}
            disabled={sendState.loading}
          >
            <CloseOutlinedIcon color="primary" />
          </Button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <p className="mb-1">Product name: </p>
            <TextField
              value={values.product_name}
              error={Boolean(errors.product_name)}
              helperText={errors.product_name}
              onChange={(e) => {
                setFieldValue("product_name", e.target.value);
              }}
              size="small"
              fullWidth
              type="text"
            />
          </div>

          <div className="py-6">
            <Line />
          </div>

          <div className="mb-4">
            <p className="mb-1">Product price: </p>
            <TextField
              value={values.product_price}
              error={Boolean(errors.product_price)}
              helperText={errors.product_price}
              onChange={(e) => {
                setFieldValue("product_price", e.target.value);
              }}
              size="small"
              fullWidth
              type="text"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </div>

          <div className="py-6">
            <Line />
          </div>

          <div className="mb-4">
            <p className="mb-1">Quantity: </p>
            <TextField
              value={values.product_quantity}
              error={Boolean(errors.product_quantity)}
              helperText={errors.product_quantity}
              onChange={(e) => {
                setFieldValue("product_quantity", e.target.value);
              }}
              size="small"
              fullWidth
              type="number"
            />
          </div>

          <div className="py-6">
            <Line />
          </div>

          <div>
            <p>Product type: </p>
            <FormControl>
              <RadioGroup
                value={values.product_type}
                onChange={(e) =>
                  setFieldValue("product_type", Number(e.target.value))
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
            <FormHelperText
              className="w-full"
              error={Boolean(errors.product_type)}
            >
              {errors.product_type}
            </FormHelperText>
          </div>

          <div className="py-6">
            <Line />
          </div>

          <div className="mb-4">
            <p className="mb-1">Product description: </p>
            <TextField
              value={values.product_description}
              error={Boolean(errors.product_description)}
              helperText={errors.product_description}
              onChange={(e) => {
                setFieldValue("product_description", e.target.value);
              }}
              size="small"
              fullWidth
              type="text"
              multiline={true}
              rows={4}
            />
          </div>

          <div className="py-6">
            <Line />
          </div>

          <div className="mb-4">
            <p className="mb-1">Product images: </p>
            <div>
              <div className="flex mb-4 flex-wrap -m-2">
                {values.product_images?.map((image, index) => {
                  return (
                    <div className="w-1/4 p-2 relative" key={index}>
                      <div className="absolute top-2 right-2 rounded-full">
                        <Button
                          className="!min-w-min !rounded-full !text-white"
                          onClick={() => handleDeleteImage(index)}
                        >
                          <CloseOutlinedIcon />
                        </Button>
                      </div>

                      <img
                        className="aspect-image object-cover w-full rounded-xl"
                        key={index}
                        src={image.product_image}
                        alt="product_image"
                      />
                    </div>
                  );
                })}
              </div>
              <Button variant="outlined" component="label">
                Choose images
                <input
                  multiple={true}
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  hidden
                  onChange={uploadImage}
                />
              </Button>
            </div>
            <FormHelperText
              className="w-full"
              error={Boolean(errors.product_images)}
            >
              {errors.product_images}
            </FormHelperText>
          </div>

          <div className="py-6">
            <Line />
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              variant="contained"
              disabled={sendState.loading}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
