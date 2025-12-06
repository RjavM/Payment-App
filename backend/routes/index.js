const { Router } = require("express");
const userRouter = require("./userRouter");
const accountRouter = require("./accountRouter");
const healthRouter = require("./healthRouter");
const router = Router();

router.use("/user", userRouter)
router.use("/account", accountRouter)
router.use("/health", healthRouter)

module.exports = router;
