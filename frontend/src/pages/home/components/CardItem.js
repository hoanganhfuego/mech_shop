import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Button } from "@mui/material";

export default function CardItem(props) {
  const { product_name, product_images, product_price, user_avatar, user_name } = props.item;
  return (
    <div className="w-full relative">
      <div className="!absolute !z-10 w-fit right-0 top-0 rounded-full">
        <Button variant="text !text-white !min-w-min !z-10 !rounded-full">
          <AddShoppingCartIcon />
        </Button>
      </div>
      <Swiper
        className="rounded-xl !w-full"
        navigation={true}
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        slidesPerView={1}
        spaceBetween={0}
      >
        {product_images?.map((image, index) => {
          return (
            <SwiperSlide key={index} className="!w-full">
              <picture>
                <img
                  className="object-cover w-full h-full aspect-image"
                  src={image.product_image}
                  alt="product"
                />
              </picture>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div>
        <span>{product_name}</span>
        <span className=" float-right">{product_price}</span>
      </div>
      <div className="flex items-center justify-between">
        <img
          src={user_avatar}
          className="w-7 aspect-square rounded-full"
          alt="user avatar"
        ></img>
        <span>{user_name}</span>
      </div>
    </div>
  );
}
