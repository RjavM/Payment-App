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
                    navigate("/signin", { replace: true });
                    return;
                }
            } catch (error) {
                setError("Failed to load user information");
                console.error("Error fetching user info:", error);
                navigate("/signin", { replace: true });
                return;
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
            <>
                <AppBar user={userInfo} />
                <div className="flex justify-center items-center h-64 px-4">
                    <div className="text-lg">Loading...</div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <AppBar user={userInfo} />
                <div className="flex justify-center items-center h-64 px-4">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                </div>
            </>
        );
    }

    return <>
        <AppBar user={userInfo} />
        <div className="px-4">
            <Balance 
                balanceAmount={balance} 
                loading={balanceLoading} 
                error={balanceError} 
            />
            <Users currentUserId={userInfo?._id} />
        </div>
    </>
}
