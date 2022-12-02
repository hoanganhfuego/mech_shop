import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from "../../components/Header";
import { signup } from "../../services/api";
import { setAuth } from "../../redux/userReducer";
import Path from "../../route/Path";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = () => {
    const userInfo = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    signup(userInfo).then((res) => {
      console.log(res.data);
      const auth = {
        ...res.data,
      };
      dispatch(setAuth(auth));
      navigate(Path.home);
    });
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("user name required"),
    email: Yup.string()
      .required("user email required")
      .email("use your email to login"),
    password: Yup.string()
      .required("user password required")
      .min(8, "Requires at least 8 characters"),
    comfirm_password: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const { values, errors, setFieldValue, handleSubmit } = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    validationSchema,
    initialValues: {
      name: "",
      email: "",
      password: "",
      comfirm_password: "",
    },
    onSubmit,
  });

  return (
    <div>
      <Header />
      <div className="w-full flex justify-center mt-6">
        <form onSubmit={handleSubmit}>
          <div className=" w-96 flex items-center flex-col">
            <p className=" text-6xl mb-6">Sign up</p>
            <div className="mb-6 w-full">
              <TextField
                label="Name"
                helperText={errors.name}
                error={Boolean(errors.name)}
                value={values.name}
                type="text"
                onChange={(e) => setFieldValue("name", e.target.value)}
                fullWidth
              />
            </div>
            <div className="mb-6 w-full">
              <TextField
                label="Email"
                helperText={errors.email}
                error={Boolean(errors.email)}
                value={values.email}
                type="text"
                onChange={(e) => setFieldValue("email", e.target.value)}
                fullWidth
              />
            </div>
            <div className="mb-6 w-full">
              <TextField
                label="Password"
                helperText={errors.password}
                error={Boolean(errors.password)}
                value={values.password}
                type="password"
                onChange={(e) => setFieldValue("password", e.target.value)}
                fullWidth
              />
            </div>
            <div className="mb-6 w-full">
              <TextField
                label="Comfirm password"
                helperText={errors.comfirm_password}
                error={Boolean(errors.comfirm_password)}
                value={values.cormfirm_password}
                type="password"
                onChange={(e) =>
                  setFieldValue("comfirm_password", e.target.value)
                }
                fullWidth
              />
            </div>
            <Button variant="outlined" type="submit" className="!mb-6 w-full">
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
