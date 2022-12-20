import { useSearchParams } from "react-router-dom";

const UseGetSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = Object.fromEntries(searchParams);
  return [searchQuery, setSearchParams];
};

export default UseGetSearchParams;
