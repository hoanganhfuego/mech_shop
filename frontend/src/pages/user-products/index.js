import Banner from "../../components/Banner";
import Header from "../../components/Header";
import UserSidebar from "../userInfo/components/UserSidebar";
import Main from "./components/Main";

export default function UserProducts() {
  return (
    <div>
      <div className="w-full flex flex-col items-center  sticky top-0 bg-white z-50 shadow-2xl">
        <Header />
      </div>
      <Banner />
      <div className="w-full flex justify-center bg-primary-grey">
        <div className="flex gap-6 w-1200 relative -top-12 rounded">
          <Main />
          <UserSidebar />
        </div>
      </div>
    </div>
  );
}
