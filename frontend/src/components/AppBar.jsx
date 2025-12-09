import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PaymeLogo from "./payme.svg";

const NAV_ITEMS = [
    { label: "Dashboard", path: "/Dashboard" },
    { label: "Send money", path: "/Send" }
];

export const AppBar = ({ user }) => {
    const displayName = user ? `${user.firstname} ${user.lastname}` : "Guest";
    const initial = user?.firstname?.[0]?.toUpperCase() || user?.lastname?.[0]?.toUpperCase() || "U";
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        setMenuOpen(false);
        localStorage.removeItem("token");
        navigate("/signin", { replace: true });
    };

    return (
        <div className="sticky top-0 z-30 border-b border-slate-100 bg-white/90 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
                <Link to="/Dashboard" className="flex items-center gap-3">
                    <img src={PaymeLogo} alt="PayMe" className="h-9" />
                    <div>
                        <p className="text-sm font-semibold text-slate-900 leading-none">PayMe</p>
                        <p className="text-xs text-brand-600">Secure Payments</p>
                    </div>
                </Link>

                <nav className="hidden items-center gap-6 text-sm font-medium text-slate-500 md:flex">
                    {NAV_ITEMS.map(({ label, path }) => (
                        <Link
                            key={label}
                            to={path}
                            className="transition hover:text-brand-600"
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                <div className="relative flex items-center gap-3">
                    <div className="hidden text-right sm:block">
                        <p className="text-xs uppercase tracking-wide text-slate-400">
                            Signed in as
                        </p>
                        <p className="text-sm font-semibold text-slate-800">{displayName}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-lg font-semibold text-slate-700 transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-200"
                    >
                        {initial}
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 top-14 w-48 rounded-2xl border border-slate-100 bg-white/95 p-2 shadow-xl backdrop-blur">
                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    navigate("/Dashboard");
                                }}
                                className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-50"
                            >
                                Dashboard
                            </button>
                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    navigate("/Send");
                                }}
                                className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-50"
                            >
                                Send money
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full rounded-xl px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
