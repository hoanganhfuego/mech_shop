import SearchIcon from "@mui/icons-material/Search";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import Popover from "@mui/material/Popover";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import Path from "../route/Path";
import { setAuth } from "../redux/userReducer";
import Line from "./Line";

const navBarContent = [
  {
    name: "Home",
  },
  {
    name: "Group buy",
    drop_down: [
      {
        id: 1,
        name: "Akko mod 007",
      },
      {
        id: 2,
        name: "Akko mod 008",
      },
      {
        id: 3,
        name: "Akko mod 009",
      },
    ],
  },
  {
    name: "Categories",
    drop_down: [
      {
        id: 1,
        name: "Custom kit",
      },
      {
        id: 2,
        name: "Keyboard",
      },
      {
        id: 3,
        name: "Accessory",
      },
    ],
  },
];

export default function Header() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.user.auth);
  const [anchorEl, setAnchorEl] = useState({
    type: "",
    element: null,
  });
  const onLogOut = () => {
    dispatch(setAuth(null));
    window.open(`${process.env.REACT_APP_API_URL}auth/logout`, "_self");
  };
  return (
    <div className="w-1200 flex justify-between items-center py-2 text-lg font-medium">
      <Link to="/">
        <h1 className=" font-extrabold text-6xl text-primary-pink cursor-pointer">
          KEEBS
        </h1>
      </Link>
      <div className="flex gap-20">
        {navBarContent.map((item) => {
          return (
            <Fragment key={item.name}>
              <div
                className=" cursor-pointer flex items-center"
                onClick={(e) =>
                  setAnchorEl({ type: item.name, element: e.currentTarget })
                }
              >
                <p>{item.name}</p>
                {item.drop_down && <KeyboardArrowDownOutlinedIcon />}
              </div>
              {anchorEl.type === item.name && (
                <Popover
                  anchorEl={anchorEl.element}
                  open={Boolean(anchorEl.element)}
                  onClose={() =>
                    setAnchorEl({
                      type: "",
                      elemet: null,
                    })
                  }
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <div className="!p-2">
                    {item.drop_down?.map((dropItem) => {
                      return <p key={dropItem.id}>{dropItem.name}</p>;
                    })}
                  </div>
                </Popover>
              )}
            </Fragment>
          );
        })}
      </div>
      <div className="flex gap-10 items-center">
        <SearchIcon />
        <Link to="/cart">
          <LocalMallOutlinedIcon className="w-full cursor-pointer" />
        </Link>
        <AccountCircleOutlinedIcon
          className="cursor-pointer"
          onClick={(e) =>
            setAnchorEl({ type: "userInfo", element: e.currentTarget })
          }
        />
      </div>
      {anchorEl.type === "userInfo" && (
        <Popover
          className="mt-2"
          anchorEl={anchorEl.element}
          open={Boolean(anchorEl.element)}
          onClose={() =>
            setAnchorEl({
              type: "",
              element: null,
            })
          }
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <div className="flex flex-col p-4 gap-3">
            {auth ? (
              <>
                <Link className="flex gap-2" to={Path.userInfo}>
                  <div className="flex gap-2 w-[123px] justify-center">
                    <img
                      src={auth.user_avatar}
                      className=" rounded-full w-7 h-7"
                      alt="user_avatar"
                    />{" "}
                    <span className=" flex-grow-0 overflow-hidden text-ellipsis whitespace-nowrap">
                      {" "}
                      {auth.name}
                    </span>
                  </div>
                </Link>
                <Line />
                <Link className="flex justify-center" to={Path.userProducts}>
                  <div>Your product</div>
                </Link>
                <Line />
                <Link className="flex justify-center" to={Path.userOrder}>
                  <div>Your order</div>
                </Link>
                <Line />
                <Link className="flex justify-center" to={Path.guestOrder}>
                  <div>Guest order</div>
                </Link>
                <Line />
                <div onClick={onLogOut} role="button" className="flex justify-center gap-2">
                  {" "}
                  <span>Log out</span>
                  <LogoutIcon />
                </div>
              </>
            ) : (
              <>
                <Link to={Path.login}>
                  <p>Login</p>
                </Link>
                <Line />
                <Link to={Path.signup}>
                  <p>Sign up</p>
                </Link>
              </>
            )}
          </div>
        </Popover>
      )}
    </div>
  );
}
