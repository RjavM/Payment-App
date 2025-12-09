export const User = ({ user, label = "Send Money", onClick }) => {
    const initials = `${user.firstname?.[0] || ""}${user.lastname?.[0] || ""}`.toUpperCase();

    return (
        <div className="flex items-center justify-between rounded-2xl border border-slate-100 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
            <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white font-semibold">
                    {initials}
                </div>
                <div>
                    <p className="text-sm text-slate-500">Pay to</p>
                    <p className="text-base font-semibold text-slate-900">
                        {user.firstname} {user.lastname}
                    </p>
                    <p className="text-xs text-slate-400">{user.username}</p>
                </div>
            </div>
            <button
                type="button"
                onClick={onClick}
                className="rounded-full border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-200"
            >
                {label}
            </button>
        </div>
    );
};
