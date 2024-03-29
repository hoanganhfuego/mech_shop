import { setCookie, getCookieValue } from "../../../ultis/cookiesFunc";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import { addToCart } from "../../../services/api/index";
import { useSelector } from "react-redux";

export default function CardItem(props) {
  const {
    product_id,
    product_name,
    product_images,
    product_price,
    user_avatar,
    user_name,
  } = props.item;

  const auth = useSelector((state) => state.user.auth);
  const [sendState, setSendState] = useState({
    loading: false,
    error: "",
  });

  const onAddToCart = () => {
    setSendState((prev) => ({ ...prev, loading: true }));
  };

  useEffect(() => {
    let mounted = true;
    const cleanup = () => {
      mounted = false;
    };

    if (!sendState.loading) {
      return cleanup;
    }

    const info = { ...props.item };

    info.owner_id = info.user_id

    delete info.user_id
    delete info.quantity;
    delete info.product_images;
    delete info.create_date;
    delete info.product_description;
    delete info.product_price;
    delete info.product_type;
    delete info.user_avatar;
    delete info.user_name;

    if (!auth) {
      info.cart_quantity = 1;
      info.product_image = props.item.product_images[0].product_image;
      info.cart_id = props.item.product_id;
      info.product_price = props.item.product_price;
      let cart = getCookieValue("cart");

      if (cart) {
        if (cart.find((item) => item.product_id === info.product_id)) {
          cart = cart.map((item) => {
            if (
              item.product_id === info.product_id &&
              item.cart_quantity < info.product_quantity
            ) {
              return { ...item, cart_quantity: item.cart_quantity + 1 };
            }
            return item;
          });
        } else {
          cart.push(info);
        }
      } else {
        cart = [];
        cart.push(info);
      }
      setCookie("cart", cart, 2);
      return;
    }

    addToCart(auth?.id, product_id, info)
      .then(() => {
        if (!mounted) return;
        setSendState((prev) => ({ ...prev, loading: false }));
      })
      .catch((error) => {
        if (!mounted) return;
        setSendState({
          loading: false,
          error: error.response.data.message,
        });
      });

    return cleanup;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendState.loading]);

  return (
    <div className="w-full relative">
      <div
        className="!absolute !z-10 w-fit right-2 top-2 rounded-full"
        role="button"
        onClick={onAddToCart}
      >
        <LocalMallRoundedIcon className="!text-primary-red" />
      </div>
      <Swiper
        className="rounded-xl !w-full"
        navigation={true}
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{
          dynamicBullets: true,
          dynamicMainBullets: 3,
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
                  className="object-cover w-full min-w-[150px] h-full aspect-image"
                  src={image.product_image}
                  alt="product"
                />
              </picture>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="pt-3 pb-1">
        <span>{product_name}</span>
        <span className=" float-right">{product_price} $</span>
      </div>
      <div className="flex items-center justify-between">
        <img
          src={user_avatar}
          className="w-7 aspect-image object-cover rounded-full"
          alt="user avatar"
        ></img>
        <span>{user_name}</span>
      </div>
    </div>
  );
}
