import { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import Header from "../../components/Header";
import { getUser } from "../../services/api";

export default function Home() {
  const [getState, setGetState] = useState({
    loading: true,
    error: false,
    value: {},
  });
  useEffect(() => {
    getUser().then().catch();
  }, []);
  return (
    <div>
      <Header />
      <Banner />
    </div>
  );
}
