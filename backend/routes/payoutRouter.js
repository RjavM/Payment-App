const { Router } = require("express");
const router = Router();
const { Account } = require("../db");
const { authMiddleware } = require("./authMiddleware");

const clampCurrency = (value) => {
    const rounded = Number(value.toFixed(2));
    return rounded < 0 ? 0 : rounded;
};

const getNextPayoutDate = () => {
    const target = new Date();
    const today = target.getDay();
    const daysUntilFriday = (5 - today + 7) % 7 || 7;
    target.setDate(target.getDate() + daysUntilFriday);
    target.setHours(9, 0, 0, 0);
    return target;
};

router.get("/next", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });

        if (!account) {
            return res.status(404).json({
                msg: "Account not found"
            });
        }

        const amount = clampCurrency(Math.max(account.balance * 0.22, 250));
        const scheduledFor = getNextPayoutDate();

        res.status(200).json({
            nextPayout: {
                amount,
                currency: "USD",
                scheduledFor: scheduledFor.toISOString(),
                status: "scheduled",
                frequency: "weekly",
                destination: {
                    bank: "Coastal Credit Union",
                    accountType: "Business Checking",
                    last4: "4821"
                },
                processingWindow: "Same-day",
                memo: "Automatic disbursement"
            }
        });
    } catch (error) {
        console.error("Error fetching next payout:", error);
        res.status(500).json({
            msg: "Failed to fetch payout schedule"
        });
    }
});

module.exports = router;
