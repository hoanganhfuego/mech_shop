import { Button, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import blank_avatar from "../../../assets/images/blank.png";
import Path from "../../../route/Path";
import constants from "../../../constants/constants";
import Line from "../../../components/Line";
import { useEffect, useState } from "react";
import { getUserInformation } from "../../../services/api/index";

export default function UserInformation() {
  const auth = useSelector((state) => state.user.auth);
  const [getState, setGetState] = useState({
    loading: true,
    error: "",
    value: {},
  });

  useEffect(() => {
    let mounted = true;
    const cleanup = () => {
      mounted = false;
    };

    if (!getState.loading) {
      return cleanup;
    }

    getUserInformation(auth?.id)
      .then((res) => {
        if (!mounted) return;
        setGetState({ loading: false, error: "", value: res.data });
      })
      .catch((error) => {
        if (!mounted) return;
        setGetState({
          loading: false,
          error: error?.response?.data?.message,
          value: {},
        });
      });

    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getState.loading]);

  return (
    <>
      {getState.loading ? (
        <div className="w-full flex justify-center py-6">
          <CircularProgress className="!text-primary-pink" size={80} />
        </div>
      ) : (
        <div className="bg-white rounded basis-3/4 w-3/4 p-6">
          <p className=" mb-10 font-bold text-3xl">User information</p>
          <div>
            <div className="flex items-start">
              <p className=" mr-6 w-1/3">Avatar :</p>
              <img
                src={getState.value.user_avatar || blank_avatar}
                className="rounded-full aspect-square w-24"
                alt="blank avatar"
              />
            </div>

            <div className="py-6">
              <Line />
            </div>

            <div className="flex items-start">
              <p className=" mr-6 w-1/3">Name :</p>
              <p>{getState.value.name}</p>
            </div>

            <div className="py-6">
              <Line />
            </div>

            <div className="flex items-start">
              <p className=" mr-6 w-1/3">Gender :</p>
              <p>{constants.gender[getState.value.gender]}</p>
            </div>

            <div className="py-6">
              <Line />
            </div>

            <div className="flex items-start">
              <p className=" mr-6 w-1/3">Day of birth :</p>
              {getState.value.birth_month &&
                getState.value.birth_day &&
                getState.value.birth_year && (
                  <p>
                    {getState.value.birth_month}/ {getState.value.birth_day}/{" "}
                    {getState.value.birth_year}
                  </p>
                )}
            </div>

            <div className="py-6">
              <Line />
            </div>

            <div className="flex items-start">
              <p className=" mr-6 w-1/3">Email :</p>
              <p>{getState.value.email}</p>
            </div>

            <div className="py-6">
              <Line />
            </div>

            <div className="flex items-start">
              <p className=" mr-6 w-1/3">Address :</p>
              {getState.value.address_street &&
                getState.value.address_district &&
                getState.value.address_prefecture && (
                  <p>
                    {getState.value.address_street},{" "}
                    {getState.value.address_district},
                    {getState.value.address_prefecture}
                  </p>
                )}
            </div>

            <div className="py-6">
              <Line />
            </div>

            <div className="flex items-start">
              <p className=" mr-6 w-1/3">Phone number :</p>
              <p>{getState.value.phone}</p>
            </div>
          </div>

          <div className="py-6">
            <Line />
          </div>

          <div className="flex justify-center">
            <Link to={Path.userEdit}>
              <Button variant="outlined">Edit information</Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
