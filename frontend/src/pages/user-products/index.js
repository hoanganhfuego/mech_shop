import UserSidebar from "../userInfo/components/UserSidebar"
import UserProductsShowCase from "./components/UserProducts"

export default function UserProducts(){
    return (
        <div>
            <UserProductsShowCase />
            <UserSidebar />
        </div>
    )
}