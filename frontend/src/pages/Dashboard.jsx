import { AppBar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useState, useEffect } from "react"
import { getUserInfo } from "../components/getUserInfo"
import { useNavigate } from "react-router-dom"


export const Dashboard = () => {

    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            const data = await getUserInfo();
            if (data) {
                setUserInfo(data.user);
            } else {
                navigate("/signin");
            }
        };

        fetchUserInfo();
    }, [navigate])

    return <div className="pl-4">
        <AppBar />
        <Balance balanceAmount={"10000"} />
        <Users />
    </div>
}