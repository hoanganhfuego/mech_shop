import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";

export default function CardItem(props) {
  const { productName, productImages, favorite, price, ownerImage, ownerName } =
    props.item;
  return (
    <div>
      <Swiper
        className="rounded-xl"
        navigation={true}
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        slidesPerView={1}
        spaceBetween={0}
      >
        {productImages.map((image, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                className="aspect-square"
                src="https://i.pinimg.com/564x/68/a7/cd/68a7cd011d98c6e6599dfe3a769465e5.jpg"
                alt="product"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div>
        <span>{productName}</span>
        <span className=" float-right">{price}</span>
      </div>
      <div className="flex items-center justify-between">
        <img
          src="https://i.pinimg.com/564x/68/a7/cd/68a7cd011d98c6e6599dfe3a769465e5.jpg"
          className="w-7 aspect-square rounded-full"
        ></img>
        <span>{ownerName}</span>
      </div>
    </div>
  );
}
