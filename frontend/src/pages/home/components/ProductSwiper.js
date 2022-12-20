import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import CardItem from "../components/CardItem";

export default function ProductSwiper({ data }) {
  return (
    <div className="w-1200">
      <div>
        <div className="flex gap-2">
          {/* <button className="button-prev">
                  <NavigateBeforeOutlinedIcon />
                </button> */}

          <Swiper
            className="!w-full"
            modules={[Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={6}
            navigation={{
              nextEl: ".button-next",
              prevEl: ".button-prev",
            }}
          >
            {data.map((item, index) => {
              return (
                <SwiperSlide key={index} className="!w-[300px]">
                  <CardItem item={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* <button className="button-next">
                  <NavigateNextOutlinedIcon />
                </button> */}
        </div>
      </div>
    </div>
  );
}
