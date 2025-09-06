import { AppBar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useState, useEffect } from "react"
import { getUserInfo } from "../components/getUserInfo"
import { useBalance } from "../components/balanceUtils"
import { useNavigate } from "react-router-dom"


export const Dashboard = () => {

    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const { balance, loading: balanceLoading, error: balanceError, fetchBalance } = useBalance();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                setLoading(true);
                setError("");
                const data = await getUserInfo();
                if (data) {
                    setUserInfo(data.user);
                } else {
                    setError("Please sign in to continue");
                    setTimeout(() => navigate("/signin"), 2000);
                }
            } catch (error) {
                setError("Failed to load user information");
                console.error("Error fetching user info:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
        fetchBalance();
    }, [navigate, fetchBalance])

    // Listen for balance update events
    useEffect(() => {
        const handleBalanceUpdate = () => {
            fetchBalance();
        };

        window.addEventListener('balanceUpdated', handleBalanceUpdate);
        
        return () => {
            window.removeEventListener('balanceUpdated', handleBalanceUpdate);
        };
    }, [fetchBalance])

    if (loading) {
        return (
            <div className="pl-4">
                <AppBar />
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg">Loading...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="pl-4">
                <AppBar />
                <div className="flex justify-center items-center h-64">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                </div>
            </div>
        );
    }

    return <div className="pl-4">
        <AppBar />
        <Balance 
            balanceAmount={balance} 
            loading={balanceLoading} 
            error={balanceError} 
        />
        <Users />
    </div>
}