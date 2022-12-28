import Banner from "../../components/Banner";
import Header from "../../components/Header";
import CheckOut from "./components/CheckOut";

export default function Checkout() {
  return (
    <div>
      <div className="w-full flex flex-col items-center  sticky top-0 bg-white z-50 shadow-2xl">
        <Header />
      </div>
      <Banner />
      <div className="w-full flex justify-center bg-primary-grey">
        <CheckOut />
      </div>
    </div>
  );
}
