import SearchIcon from "@mui/icons-material/Search";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import Popover from "@mui/material/Popover";
import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import Path from "../route/Path";
import { setAuth } from "../redux/userReducer";
import Filter from "./Filter";
import Line from "./Line";
import { logoutGoogle } from "../services/api/index";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.user.auth);
  const [anchorEl, setAnchorEl] = useState({
    type: "",
    element: null,
  });
  const onLogOut = () => {
    dispatch(setAuth(null));
    navigate(Path.home);
    window.open(`${process.env.REACT_APP_API_URL}auth/logout`, "_self");
  };
  return (
    <div className="w-full flex flex-col items-center pt-4 sticky top-0 bg-white z-50">
      <div className="w-1200 flex justify-between items-center">
        <Link to="/">
          <h1 className=" font-extrabold text-4xl text-primary-pink cursor-pointer">
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
        <div className="flex gap-10">
          <SearchIcon />
          <LocalMallOutlinedIcon />
          <AccountCircleOutlinedIcon
            className=" cursor-pointer"
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
            <div className="flex flex-col">
              {auth ? (
                <>
                  <Link to={Path.userInfo}>
                    <Button>User info</Button>
                  </Link>
                  <Button onClick={onLogOut}>Log out</Button>
                </>
              ) : (
                <>
                  <Link to={Path.login}>
                    <Button>Login</Button>
                  </Link>
                  <Link to={Path.signup}>
                    <Button>Sign up</Button>
                  </Link>
                </>
              )}
            </div>
          </Popover>
        )}
      </div>
      <Line />
      <Filter />
    </div>
  );
}
