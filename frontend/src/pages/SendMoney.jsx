import { AppBar } from "../components/AppBar"
import { useSearchParams } from "react-router-dom"
import axios from "axios"
import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"


export const Send = () => {

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);

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

    return <>
        <AppBar />
        <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div className="border h-min text-card-foreground max-w-md p-4 space-y-2 w-96 bg-white shadow-lg rounded-md">
                <div className="flex flex-col">
                    <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">
                    <div className="pb-6 pl-8 flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                        </div>
                        <h3 className="text-2xl font-semibold pb-2">{name}</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label class = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-5" for="amount">
                                Amount (in Rs)
                            </label>
                            <input onChange={(e) => {
                                setAmount(e.data.value)
                            }} type="number" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" id="amount" placeholder="Enter amount"></input>
                        </div>
                        <button onClick={() => {
                            axios.post("http://localhost:3000/api/v1/account/transfer", {
                                to: id,
                                amount
                            }, {
                                headers: {
                                    Authorization: "Bearer" + localStorage.getItem("token")
                                }
                            });
                        }} className="w-full h-9 justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium ring-offset-background">Initiate Transfer</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
}