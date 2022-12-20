import constants from "../../../constants/constants";
import CardItem from "./CardItem";

export default function ProductRender({ products, searchParams }) {
  return (
    <div className="w-1200">
      <p className="mb-2 font-medium text-lg">
        {constants.productType?.typeParam[searchParams.type]?.label ||
          "All Product"}
      </p>
      <div className="flex -m-2">
        {products.map((item, index) => {
          return (
            <div className="w-1/5 p-2" key={index}>
              <CardItem item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
