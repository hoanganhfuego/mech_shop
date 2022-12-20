import UseGetSearchParams from "../ultis/queryParams";

export default function Filter() {
  const [searchParams, setSearchParams] = UseGetSearchParams();

  return (
    <div className="w-1200 flex justify-between items-center mb-6">
      <div
        role="button"
        className="relative navbar-underline-container"
        onClick={() => {
          setSearchParams({ ...searchParams, type: "all_products" });
        }}
      >
        <span className="navbar-underline" />
        All products
      </div>
      <div
        role="button"
        className="relative navbar-underline-container"
        onClick={() => {
          setSearchParams({ ...searchParams, type: "custom_kits" });
        }}
      >
        <span className="navbar-underline" />
        Custom kits
      </div>
      <div
        role="button"
        className="relative navbar-underline-container"
        onClick={() => {
          setSearchParams({ ...searchParams, type: "keycap" });
        }}
      >
        <span className="navbar-underline" />
        Keycap
      </div>
      <div
        role="button"
        className="relative navbar-underline-container"
        onClick={() => {
          setSearchParams({ ...searchParams, type: "switch" });
        }}
      >
        <span className="navbar-underline" />
        Switch
      </div>
      <div
        role="button"
        className="relative navbar-underline-container"
        onClick={() => {
          setSearchParams({ ...searchParams, type: "accessory" });
        }}
      >
        <span className="navbar-underline" />
        Accessory
      </div>
    </div>
  );
}
