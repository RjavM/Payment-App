const {express, Router} = require("express");
const { mongoose } = require("mongoose");
const router = Router();
const { User, Account } = require("../db");
const { authMiddleware } = require("./authMiddleware");
const { z } = require("zod");


router.get("/balance", authMiddleware, async(req, res) => {

    const account = await Account.findOne({
        userId: req.userId
    })

    res.status(200).json({
        balance: account.balance
    })
})


const transferSchema = z.object({
    to: z.string().min(1, "Recipient ID is required"),
    amount: z.number().positive("Amount must be positive").min(0.01, "Amount must be at least 0.01")
});

router.post("/transfer", authMiddleware, async(req, res) => {
    let session;
    try {
        const body = req.body;
        const validation = transferSchema.safeParse(body);
        
        if (!validation.success) {
            return res.status(400).json({
                msg: "Invalid transfer data",
                errors: validation.error.errors
            });
        }
        
        session = await mongoose.startSession()

        session.startTransaction();
        
        const to = body.to;
        const amount = body.amount;

        const senderAccount = await Account.findOne({
            userId: req.userId
        }).session(session);

        if (!senderAccount || senderAccount.balance < amount) {
            await session.abortTransaction();
            res.status(400).json({
                msg: "Insufficient balance"
            });
            return;
        }

        const receiverAccount = await Account.findOne({
            userId: to
        }).session(session);

        if (!receiverAccount) {
            await session.abortTransaction();
            res.status(400).json({
                msg: "Invalid account"
            });
            return;
        }

        await Account.updateOne({userId: req.userId}, {$inc: {balance: -amount}}).session(session);
        await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session);

        await session.commitTransaction();
        
        res.status(200).json({
            msg: "Transfer successful",
            amount: amount,
            to: to
        });
        
    } catch (error) {
        if (session) {
            await session.abortTransaction();
        }
        res.status(500).json({
            msg: "Transfer failed",
            error: error.message
        });
    } finally {
        if (session) {
            session.endSession();
        }
    }
});

module.exports = router;
