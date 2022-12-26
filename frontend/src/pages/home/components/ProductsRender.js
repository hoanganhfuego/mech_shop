import constants from "../../../constants/constants";
import CardItem from "./CardItem";

export default function ProductRender({ products, searchParams, typeName }) {
  return (
    <div className="w-1200">
      <p className="mb-2 font-medium text-lg">
        {typeName()}
      </p>
      <div className="flex -m-3 flex-wrap">
        {products.map((item, index) => {
          return (
            <div className="w-1/5 p-3" key={index}>
              <CardItem item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
