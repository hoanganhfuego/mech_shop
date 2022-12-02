import SearchIcon from "@mui/icons-material/Search";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import Popover from "@mui/material/Popover";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

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
  const [anchorEl, setAnchorEl] = useState({
    type: "",
    elemet: null,
  });
  return (
    <div className="w-full flex justify-center py-2">
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
          <AccountCircleOutlinedIcon />
        </div>
      </div>
    </div>
  );
}
