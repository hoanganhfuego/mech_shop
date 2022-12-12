import { useEffect } from "react"
import { useSelector } from "react-redux"
import {getUserProducts} from "../../../services/api/index"

export default function UserProductsShowCase(){
    const auth = useSelector(state => state.user.auth)
    useEffect(() => {
        getUserProducts(auth.id)
    }, [])
    return (
        <div>products.......</div>
    )
}