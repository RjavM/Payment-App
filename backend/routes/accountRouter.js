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


router.post("/transfer", authMiddleware, async(req, res) => {
    const session = await mongoose.startSession()

    session.startTransaction();
    
    const to = req.body.to;
    const amount = req.body.amount;

    const senderAccount = await Account.findOne({
        userId: req.userId
    }).session(session);

    if (!senderAccount || senderAccount.balance < amount) {
        await session.abortTransaction();
        res.status(400).json({
            msg: "Insufficient balance"
        })
    }

    const receiverAccount = await Account.findOne({
        userId: to
    }).session(session);

    if (!receiverAccount) {
        await session.abortTransaction();
        res.status(400).json({
            msg: "Inavlid account"
        })
    }

    await Account.updateOne({userId: req.userId}, {$inc: {balance: -amount}}).session(session);
    await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session);

    await session.commitTransaction();

    })

module.exports = router;