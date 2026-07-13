const { Router } = require("express");
const router = Router();
const { Account } = require("../db");
const { authMiddleware } = require("./authMiddleware");

const BASE_TRANSACTIONS = [
    {
        direction: "outgoing",
        category: "Transfer",
        description: "Transfer to Team Savings",
        counterparty: "Product Studio",
        amountRatio: 0.038,
        dayOffset: 1,
        status: "completed"
    },
    {
        direction: "outgoing",
        category: "Payroll",
        description: "Team payroll run",
        counterparty: "Studio Payroll",
        amountRatio: 0.21,
        dayOffset: 3,
        status: "completed"
    },
    {
        direction: "incoming",
        category: "Invoice",
        description: "Client payment - Nova Agency",
        counterparty: "Nova Agency",
        amountRatio: 0.33,
        dayOffset: 5,
        status: "completed"
    },
    {
        direction: "incoming",
        category: "Transfer",
        description: "Reimbursement",
        counterparty: "Operations Pool",
        amountRatio: 0.12,
        dayOffset: 7,
        status: "completed"
    }
];

const clampCurrency = (value) => {
    const rounded = Number(value.toFixed(2));
    return rounded < 0 ? 0 : rounded;
};

const buildTransactions = (account) => {
    const balance = account?.balance || 0;
    const now = new Date();

    return BASE_TRANSACTIONS.map((template, index) => {
        const fallbackAmount = 150 + index * 37;
        const computed = balance > 0 ? balance * template.amountRatio : fallbackAmount;
        const amount = clampCurrency(Math.max(25, computed));

        const occurredAt = new Date(now);
        occurredAt.setDate(now.getDate() - template.dayOffset);

        return {
            id: `txn_${account.userId}_${index + 1}`,
            direction: template.direction,
            category: template.category,
            description: template.description,
            counterparty: template.counterparty,
            amount,
            currency: "USD",
            status: template.status,
            occurredAt: occurredAt.toISOString()
        };
    });
};

const summarizeTransactions = (transactions) => {
    return transactions.reduce(
        (summary, txn) => {
            if (txn.direction === "incoming") {
                summary.inflow += txn.amount;
            } else {
                summary.outflow += txn.amount;
            }
            return summary;
        },
        { inflow: 0, outflow: 0 }
    );
};

router.get("/recent", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });

        if (!account) {
            return res.status(404).json({
                msg: "Account not found"
            });
        }

        const transactions = buildTransactions(account);
        const summary = summarizeTransactions(transactions);

        res.status(200).json({
            transactions,
            summary: {
                inflow: clampCurrency(summary.inflow),
                outflow: clampCurrency(summary.outflow),
                net: clampCurrency(summary.inflow - summary.outflow)
            },
            generatedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error fetching recent transactions:", error);
        res.status(500).json({
            msg: "Failed to fetch recent transactions"
        });
    }
});

module.exports = router;
