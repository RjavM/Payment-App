import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User } from "./User";
import { API_ENDPOINTS } from "../config/api";

export const Users = ({ onTransferSuccess, currentUserId }) => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError("");
                const res = await axios.get(`${API_ENDPOINTS.USER_BULK}?filter=${filter}`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                setUsers(res.data.user || []);
            } catch (error) {
                if (error.response?.status === 401) {
                    setError("Please sign in to view users");
                    navigate("/signin");
                } else if (error.response?.status === 500) {
                    setError("Server error. Please try again later.");
                } else {
                    setError("Failed to load users");
                }
                setUsers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [filter, navigate]);

    const filteredUsers = useMemo(() => {
        if (!currentUserId) return users;
        return users.filter((user) => user._id !== currentUserId);
    }, [users, currentUserId]);

    return (
        <div className="rounded-3xl border border-slate-100 bg-white/85 p-6 backdrop-blur">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                        People
                    </p>
                    <h2 className="text-2xl font-semibold text-slate-900">Send money quickly</h2>
                </div>
                <div className="text-sm text-slate-500">
                    {filteredUsers.length} available recipients
                </div>
            </div>

            <div className="mt-4">
                <div className="relative">
                    <input
                        type="text"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="Search by name or email..."
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pl-11 text-sm shadow-inner focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-100"
                    />
                    <svg
                        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="7" />
                        <line x1="16.65" y1="16.65" x2="21" y2="21" />
                    </svg>
                </div>
            </div>

            {error && (
                <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            <div className="mt-6 space-y-3 overflow-y-auto pr-2 max-h-[26rem]">
                {loading &&
                    Array.from({ length: 3 }).map((_, index) => (
                        <div key={`skeleton-${index}`} className="h-20 animate-pulse rounded-2xl bg-slate-100" />
                    ))}

                {!loading && !error && filteredUsers.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
                        No users found. Try another search.
                    </div>
                )}

                {!loading &&
                    !error &&
                    filteredUsers.length > 0 &&
                    filteredUsers.map((user) => (
                        <User
                            key={user._id}
                            user={user}
                            label="Send"
                            onClick={() => {
                                navigate(`/send?id=${user._id}&name=${user.firstname}`);
                                onTransferSuccess?.();
                            }}
                        />
                    ))}
            </div>
        </div>
    );
};
