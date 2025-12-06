const { express, Router } = require('express');
const router = Router();
const z = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("./authMiddleware");
const bcrypt = require("bcryptjs");

const signupSchema = z.object({
    username: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    firstname: z.string().min(1, "First name is required").max(30, "First name too long"),
    lastname: z.string().min(1, "Last name is required").max(30, "Last name too long"),
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
        });
        return;
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const userData = { ...body, password: hashedPassword };
    
    const dbUser = await User.create(userData);

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

router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("firstname lastname username");
        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        res.status(200).json({
            msg: "User is signed in",
            user
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({
            msg: "Failed to fetch user profile"
        });
    }
})

router.post("/signin", async (req, res) => {
    const body = req.body;

    const user = await User.findOne({ username: body.username });

    if (!user) {
        res.status(400).json({
            msg: "User not found"
        });
        return;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    
    if (!isPasswordValid) {
        res.status(400).json({
            msg: "Invalid password"
        });
        return;
    }

    const token = "Bearer " + jwt.sign({ userId: user._id }, JWT_SECRET);
    res.status(200).json({
        token: token
    });
});

const updateSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters").optional(),
    firstname: z.string().min(1, "First name is required").max(30, "First name too long").optional(),
    lastname: z.string().min(1, "Last name is required").max(30, "Last name too long").optional()
})

router.put("/", authMiddleware, async (req, res) => {
    const body = req.body;
    const success = updateSchema.safeParse(body).success;

    if (!success) {
        res.status(403).json({
            msg: "Error while updating user information"
        });
        return;
    }

    await User.updateOne({ _id: req.userId }, body);

    res.status(200).json({
        msg: "Updated successfully!"
    });
});


router.get("/bulk", authMiddleware, async (req, res) => {
        console.log("Request received at /bulk");
        const userDetail = req.query.filter || "";

        const users = await User.find({
            $and: [
                { _id: { $ne: req.userId } },
                {
                    $or: [{
                        firstname: {
                            "$regex": userDetail,
                            "$options": "i"
                        }
                    }, {
                        lastname: {
                            "$regex": userDetail,
                            "$options": "i"
                    }}]
                }
            ]
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

module.exports = router;
