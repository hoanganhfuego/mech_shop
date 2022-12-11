import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import blank_avatar from "../../../assets/images/blank.png";
import Path from "../../../route/Path";
import constants from "../../../constants/constants";
import Line from "../../../components/Line";

export default function UserInformation() {
  const userInfo = useSelector((state) => state.user.auth);

  return (
    <div className="bg-white rounded basis-3/4 p-6">
      <p className=" mb-10 font-bold text-3xl">User information</p>
      <div>
        <div className="flex items-start mb-6">
          <p className=" mr-6 w-1/3">Avatar :</p>
          <img
            srcSet={`${userInfo.user_avatar || blank_avatar} 2x`}
            className="rounded-full aspect-square w-24"
            alt="blank avatar"
          />
        </div>

        <Line />

        <div className="flex items-start mb-6">
          <p className=" mr-6 w-1/3">Name :</p>
          <p>{userInfo.name}</p>
        </div>
        
        <Line />

        <div className="flex items-start mb-6">
          <p className=" mr-6 w-1/3">Gender :</p>
          <p>{constants.gender[userInfo.gender]}</p>
        </div>
        
        <Line />

        <div className="flex items-start mb-6">
          <p className=" mr-6 w-1/3">Day of birth :</p>
          {userInfo.birth_month &&
            userInfo.birth_day &&
            userInfo.birth_year && (
              <p>
                {userInfo.birth_month}/ {userInfo.birth_day}/{" "}
                {userInfo.birth_year}
              </p>
            )}
        </div>
        
        <Line />

        <div className="flex items-start mb-6">
          <p className=" mr-6 w-1/3">Email :</p>
          <p>{userInfo.email}</p>
        </div>
        
        <Line />

        <div className="flex items-start mb-6">
          <p className=" mr-6 w-1/3">Address :</p>
          {userInfo.address_address &&
            userInfo.address_district &&
            userInfo.address_prefecture && (
              <p>
                {userInfo.address_address}, {userInfo.address_district},
                {userInfo.address_prefecture}
              </p>
            )}
        </div>
        
        <Line />

        <div className="flex items-start mb-6">
          <p className=" mr-6 w-1/3">Phone number :</p>
          <p>{userInfo.phone}</p>
        </div>
      </div>
      
      <Line />

      <div className="flex justify-center">
        <Link to={Path.userEdit}>
          <Button variant="contained">Edit information</Button>
        </Link>
      </div>
    </div>
  );
}
