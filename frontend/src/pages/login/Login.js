import { Button, TextField, Snackbar } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from "../../components/Header";
import { login } from "../../services/api";
import Path from "../../route/Path";
import { setAuth } from "../../redux/userReducer";
import { useEffect, useState } from "react";

export default function Login() {
  const [sendState, setSendState] = useState({
    loading: false,
    error: null,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = () => {
    setSendState((prev) => ({ ...prev, loading: true }));
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("user email required")
      .email("use your email to login"),
    password: Yup.string().required("user password required"),
  });

  const { values, errors, setFieldValue, handleSubmit } = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    validationSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  const authGoogle = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/google/callback`);
  };

  useEffect(() => {
    let mounted = true;
    const cleanup = () => {
      mounted = false;
    };
    if (!sendState.loading) return;

    const info = { ...values };

    info.email = info.email.trim();
    info.password = info.password.trim();

    login(info)
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
          error: error.response.data.message,
        });
      });
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendState.loading]);

  return (
    <div>
      <Header />
      <div className="w-full flex justify-center mt-6">
        <form onSubmit={handleSubmit}>
          <div className=" w-96 flex items-center flex-col">
            <p className=" text-6xl mb-6">Login</p>
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
                onChange={(e) =>
                  setFieldValue("password", e.target.value)
                }
                fullWidth
              />
            </div>
            <p className=" underline text-left w-full mb-6 cursor-pointer">
              Forgot password?
            </p>
            <Button
              variant="contained"
              type="submit"
              size="medium"
              className="!mb-6 !min-w-[80px] !h-[40px]"
            >
              {sendState.loading ? (
                <CircularProgress
                  size={28}
                  sx={{
                    color: "white",
                  }}
                />
              ) : (
                "Login"
              )}
            </Button>
            <Button
              variant="outlined"
              type="button"
              className="!mb-6 w-full"
              onClick={authGoogle}
            >
              Login with Google
            </Button>
            <Button variant="outlined" type="button" className="!mb-6 w-full">
              Sign up
            </Button>
          </div>
        </form>
      </div>
      <Snackbar
        ContentProps={{
          sx: {
            borderColor: "red",
            border: 1,
            bgcolor: "white",
            color: "red",
          },
        }}
        onClose={() => {
          setSendState((prev) => ({ ...prev, error: null }));
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={Boolean(sendState.error)}
        message={sendState.error}
        key={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
      />
    </div>
  );
}
