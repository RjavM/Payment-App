
export const Balance = ({balanceAmount, loading, error}) => {
    // Handle loading state
    if (loading) {
        return (
            <div className="font-bold text-bold text-2xl pt-6 pl-10 font-roboto">
                Loading balance...
            </div>
        );
    }

    // Handle error state
    if (error) {
        return (
            <div className="font-bold text-bold text-2xl pt-6 pl-10 font-roboto text-red-600">
                Error loading balance: {error}
            </div>
        );
    }

    // Handle invalid balance
    if (balanceAmount === null || balanceAmount === undefined) {
        return (
            <div className="font-bold text-bold text-2xl pt-6 pl-10 font-roboto text-red-600">
                Unable to load balance
            </div>
        );
    }

    const numericAmount = typeof balanceAmount === 'string' 
        ? parseFloat(balanceAmount.replace(/,/g, ''))
        : balanceAmount;
    
    // Check if the conversion was successful
    if (isNaN(numericAmount)) {
        return (
            <div className="font-bold text-bold text-2xl pt-6 pl-10 font-roboto text-red-600">
                Invalid balance amount
            </div>
        );
    }

    // Format the number with commas and two decimal places
    const formattedBalance = numericAmount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return (
        <div className="font-bold text-bold text-2xl pt-6 pl-10 font-roboto">
            Your balance amount is: Rs {formattedBalance}/-
        </div>
    );
}