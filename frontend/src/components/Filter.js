import UseGetSearchParams from "../ultis/queryParams";
import { Link } from "react-router-dom";
import constants from "../constants/constants";

export default function Filter() {
  const [searchParams, setSearchParams] = UseGetSearchParams();

  return (
    <div className="w-1200 flex gap-8 justify-center py-4 text-lg font-medium">
      <div role="button" className="relative navbar-underline-container text-center">
        <span className="navbar-underline" />
        {!searchParams.type && <span className="navbar-underline-type" />}
        <Link to="/">All products</Link>
      </div>
      {constants.productType.productType.map((type) => {
        return (
          <div
            key={type.type}
            role="button"
            className="relative navbar-underline-container text-center"
            onClick={() => {
              setSearchParams({ type: type.type });
            }}
          >
            {Number(searchParams.type) === type.type && (
              <span className="navbar-underline-type" />
            )}
            <span className="navbar-underline" />
            {type.label}
          </div>
        );
      })}
    </div>
  );
}
