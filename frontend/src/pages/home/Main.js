import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import mockApi from "./mockApi";
import CardItem from "./components/CardItem";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { getUser } from "../../services/api";

export default function Main() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [getState, useGetState] = useState({
    loading: true,
    error: false,
    values: {},
  });
  useEffect(() => {
    // getUser();
  });
  return (
    <div className="w-full flex justify-center py-20 bg-white">
      <div className="w-1200">
        <div>
          <h1 className="mb-6">New products</h1>
          <div className="flex justify-between">
            <button className="button-prev">
              <NavigateBeforeOutlinedIcon />
            </button>

            <Swiper
              modules={[Pagination, Navigation]}
              spaceBetween={12}
              slidesPerView={6}
              navigation={{
                nextEl: ".button-next",
                prevEl: ".button-prev",
              }}
            >
              {mockApi.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <CardItem item={item} />
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <button className="button-next">
              <NavigateNextOutlinedIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
