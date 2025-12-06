import { AppBar } from "../components/AppBar"
import { useSearchParams } from "react-router-dom"
import axios from "axios"
import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { getUserInfo } from "../components/getUserInfo"
import { API_ENDPOINTS, getAuthHeaders } from "../config/api"


export const Send = () => {

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

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
        <AppBar user={userInfo} />
        <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div className="border h-min text-card-foreground max-w-md p-4 space-y-2 w-96 bg-white shadow-lg rounded-md">
                <div className="flex flex-col">
                    <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4">
                            {success}
                        </div>
                    )}
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
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-5" htmlFor="amount">
                                Amount (in $)
                            </label>
                            <input onChange={(e) => {
                                setAmount(e.target.value)
                            }} type="number" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" id="amount" placeholder="Enter amount"></input>
                        </div>
                        <button onClick={async () => {
                            setError("");
                            setSuccess("");
                            setLoading(true);
                            
                            // Validation
                            if (!amount || amount <= 0) {
                                setError("Please enter a valid amount");
                                setLoading(false);
                                return;
                            }
                            
                            if (!id) {
                                setError("Invalid recipient");
                                setLoading(false);
                                return;
                            }
                            
                            try {
                                const res = await axios.post(API_ENDPOINTS.TRANSFER, {
                                    to: id,
                                    amount: parseFloat(amount)
                                }, {
                                    headers: getAuthHeaders()
                                });
                                
                                if (res.data.msg === "Transfer successful") {
                                    setSuccess(`Successfully transferred $${amount} to ${name}`);
                                    setAmount(0);
                                    
                                    // Notify other components that balance has changed
                                    window.dispatchEvent(new CustomEvent('balanceUpdated'));
                                    
                                    // Redirect to dashboard after a short delay
                                    setTimeout(() => {
                                        navigate("/Dashboard");
                                    }, 2000);
                                } else {
                                    setError("Transfer failed. Please try again.");
                                }
                            } catch (error) {
                                if (error.response?.data?.msg) {
                                    setError(error.response.data.msg);
                                } else if (error.response?.status === 400) {
                                    setError("Invalid transfer request");
                                } else if (error.response?.status === 401) {
                                    setError("Please sign in again");
                                    navigate("/signin");
                                } else if (error.response?.status === 500) {
                                    setError("Server error. Please try again later.");
                                } else {
                                    setError("Network error. Please check your connection.");
                                }
                            } finally {
                                setLoading(false);
                            }
                        }} 
                        disabled={loading}
                        className={`w-full h-9 justify-center text-white rounded-md text-sm font-medium ring-offset-background ${
                            loading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-500 hover:bg-blue-600'
                        }`}>
                            {loading ? "Processing..." : "Initiate Transfer"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
}
