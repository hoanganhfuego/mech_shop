import Banner from "../../components/Banner";
import Header from "../../components/Header";
import Main from "./Main";
import Filter from "../../components/Filter";
import Line from "../../components/Line";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <div>
      <div className="w-full flex flex-col items-center  sticky top-0 bg-white z-50 shadow-2xl">
        <Header />
        <Line />
        <Filter />
      </div>
      <Banner />
      <Main />
      <Footer />
    </div>
  );
}
