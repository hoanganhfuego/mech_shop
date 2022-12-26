import Banner from "../../components/Banner";
import Header from "../../components/Header";
import CartRender from "./components/CartRender";

export default function Cart() {
  return (
    <div>
      <div className="w-full flex flex-col items-center  sticky top-0 bg-white z-50">
        <Header />
      </div>
      <Banner />
      <div className="w-full flex justify-center bg-primary-grey">
        <CartRender />
      </div>
    </div>
  );
}
