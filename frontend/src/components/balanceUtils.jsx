import { useState } from "react";
import { getBalance } from "./getBalance";

// Utility function to refresh balance and notify other components
export const refreshBalance = async () => {
    try {
        const balance = await getBalance();
        return balance;
    } catch (error) {
        console.error("Error refreshing balance:", error);
        return null;
    }
};

// Custom hook for balance management (optional - for future use)
export const useBalance = () => {
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchBalance = async () => {
        setLoading(true);
        setError("");
        try {
            const balanceData = await getBalance();
            setBalance(balanceData);
        } catch (err) {
            setError("Failed to load balance");
            console.error("Error fetching balance:", err);
        } finally {
            setLoading(false);
        }
    };

    return { balance, loading, error, fetchBalance };
};
