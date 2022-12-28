import Banner from "../../components/Banner";
import Header from "../../components/Header";
import Main from "./Main";

export default function UserInfo() {
  return (
    <div>
      <div className="w-full flex flex-col items-center  sticky top-0 bg-white z-50 shadow-2xl">
        <Header />
      </div>
      <Banner />
      <Main />
    </div>
  );
}
