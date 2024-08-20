

export const Balance = ({balanceAmount}) => {
    const numericAmount = parseFloat(balanceAmount.replace(/,/g, ''));
    
    // Check if the conversion was successful
    if (isNaN(numericAmount)) {
        return <div className="font-bold text-bold text-2xl pt-6 pl-10 font-roboto"> Your balance amount is: Invalid amount</div>;
    }

    // Format the number with commas and two decimal places
    const formattedBalance = numericAmount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return <div className="font-bold text-bold text-2xl pt-6 pl-10 font-roboto">
        Your balance amount is: Rs {formattedBalance}/-
    </div>
}