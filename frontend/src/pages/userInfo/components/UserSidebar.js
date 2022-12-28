import Path from "../../../route/Path";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SIDEBAR_VALUE = {
  INFOR: Path.userInfo,
  PRODUCTS: Path.userProducts,
  USER_ORDER: Path.userOrder,
  GUEST_ORDER: Path.guestOrder
};

export default function UserSidebar({ props }) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const [value, setValue] = useState(pathName);
  const handleChange = (_, value) => {
    setValue(value);
  };
  return (
    <div className="bg-white p-6 rounded basis-1/4 h-fit sticky top-12">
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          display: "flex",
          height: "fit-content",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ width: "100%" }}
          TabIndicatorProps={{
            sx: {
              border: 1,
              borderColor: "divider",
              left: 0,
              right: "auto",
            },
          }}
        >
          <Tab
            onClick={() => navigate(Path.userInfo)}
            label="Your information"
            value={SIDEBAR_VALUE.INFOR}
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          />

          <Tab
            onClick={() => navigate(Path.userProducts)}
            label="Products"
            value={SIDEBAR_VALUE.PRODUCTS}
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          />
        </Tabs>
      </Box>
    </div>
  );
}
