const { express, Router } = require("express");
const userRouter = require("./userRouter");
const accountRouter = require("./accountRouter");
const router = Router();


router.use("/user", userRouter)
router.use("/account", accountRouter)

module.exports = router;

