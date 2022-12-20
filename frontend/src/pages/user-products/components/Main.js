import { CircularProgress } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserProducts } from "../../../services/api/index";
import UserProductsAdd from "./UserProductsAdd";
import UserProductShowCase from "./UserProductsUpdate";

export default function Main() {
  const auth = useSelector((state) => state.user.auth);
  const [getState, setGetState] = useState({
    loading: true,
    error: null,
    value: [],
  });

  const reloadPage = useCallback(() => {
    getUserProducts(auth?.id)
      .then((res) => {
        setGetState((prev) => ({ ...prev, value: res?.data, loading: false }));
      })
      .catch((error) => {
        setGetState((prev) => ({
          ...prev,
          loading: false,
          error: error?.response?.data?.message,
        }));
      });
  }, [auth?.id]);

  useEffect(() => {
    let mounted = true;

    const cleanup = () => {
      mounted = false;
    };

    if (!getState.loading) {
      return cleanup;
    }

    getUserProducts(auth?.id)
      .then((res) => {
        if (!mounted) return;
        setGetState((prev) => ({ ...prev, value: res?.data, loading: false }));
      })
      .catch((error) => {
        if (!mounted) return;
        setGetState((prev) => ({
          ...prev,
          loading: false,
          error: error?.response?.data?.message,
        }));
      });
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getState.loading]);

  return (
    <div className="bg-white rounded basis-3/4 w-3/4 p-6">
      <p className="mb-10 font-bold text-3xl">User products</p>

      {getState.loading ? (
        <div className="flex justify-center w-full">
          <CircularProgress size={60} />
        </div>
      ) : (
        <>
          <UserProductShowCase
            products={getState.value}
            reloadPage={reloadPage}
          />
          <UserProductsAdd reloadPage={reloadPage} />
        </>
      )}
    </div>
  );
}
