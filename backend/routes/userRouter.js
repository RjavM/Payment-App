const { express, Router } = require('express');
const router = Router();
const z = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("./authMiddleware");

const signupSchema = z.object({
    username: z.string().email(),
    password: z.string(),
    firstname: z.string(),
    lastname: z.string(),
})

router.post("/signup", async (req, res) => {
    const body = req.body;

    const success = signupSchema.safeParse(body).success;

    if (!success) {
        res.status(400).json({
            msg: "Invalid inputs",
            output: success,
            body: body
        });
        return;
    }
    const user = await User.findOne({
        username: body.username
    })
    if (user) {
        res.status(400).json({
            msg: "User already exists!"
        })
    }

    const dbUser = await User.create(body);

    const userId = dbUser._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = "Bearer " + jwt.sign({
        userId
    }, JWT_SECRET);

    res.status(200).json({
        msg: "User added successfully",
        token: token
    })

})

router.get("/me", authMiddleware, (req, res) => {
    res.status(200).json({
        msg: "User is signed in",
        user: req.userId
    })
})

router.post("/signin", async (req, res) => {
    const body = req.body;

    const user = await User.findOne({ username: body.username, password: body.password });

    if (!user) {
        res.status(400).json({
            msg: "Error while logging in"
        })
    }

    else {
        const token = "Bearer " + jwt.sign(body, JWT_SECRET);
        res.status(200).json({
            token: token
        })
    }
})

const updateSchema = z.object({
    password: z.string().optional(),
    firstname: z.string().optional(),
    lastname: z.string().optional()
})

router.put("/", authMiddleware, async (req, res) => {
    const body = req.body;
    const success = updateSchema.safeParse(body).success;

    if (!success) {
        res.status(403).json({
            msg: "Error while updating user information"
        })
    }

    await User.updateOne(body, {
        id: req.userId
    })

    res.status(403).json({
        msg: "Updated successfully!"
    })


router.get("/bulk", authMiddleware, async (req, res) => {
        console.log("Request received at /bulk");
        const userDetail = req.query.filter || "";

        const users = await User.find({
            $or: [{
                firstname: {
                    "$regex": userDetail
                }
            }, {
                lastname: {
                    "$regex": userDetail
            }}]
        })

        res.status(200).json({
            user: users.map(user => ({
                username: user.username, 
                firstname: user.firstname,
                lastname: user.lastname,
                _id: user._id
            })
            )
        })
    })
})

module.exports = router;