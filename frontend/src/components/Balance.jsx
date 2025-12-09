
const formatBalance = (balanceAmount) => {
    if (balanceAmount === null || balanceAmount === undefined) {
        return null;
    }

    const numericAmount = typeof balanceAmount === "string"
        ? parseFloat(balanceAmount.replace(/,/g, ""))
        : balanceAmount;

    if (isNaN(numericAmount)) {
        return null;
    }

    return numericAmount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

export const Balance = ({ balanceAmount, loading, error }) => {
    const formattedBalance = formatBalance(balanceAmount);

    return (
        <div className="rounded-3xl border border-slate-100 bg-gradient-to-br from-white via-slate-50 to-white/80 p-6 backdrop-blur">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                        Available balance
                    </p>
                    {loading ? (
                        <div className="mt-2 h-10 w-36 animate-pulse rounded-lg bg-slate-100" />
                    ) : error || !formattedBalance ? (
                        <p className="mt-2 text-base text-red-500">
                            {error || "Unable to load balance"}
                        </p>
                    ) : (
                        <p className="mt-2 text-3xl font-semibold text-slate-900">
                            ${formattedBalance}
                        </p>
                    )}
                </div>
                <div className="rounded-2xl bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700">
                    {loading ? "Syncing" : "Up to date"}
                </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                        Recent activity
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-800">
                        Transfer to Savings
                    </p>
                    <p className="text-sm text-slate-500">Yesterday - $250</p>
                </div>
                <div className="rounded-2xl border border-slate-100 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                        Next payout
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-800">
                        $1,400 on Friday
                    </p>
                    <p className="text-sm text-slate-500">Auto-deposit enabled</p>
                </div>
            </div>
        </div>
    );
};
