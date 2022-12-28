export default function Order({ product }) {
  return (
    <div className="flex gap-2 bg-primary-grey rounded-lg">
      <img
        src={product.product_image}
        alt="product_image"
        className=" w-20 object-cover aspect-image rounded-lg"
      />
      <div className="flex flex-col p-2">
        <p>Price: {product.product_price}</p>
        <p>Quantity: {product.cart_quantity}</p>
      </div>
    </div>
  );
}
