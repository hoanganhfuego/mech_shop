import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { Button } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { deleteProduct } from "../../../services/api/index";

export default function ProductCard({
  product,
  onOpenModel,
  getEditProduct,
  reloadPage,
}) {
  const {
    create_date,
    product_images,
    product_name,
    product_price,
    product_description,
  } = product;

  const handleDelete = () => {
    deleteProduct(product.product_id)
      .then(() => {
        reloadPage();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (data) => {
    onOpenModel();
    getEditProduct(data);
  };

  return (
    <div className="flex gap-6 rounded-xl w-full items-start h-[270px] max-w-full">
      <Swiper
        className="rounded-xl basis-1/3"
        navigation={true}
        modules={[Navigation, Pagination]}
        pagination={{
          dynamicBullets: true,
          dynamicMainBullets: 3,
          clickable: true,
        }}
        slidesPerView={1}
        spaceBetween={0}
      >
        {product_images.map((imageUrl, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                className="object-cover w-full aspect-video"
                src={imageUrl.product_image}
                alt="product"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="basis-2/3 !overflow-y-scroll max-h-full no-scrollbar">
        <div className="rounded-xl">
          <div className="flex items-center mb-6 justify-between">
            <p className=" text-xl font-medium text-primary-pink">
              {product_name}
            </p>
            <div className="flex gap-2">
              <Button variant="outlined" onClick={handleDelete}>
                <DeleteForeverOutlinedIcon />
              </Button>
              <Button variant="outlined" onClick={() => handleEdit(product)}>
                Edit
              </Button>
            </div>
          </div>
          <div>
            <p className="mb-1">
              <span className=" text-primary-pink">Price:</span> {product_price}
            </p>
            <p>
              <span className=" text-primary-pink">Description:</span>{" "}
              {product_description}
            </p>
            <p className="mb-1">
              <span className=" text-primary-pink">Created date:</span>{" "}
              {create_date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
