import { useState, useEffect } from "react";
import { setAuth } from "../../redux/userReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductByType,
  getAllProducts,
  getGoogleUserInfo,
} from "../../services/api/index";
import constants from "../../constants/constants";
import UseGetSearchParams from "../../ultis/queryParams";
import ProductRender from "./components/ProductsRender";

export default function Main() {
  const auth = useSelector((state) => state.user.auth);
  const dispatch = useDispatch();
  const [searchParams] = UseGetSearchParams();
  const [getState, setGetState] = useState({
    loading: true,
    error: "",
    values: [],
  });

  useEffect(() => {
    setGetState((prev) => ({ ...prev, loading: true }));
  }, [searchParams.type]);

  useEffect(() => {
    let mounted = true;
    const cleanup = () => {
      mounted = false;
    };

    if (auth) {
      return cleanup;
    }

    getGoogleUserInfo({ withCredentials: true }).then((res) => {
      if (!mounted) return;
      dispatch(setAuth(res.data));
    });
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  useEffect(() => {
    let mounted = true;
    const cleanup = () => {
      mounted = false;
    };

    if (!getState.loading) {
      return cleanup;
    }

    if (!searchParams.type || searchParams.type === "all_products") {
      getAllProducts()
        .then((res) => {
          if (!mounted) return;
          setGetState({
            loading: false,
            error: "",
            values: res.data,
          });
        })
        .catch((error) => {
          if (!mounted) return;
          setGetState({
            values: [],
            error: error.response?.data?.message,
          });
        });
    } else {
      getProductByType(
        constants.productType.typeParam[searchParams.type]?.value
      )
        .then((res) => {
          if (!mounted) return;
          setGetState({
            loading: false,
            error: "",
            values: res.data,
          });
        })
        .catch((error) => {
          if (!mounted) return;
          setGetState({
            values: [],
            error: error.response?.data?.message,
          });
        });
    }

    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getState.loading]);

  // const
  // useEffect(() => {
  //   let mounted = true
  //   getGoogleUserInfo({ withCredentials: true }).then((res) =>
  //     console.log(res)
  //   );
  // }, []);
  return (
    <div className="w-full flex justify-center py-20 bg-white">
      <ProductRender products={getState.values} searchParams={searchParams} />
    </div>
  );
}
