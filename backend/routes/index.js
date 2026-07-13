const { Router } = require("express");
const userRouter = require("./userRouter");
const accountRouter = require("./accountRouter");
const healthRouter = require("./healthRouter");
const transactionRouter = require("./transactionRouter");
const payoutRouter = require("./payoutRouter");
const router = Router();

router.use("/user", userRouter)
router.use("/account", accountRouter)
router.use("/health", healthRouter)
router.use("/transactions", transactionRouter)
router.use("/payouts", payoutRouter)

module.exports = router;
