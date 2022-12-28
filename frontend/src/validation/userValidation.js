import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const productValidationSchema = Yup.object().shape({
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
  product_condition: Yup.string().required("Product's condition is required")
});

export const userValidationSchema = Yup.object().shape({
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
  address_street: Yup.string().required("user's address is required"),
});

export const checkoutValidationSchema = Yup.object().shape({
  name: Yup.string().required("user's name is required"),
  email: Yup.string()
    .required("user's email is required")
    .email("email is not valid"),
  phone: Yup.string()
    .required("user's phone number is required")
    .matches(phoneRegExp, "phone number is not valid"),
  address_prefecture: Yup.string().required("user's address is required"),
  address_district: Yup.string().required("user's address is required"),
  address_street: Yup.string().required("user's address is required"),
});
