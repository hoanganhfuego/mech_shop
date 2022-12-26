import { useState, useEffect, useCallback } from "react";
import { setAuth } from "../../redux/userReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getGoogleUserInfo,
} from "../../services/api/index";
import constants from "../../constants/constants";
import UseGetSearchParams from "../../ultis/queryParams";
import ProductRender from "./components/ProductsRender";
import SkeletonCard from "../../components/SkeletonCard";
import { Pagination, Stack } from "@mui/material";

const loadingApi = [];
for (let i = 0; i < 15; i++) {
  loadingApi.push(i);
}

export default function Main() {
  const auth = useSelector((state) => state.user.auth);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = UseGetSearchParams();
  const [getState, setGetState] = useState({
    loading: true,
    error: "",
    values: {},
  });

  const onPageChange = (_, value) => {
    setSearchParams({ ...searchParams, page: value });
  };

  const typeName = useCallback(() => {
    const type = constants.productType.productType;
    for (let i = 0; i < type.length; i++) {
      if (searchParams.type && type[i].type === Number(searchParams.type)) {
        return type[i].label;
      }
    }
    return "All products";
  }, [searchParams.type]);

  useEffect(() => {
    setGetState((prev) => ({ ...prev, loading: true }));
  }, [searchParams.type, searchParams.page]);

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

    getAllProducts(searchParams)
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

    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getState.loading]);

  return (
    <div className="w-full flex flex-col items-center py-20 bg-white">
      {getState.loading ? (
        <div>
          <p className="mb-2 font-medium text-lg">{typeName()}</p>
          <div className="w-1200 flex flex-wrap -m-3">
            {loadingApi.map((item) => {
              return <SkeletonCard key={item} />;
            })}
          </div>
        </div>
      ) : (
        <ProductRender
          products={getState.values.products}
          searchParams={searchParams}
          typeName={typeName}
        />
      )}
      {getState.values.page_number > 1 && (
        <div className="w-1200 flex justify-center mt-12">
          <Stack spacing={2}>
            <Pagination
              page={searchParams.page ? Number(searchParams.page) : 1}
              count={getState.values.page_number}
              onChange={onPageChange}
            />
          </Stack>
        </div>
      )}
    </div>
  );
}
