import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { AppBar } from "../components/AppBar";
import { getUserInfo } from "../components/getUserInfo";
import { API_ENDPOINTS, getAuthHeaders } from "../config/api";
import { Button } from "../components/Button";

const PRESET_AMOUNTS = [25, 50, 100, 250];

export const Send = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState("");
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
    }, [navigate]);

    const handleSubmit = async () => {
        setError("");
        setSuccess("");
        setLoading(true);

        if (!amount || Number(amount) <= 0) {
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
            const res = await axios.post(
                API_ENDPOINTS.TRANSFER,
                {
                    to: id,
                    amount: parseFloat(amount)
                },
                {
                    headers: getAuthHeaders()
                }
            );

            if (res.data.msg === "Transfer successful") {
                setSuccess(`Successfully transferred $${amount} to ${name}`);
                setAmount("");

                window.dispatchEvent(new CustomEvent("balanceUpdated"));

                setTimeout(() => {
                    navigate("/Dashboard");
                }, 1500);
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
    };

    const initials = name ? name[0]?.toUpperCase() : "?";

    return (
        <>
            <AppBar user={userInfo} />
            <div className="bg-gradient-to-br from-surface via-white to-surface min-h-[calc(100vh-4rem)] px-4 py-10">
                <div className="mx-auto max-w-3xl">
                    <div className="rounded-3xl border border-slate-100 bg-white/85 p-8 backdrop-blur">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                                    Send payment
                                </p>
                                <h2 className="text-3xl font-semibold text-slate-900">Transfer funds instantly</h2>
                            </div>
                            <div className="rounded-2xl bg-slate-100 px-4 py-2 text-xs text-slate-500">
                                Available balance updates right after you send.
                            </div>
                        </div>

                        {error && (
                            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600">
                                {success}
                            </div>
                        )}

                        <div className="mt-6 flex items-center gap-4 rounded-2xl border border-slate-100 p-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-2xl font-semibold text-white">
                                {initials}
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">You're sending money to</p>
                                <p className="text-xl font-semibold text-slate-900">{name || "Unknown user"}</p>
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            <label htmlFor="amount" className="text-sm font-semibold text-slate-700">
                                Amount (USD)
                            </label>
                            <input
                                id="amount"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter an amount"
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-lg font-semibold text-slate-900 shadow-inner focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100"
                            />

                            <div className="flex flex-wrap gap-3">
                                {PRESET_AMOUNTS.map((preset) => (
                                    <button
                                        key={preset}
                                        type="button"
                                        onClick={() => setAmount(String(preset))}
                                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                                            Number(amount) === preset
                                                ? "bg-brand-600 text-white"
                                                : "border border-slate-200 text-slate-500 hover:border-brand-200"
                                        }`}
                                    >
                                        ${preset}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8">
                            <Button
                                onClick={handleSubmit}
                                label={loading ? "Sending..." : "Send money"}
                                disabled={loading}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
