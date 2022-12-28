import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Header from "../../components/Header";
import { signup } from "../../services/api";
import { setAuth } from "../../redux/userReducer";
import Path from "../../route/Path";
import Footer from "../../components/Footer";

export default function Signup() {
  const [sendState, setSendState] = useState({
    loading: false,
    error: null,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = () => {
    setSendState((prev) => ({ ...prev, loading: true }));
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

  useEffect(() => {
    let mounted = true;
    const cleanup = () => {
      mounted = false;
    };
    if (!sendState.loading) {
      return cleanup;
    }

    const info = { ...values };

    info.name = info.name.trim();
    info.email = info.email.trim();
    info.password = info.password.trim();

    signup(info)
      .then((res) => {
        if (!mounted) return;
        const auth = {
          ...res.data,
        };
        setSendState((prev) => ({
          loading: false,
          ...prev,
        }));
        dispatch(setAuth(auth));
        navigate(Path.home);
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
    <div>
      <div className="w-full flex flex-col items-center  sticky top-0 bg-white z-50 shadow-2xl">
        <Header />
      </div>
      <div className="w-full flex justify-center my-40">
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
            <Button variant="contained" type="submit" className="!mb-6 w-full">
              Sign up
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
