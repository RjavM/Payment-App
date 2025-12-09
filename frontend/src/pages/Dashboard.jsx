import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { getUserInfo } from "../components/getUserInfo";
import { useBalance } from "../components/balanceUtils";

const QuickAction = ({ label, description }) => (
    <button
        type="button"
        className="w-full rounded-2xl border border-slate-100 bg-gradient-to-r from-white via-slate-50 to-white/80 px-4 py-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-100"
    >
        <p className="text-sm font-semibold text-slate-900">{label}</p>
        <p className="text-xs text-slate-500">{description}</p>
    </button>
);

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
    }, [navigate, fetchBalance]);

    useEffect(() => {
        const handleBalanceUpdate = () => {
            fetchBalance();
        };

        window.addEventListener("balanceUpdated", handleBalanceUpdate);

        return () => {
            window.removeEventListener("balanceUpdated", handleBalanceUpdate);
        };
    }, [fetchBalance]);

    return (
        <>
            <AppBar user={userInfo} />
            <div className="bg-surface min-h-[calc(100vh-4rem)] px-4 py-8">
                <div className="mx-auto flex max-w-6xl flex-col gap-6">
                    {error && (
                        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
                        <Balance balanceAmount={balance} loading={balanceLoading || loading} error={balanceError} />
                        <div className="rounded-3xl border border-slate-100 bg-white/80 p-6 backdrop-blur">
                            <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                                Quick actions
                            </p>
                            <div className="mt-4 space-y-3">
                                <QuickAction label="Request money" description="Share a link with friends or clients" />
                                <QuickAction label="Add funds" description="Top up from a linked bank account" />
                                <QuickAction label="View history" description="See all recent transfers and payouts" />
                            </div>
                        </div>
                    </div>

                    <Users currentUserId={userInfo?._id} />
                </div>
            </div>
        </>
    );
};
