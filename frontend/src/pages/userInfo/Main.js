import UserInformation from "./components/UserInformation";
import UserSidebar from "./components/UserSidebar";

export default function Main() {
  return (
    <div className="w-full flex justify-center bg-primary-grey">
      <div className="flex gap-6 w-1200 relative -top-12 p-6 rounded">
        <UserInformation />
        <UserSidebar />
      </div>
    </div>
  );
}
